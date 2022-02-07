import { UserData } from "../../pages";

export const createJwtToken = (user: UserData): string => {
    const token = jwt.sign(
        {
            data:user
        },
        process.env.SECRET_KEY_JWT || '',
        {
            expiresIn: process.env.JWT_MAX_AGE,
            algorith: 'HS256'
        }
    )
}