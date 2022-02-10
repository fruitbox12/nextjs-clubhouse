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
}

export default new RoomController

