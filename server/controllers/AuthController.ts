import express from 'express'
import { Axios } from '../../core/axios'
import {Code,User} from '../../models'
import { generateRandomCode } from '../../utils/generateRandomCode'

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
                return res.status(400).json({
                    message:'Введите код активации'
                })
            }
            const whereQuery = {code: smsCode, user_id: userId}
            const findCode = await Code.findOne({
                where: whereQuery
            })
            if(findCode){
                await Code.destroy({
                    where: whereQuery
                })
                await User.update({isActive: 1 },{where: {id: userId}})
                return res.status(201).send()
            }else{
                res.status(400).json({message: 'Код не найден'})
            }
        } catch (error) {
            res.status(500).json({message: 'Ошибка при активации'})
        }
    }

    async sendSMS(req: express.Request, res: express.Response){
        const phone = req.query.phone
        const userId = req.user.id
        const smsCode = generateRandomCode()
        if(!phone){
            return res.status(400).json({
                message: 'Номер телефона не указан'
            })
        }
        try {
            //await Axios.get('')
            const findCode = await Code.findOne({
                where: {
                    user_id: userId
                }
            })

            if(findCode){
                return res.status(400).json({message: 'Код уже был отправлен'})
            }

             await Code.create({
                code: smsCode,
                user_id: userId
            })
            res.status(201).send()
        } catch (error) {
            res.status(500).send()
        }
    }
}

export default new AuthController()