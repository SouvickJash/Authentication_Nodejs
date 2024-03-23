const {hashPassword,createToken,comparePassword,} = require("../Middleware/Auth");
const example = require("../Model/userModel");
const { Validator } = require("node-input-validator");

//create
const createUser = async (req, res) => {
  try {
    console.log("++++", req.body);
    const { name, email, phone, password } = req.body;
    const validation = new Validator(req.body, {
      name: "required|string",
      email: "required|string",
      phone: "required|string",
      password: "required",
    });
    const match = await validation.check();
    if (!match) {
      return res.status(404).json({
        status: false,
        message: validation.errors,
      });
    }
    //check user email
    const exisitingUser = await example.findOne({ email });
    if (exisitingUser) {
      return res.status(500).json({
        status: false,
        message: "Already register this email id",
      });
    }
    //hash password
    const hashedPassword = await hashPassword(password);
    const user = new example({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    if (req.file) {
      user.image = req.file.path; //image
    }

    // const result = await
    user.save();
    const tokenData = await createToken(user);
    return res.status(201).json({
      status: true,
      message: "Data created successfully",
      data: user,
      token: tokenData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
//login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await example.findOne({ email });
//     if (!user) {
//       return res.status(500).json({
//         status: false,
//         message: "User not register",
//       });
//     }
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(404).json({
//         status: false,
//         message: "Email and Password are not match",
//       });
//     }
//     const token = await createToken({
//       id: user._id,
//       name: user.name,
//       email:user.email,
//       phone: user.phone,
//     });
//     return res.status(200).json({
//       status: true,
//       message: "Login successfully",
//       data:user,
//       token:token
//     });
//   } catch (error) {
//     return res.status(500).json({
//       stasus: false,
//       message: error.message,
//     });
//   }
// };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        status: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await example.findOne({ email });
    if (!user) {
      return res.status(500).send({
        status: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        status: false,
        message: "Invalid Password",
      });
    }
    const token = await createToken({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    return res.status(201).send({
      status: true,
      message: "login successfully",
      user: user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Erorr in getting Register",
      error: error.message,
    });
  }
};

//user dashboard
const userDashBoard = async (req, res) => {
  return res.status(200).json({
    message: "welcome to user dashboard",
  });
};

// const userDashBoard = async (req, res) => {
//     try{
//       const users=await example.find({},{password:0});
//       if(!users || users===0){
//         return res.status(404).json({
//           status:false,
//           message: "No user found",
//         });
//       }
//       return res.status(200).json({
//         status:true,
//         message:users
//       });
//     }
//     catch(error){
//       return res.status(500).json({
//         status:false,
//         message:error.message
//       })
//     }
// };





module.exports = {
  createUser,
  loginUser,
  userDashBoard
};
