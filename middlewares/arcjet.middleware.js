import aj from "../config/arcjet.js";

const arcjetmiddleware=async (req,res,next)=>{
    try{
        const decision=await aj.protect(req,{requested:1});
        
        if(decision.isDenied()){
            // console.log(decision.reason);
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    "message":"rate limit exceed"
                })
            }
            if(decision.reason.isBot()){
                return res.status(403).json({"message":"bot are not allowed !!"})
            }
            return res.status(403).json({"message":"access denied"});
        }
        
        next();
    }catch(error){
        console.log(`arcjet middleware error : ${error}`)
        next();
    }
}

export default arcjetmiddleware;