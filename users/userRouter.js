const express = require("express");


const Users = require("./users-model");
const restricted = require('../auth/restricted-middleware.js');

const router = express.Router();


router.get("/api/users", restricted, (req, res) => {
    
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
});



module.exports = router;