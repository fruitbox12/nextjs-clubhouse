import passport from 'passport'
import { Strategy as GitHubStrategy } from 'passport-github'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import {User} from '../../models'
import { UserData } from '../../pages'
import { createJwtToken } from '../../utils/createJwtToken'

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY_JWT,
}

passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done)=>{
    done(null, jwt_payload.data)
}))

passport.use(
    'github',
    new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/auth/github/callback'
},
 async (accessToken, refreshToken, profile,cb) => {
     try {
        const obj: Omit<UserData, 'id'> = {
            fullname: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
            isActive: 0,
            username: profile.username,
            phone:'',
        }
        let userData: UserData;
        const findUser = await User.findOne({
             where: {
                 username: obj.username
             }
         })
         if(!findUser){
             const user = await User.create(obj)          
             userData = user.toJSON()
         }else{
             userData = await findUser.toJSON()
         }
         cb(null, {
             ...userData,
             token: createJwtToken(userData)
         })         
     } catch (error) {
        cb(error)     
     }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})


passport.deserializeUser((id,done)=>{
    User.findById(id, (err,user)=>{
        err ? done(err)
        : done(null,user)
    })
})

export {passport}