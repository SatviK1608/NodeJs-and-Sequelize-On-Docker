const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendForgotPasswordEmail } = require('../utils/emailSender');
const generateVerificationCode = require('../utils/codeGenerator');
require('dotenv').config();
const sequelize=require("../config/database")
exports.login = async (req, res) => {
    const { username, password, adminKey } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (user && bcrypt.compareSync(password, user.password)) {
        const isAdmin = adminKey && adminKey === process.env.ADMIN_KEY;
        const token = jwt.sign({ userId: user.userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token, userId: user.userId,isAdmin });
        }
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.signup = async (req, res) => {
  const { username, email, phoneNo, password, firstName, lastName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      phoneNo,
      password: hashedPassword,
      firstName,
      lastName
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' ,error});
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });


    const verificationCode = generateVerificationCode();

    req.session.verificationCode=verificationCode;
    req.session.email=email
    

    await sendForgotPasswordEmail(email, verificationCode);

    res.json({ message: 'Verification code sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.viewUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.profile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.params.id;
  const { username, email, firstName, lastName, phoneNo } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.update({ username, email, firstName, lastName, phoneNo });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.verifyCode=async (req,res)=>{
  const { email, verificationCode,newPassword } = req.body;
  try {
    
    
      const sessionsQuery = `
        SELECT *
        FROM "Sessions";
      `;

      // Execute the query to fetch records from "Sessions" table
      const [sessionsResults, sessionsMetadata] = await sequelize.query(sessionsQuery);

      console.log(JSON.parse(sessionsResults[0].data).verificationCode);
      if((JSON.parse(sessionsResults[0].data).verificationCode!=verificationCode)||(JSON.parse(sessionsResults[0].data).email!=email))
          return res.status(400).json({message:"Inavlid email or verification code"})
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.update({password:hashedPassword},{ where: { email } });
   
    const [sess,sessMetaData]=await sequelize.query(`Delete from "Sessions"`);
    res.json({ message: 'Verification code is valid' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}