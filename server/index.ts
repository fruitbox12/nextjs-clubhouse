import express from 'express'
import dotenv from 'dotenv'

dotenv.config({
    path: 'server/.env',
})


import { passport } from './core/passport'



const app = express()

app.use(passport.initialize())

app.get(
    '/auth/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    (req,res)=>{
        console.log('aaaa');
        
        res.json(req.user)
    }
)

app.listen(3001, ()=>{
    console.log('Server started');
})