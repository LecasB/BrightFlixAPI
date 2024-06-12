const express = require('express');
const router = express.Router();

router.get('/videos', (req,res) =>{
    res.status(200).json({
        sucess: true,
        message: 'This route will display all videos'
    })
})

module.exports = router;