import jwt from 'jsonwebtoken'

const SECRET = 'ThisIsSecret';

const auth = async(req, res, next)=>{
    try{
        const token = req.headers.authorization.split("")[1]
        const isCustomAuth = token.length<500

        let decodeData;

        // if token is custom token do this
        if(token&& isCustomAuth){
            decodeData = jwt.verify(token, SECRET)
            req.userId = decodeData?.id
        }
        else{
            // if token is google token then
            decodeData = jwt.decode(token)
            req.userId = decodeData?.sub
        }
        next()

    }
    catch(error){
        console.log(error)
    }
}

export default auth