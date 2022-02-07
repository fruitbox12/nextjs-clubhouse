import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'
import {Code} from '../models'
import sharp from 'sharp'
import fs from 'fs'
import {nanoid, random} from 'nanoid'
dotenv.config({
    path: 'server/.env',
})


import { passport } from './core/passport'
import { UserData } from '../pages'
import { Axios } from '../core/axios'

declare global{
    namespace Express{
        interface User extends UserData{

        }
    }
}

const app = express()
const upload = multer({ storage: multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/avatars')
    },
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + nanoid(6)) + '.' + file.mimetype.split('/').pop()
    }
})
})

app.use(cors())
app.use(express.json())

app.use(passport.initialize())

app.get('upload', upload.single('photo'), (req, res)=>{
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

const randomCode = (max: number = 9999, min: number= 1000) => Math.floor(Math.random() * (max - min + 1)) + min

app.get('/auth/sms/activate',passport.authenticate('jwt',{session: false}), async(req,res)=>{
    try {
        const smsCode = req.query.code
        const userId = req.user.id
        if(!smsCode){
            return res.status(400).send()
        }
        const whereQuery = {code: smsCode, user_id: userId}
        const findCode = await Code.findOne({
            where: whereQuery
        })
        if(findCode){
            await Code.destroy({
                where: whereQuery
            })
            return res.status(201).send()
        }else{
            throw new Error('not found')
        }
    } catch (error) {
        res.status(500).send()
    }
})


app.get('/auth/sms',passport.authenticate('jwt',{session: false}), async(req,res)=>{
    const phone = req.query.phone
    const userId = req.user.id
    if(!phone){
        return res.status(400).send()
    }
    try {
        const data = await Axios.get('')
    
        const code = await Code.create({
            code: randomCode(),
            user_id: userId
        })
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/auth/github',passport.authenticate('github'))
app.get('/auth/me',passport.authenticate('jwt', {session: false},(req,res)=>{
    res.json(req.user)
}))

app.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req,res)=>{
        res.json(`<script>window.opener.postMessage('${JSON.stringify(req.user)}','*');window.close();</script>`)
    }
)

app.listen(3001, ()=>{
    console.log('Server started');
})