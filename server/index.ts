import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sharp from 'sharp'
import fs from 'fs'
import socket from 'socket.io'
dotenv.config({  path: 'server/.env',})
import { passport } from './core/passport'
import AuthController from './controllers/AuthController'
import RoomController from './controllers/RoomController'
import { uploader } from './core/uploader'
import { createServer } from 'http'
import {Room} from '../models'
import { getUsersFromRoom, SocketRoom } from '../utils/getUsersFromRoom'
const app = express()
const server = createServer(app)
const io = socket(server,{
    cors:{
        origin:'*'
    }
})

const rooms: SocketRoom = {}

io.on('connection',(socket)=>{
    socket.on('CLIENT@ROOMS:JOIN',({user, roomId})=>{
        socket.join(`room/${roomId}`)
        rooms[socket.id] = {roomId, user}
        const speakers = getUsersFromRoom(rooms,roomId)
        io.emit('SERVER@ROOMS:HOME',{roomId: Number(roomId), speakers})
        io.in(`room/${roomId}`).emit('SERVER@ROOMS:JOIN',speakers)
        Room.update({speakers},{where:{id: roomId}})
    })

    socket.on('CLIENT@ROOMS:CALL',({targetUserId, callerUserId, roomId, signal})=>{
        socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:CALL',{
            targetUserId,
            callerUserId,
            signal
        })
    })
    socket.on('CLIENT@ROOMS:ANSWER',({targetUserId, callerUserId, roomId, signal})=>{
        socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:ANSWER',{
            targetUserId,
            callerUserId,
            signal
        })
    })

    socket.on('disconnect',()=>{
        if(rooms[socket.id]){
            const {roomId, user} = rooms[socket.id]
            socket.broadcast.to(`room/${roomId}`).emit('SERVER@ROOMS:LEAVE',user)
            delete rooms[socket.id]
            const speakers = getUsersFromRoom(rooms,roomId)
            io.emit('SERVER@ROOMS:HOME',{roomId: Number(roomId), speakers})
            Room.update({speakers},{where:{id: roomId}})
        }
    })
})

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.get('/user/:id',passport.authenticate('jwt',{session: false}), AuthController.getUserInfo)
app.get('/rooms', passport.authenticate('jwt',{session: false}), RoomController.index)
app.post('/rooms',passport.authenticate('jwt',{session: false}), RoomController.create)
app.get('/rooms/:id',passport.authenticate('jwt',{session: false}), RoomController.show)
app.delete('/rooms/:id',passport.authenticate('jwt',{session: false}), RoomController.delete)


app.get('upload', uploader.single('photo'), (req, res)=>{
    const filePath = req.file.path
    sharp(filePath)
    .resize(150, 150)
    .toFormat('jpeg')
    .toFile(filePath.replace('.png','.jpeg'), (err)=>{
        if(err){
            throw err
        }
        fs.unlinkSync(filePath)
        res.json({
            url: `/avatars/${req.file.filename.replace('.png','.jpeg')}`
        })
    })
})

app.post('/auth/sms/activate',passport.authenticate('jwt',{session: false}), AuthController.activate)
app.get('/auth/sms',passport.authenticate('jwt',{session: false}), AuthController.sendSMS)
app.get('/auth/github',passport.authenticate('github'))
app.get('/auth/me',passport.authenticate('jwt', {session: false},AuthController.getMe))
app.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    AuthController.authCallback
)

server.listen(3001, ()=>{
    console.log('Server started');
})