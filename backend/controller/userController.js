import user from "../User/userSchema.js";
import bcrypt from "bcrypt";

export const signup = async (req,res)=>{
    try{
        const {userName ,Email ,passWord}=req.body;

        if (!userName||!Email||!passWord){
            return res.status(400).json({
                success:false,
                status:400,
                message:'Kindly fill in complete details!'
            });
        }

        const passwordRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA_Z0-9])(?=.*\d).*$/;
        const minLength=8;
        if(!passwordRegex.test(passWord)||passWord.length<minLength){
            return res.status(400).json({
                success:false,
                message:'Password does not meet the requirements!'
            });
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPwd=await bcrypt.hash(passWord,salt);

        const newUser= new user({
            userName,
            Email,
            passWord:hashedPwd
        });
        const existingUser=await user.findOne({userName:userName,Email:Email});
        if (existingUser){
            return res.status(400).json({
                status:400,
                success:false,
                message:'User already exists.'
            });
        }
        await newUser.save();
        res.status(200).json({
            status:200,
            success:true,
            message:'User Signed up successfully!'
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status:500,
            success:false,
            message:'Internal Server error.'
        });
    }

};


export const login = async (req,res)=>{
    try{
        const {userName,passWord}=req.body;

        if(!userName||!passWord){
            return res.status(400).json({
                success:false,
                status:400,
                message:'Please, fill in complete details.'
            });
        }
        const validateUser=await user.findOne({userName});
        if (!validateUser){
            return res.status(404).json({
                success:false,
                status:404,
                message:'User is not registered with us, Kindly signUp first.'
            });
        }
        if(await bcrypt.compare(passWord , validateUser.passWord)){
            return res.status(200).json({
                success:true,
                status:200,
                message:'Login Successful!'
            });
        }
        else{
            return res.status(400).json({
                success:false,
                status:400,
                message:'Incorrect Password!'
            })
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            status:500,
            message:'internal server error.'
        });
    }
}