const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.login = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json(
                {
                    success: false,
                    message: "Account does not exist",
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(500).json({
                success: false,
                message: "Password doesn't Match"
            })
        }

        return res.status(200).json(
            {
                success: true,
                message: "Login Successfully"
            }
        )





    }catch(err){
        console.error(err);
        return res.status(500).json(
            {
                success: false,
                message:"Something went Wrong, server side error"
            }
        )
    }
}