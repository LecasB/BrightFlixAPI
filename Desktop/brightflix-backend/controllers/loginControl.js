exports.getLogin = (req, res, next) => {
    res.status(200).json({
        sucess: true,
        message: 'This route will display the login page'
    })
}