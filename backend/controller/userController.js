import UserModel from "../model/UserModel.js";
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "All fields are required." });

        const user = await UserModel.findOne({ email });

        if (!user)
            return res.json({ success: false, message: "Invalid email or password." });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.json({ success: false, message: "Invalid email or password." });

        const token = createToken(user._id);

        res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            return res.json({ success: false, message: "All fields are required." });

        const existingUser = await UserModel.findOne({ email });
        if (existingUser)
            return res.json({ success: false, message: "User already exists." });

        if (!validator.isEmail(email))
            return res.json({ success: false, message: "Invalid email format." });

        if (password.length < 6)
            return res.json({ success: false, message: "Password must be at least 6 characters." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({ name, email, password: hashedPassword });

        const token = createToken(newUser._id);

        res.json({ success: true, token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.json({ success: false, message: "All fields are required." });

        if(email === process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD)
         {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
                res.json({success:true,token})
            
         }
         else
         {
            res.json({success:false, message:"Invalid credentials"})
         }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export { loginUser, registerUser, adminLogin };
