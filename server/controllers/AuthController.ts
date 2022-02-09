import express from 'express'
import { Axios } from '../../core/axios'
import {Code} from '../../models'
import { generateRandomCode } from '../utils/generateRandomCode'

class AuthController{
    getMe(req: express.Request, res: express.Response){
        res.json(req.user)
    }

    authCallback(req: express.Request, res: express.Response){
        res.json(`<script>window.opener.postMessage('${JSON.stringify(req.user)}','*');window.close();</script>`)
    }

    async activate(req: express.Request, res: express.Response){
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
    }

    async sendSMS(req: express.Request, res: express.Response){
        const phone = req.query.phone
        const userId = req.user.id
        if(!phone){
            return res.status(400).send()
        }
        try {
            const data = await Axios.get('')
        
            const code = await Code.create({
                code: generateRandomCode(),
                user_id: userId
            })
            res.status(201).send()
        } catch (error) {
            res.status(500).send()
        }
    }
}

export default new AuthController()