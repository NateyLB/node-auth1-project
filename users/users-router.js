const router = require("express").Router();

const Users = require("./users-model.js");

//middleware
function restricted(req, res, next) {
    if (req.session && req.session.loggedIn) {
      next();
    } else {
      res.status(401).json({ you: "cannot pass!" });
    }
  }
//end middleware

router.get("/", restricted, (req, res)=>{
    Users.find()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({ message: err})
        })
})

module.exports = router;
