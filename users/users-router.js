const router = require("express").Router();

const Users = require("./users-model.js");

const Services = require("./users-services.js")

router.use(Services.restricted)

router.get("/", (req, res)=>{
    Users.find().orderBy("id")
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({ message: err})
        })
})

module.exports = router;
