import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { UserData } from "../pages";
import Cookies from 'nookies'
import { UserApi } from "./UserApi";


export const Api = (ctx: GetServerSidePropsContext)=>{
    const cookies = Cookies.get(ctx)
    const token = cookies.token
    const instance = axios.create({
        baseURL:'http://localhost:3001',
        headers:{
            Authorization: 'Bearer ' + token
        }
    })

    return {
       ...UserApi(instance)
    }
}