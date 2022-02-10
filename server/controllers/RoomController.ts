import {Room } from '../../models'
import express from 'express'

class RoomController{
    async index(req: express.Request, res: express.Response){
        try {
            const items = await Room.findAll()
            res.json(items)            
        } catch (error) {
            res.status(500).json({message: 'Error', error})
        }
    }

    async create(req: express.Request, res: express.Response){
        try {
            const data= {
                title: req.body.title,
                type: req.body.type,
            };
            if(!data.title || !data.type){
                return res.status(400).json({message: 'Отсутствуют данные'})
            }
            const room = await Room.create(data)
            res.json(room)
        } catch (error) {
            res.status(500).json({message: 'Error', error})
        }
    }

    async show(req: express.Request, res: express.Response){
        try {
            const roomId = req.params.id            
            if(isNaN(Number(roomId))){
                return res.status(404).json({message: 'Комната не найдена'})
            }
            const room = await Room.findByPk(roomId)        
            if(!room){
                return res.status(404).json({message: 'Комната не найдена'})
            }
            res.json(room)
        } catch (error) {
            res.json(500).send()
        }
    }

    async delete(req: express.Request, res: express.Response){
        try {
            const roomId = req.params.id
            if(isNaN(Number(roomId))){
                return res.status(404).json({message: 'Комната не найдена'})
            }
            await Room.destroy({
                where: {id: roomId}
            })
            res.send()
        } catch (error) {
            res.json(500).send()
        }
    }
}

export default new RoomController