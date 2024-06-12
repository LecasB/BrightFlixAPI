const express = require('express');
const router = express.Router();

router.get('/login', (req,res) =>{
    res.status(200).json({
        sucess: true,
        message: 'This route will display the login page'
    })
})

module.exports = router;