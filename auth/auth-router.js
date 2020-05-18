const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js")


router.post("/register", (req, res)=>{
    const credentials = req.body;
    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 16;
        const hash = bcryptjs.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.registerUser(credentials)
            .then(user=>{
                req.session.loggedIn === true;
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
              });
    } else{
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric"})
    }
})

//middleware
function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }
module.exports = router;