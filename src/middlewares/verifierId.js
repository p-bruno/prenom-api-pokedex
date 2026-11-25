const verifierId = (req,res,next) => {
    const id = Number(req.params.id)

    if(Number.isNaN(id)) {
        return res.status(400).json({message: "L'id doit être un nombre"})
    }

    req.id = id 
    next()
}

module.exports = verifierId