//used to check if name exist and if it doest go to the next function
const checkName =(req, res,next)=>{
if(req.body.name){
    next()


}else{

    res.status(400).json({error:'Name is Required'})
}


}

const checkBoolean =(req, res,next)=>{
    const fav = req.body.is_favorite
    if(typeof fav === 'boolean'){
        next()
    
    
    }else{
    
        res.status(400).json({error:'Boolean is Required'})
    }
    
    
    }
    
module.exports={checkName, checkBoolean}