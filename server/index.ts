import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import cors from 'cors'
import {nanoid} from 'nanoid'
dotenv.config({
    path: 'server/.env',
})


import { passport } from './core/passport'



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

app.use(passport.initialize())

app.get('upload', upload.single('photo'), (req, res)=>{
    res.json(req.file)
})

app.get('/auth/github',passport.authenticate('github'))

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