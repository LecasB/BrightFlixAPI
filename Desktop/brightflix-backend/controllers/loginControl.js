exports.getLogin = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        requestMethod : req.requestMethod,
        message: 'This route will display the login page'
    })
}

exports.newLogin = async (req,res,next) => {
    const login = await Login.create(req.body);

    res.status(200).json({
        sucess : true,
        message : "Account Created",
        data: login
    });
}