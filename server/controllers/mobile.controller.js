// controllers/mobile.controller.js
import UserModel from '../models/user.model.js';
import generateSmsOtp from '../utils/generatedOtp.js';
import sendSms from '../utils/sendSMS.js';
import bcryptjs from 'bcryptjs';
import sendEmail from '../config/sendEmail.js';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

// Register with mobile
export async function registerWithMobileController(request, response) {
  try {
    const { name, email, password, mobile } = request.body;
    
    if (!name || !email || !password || !mobile) {
      return response.status(400).json({
        message: "Provide name, email, password, and mobile",
        error: true,
        success: false
      });
    }
    
    // Check if email exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return response.json({
        message: "Email already registered",
        error: true,
        success: false
      });
    }
    
    // Check if mobile exists
    const existingMobile = await UserModel.findOne({ mobile });
    if (existingMobile) {
      return response.json({
        message: "Mobile number already registered",
        error: true,
        success: false
      });
    }
    
    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    
    // Generate mobile verification OTP
    const mobileOtp = generateSmsOtp();
    const mobileOtpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    console.log("Generated OTP:", mobileOtp); // For debugging
    
    // Create user
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      mobile,
      mobile_verification_otp: mobileOtp,
      mobile_verification_expiry: mobileOtpExpiry
    });
    
    const savedUser = await newUser.save();
    
    // Send email verification
    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${savedUser._id}`;
    await sendEmail({
      sendTo: email,
      subject: "Verify email from babyisland",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl
      })
    });
    
    // Send mobile verification OTP
    const smsResult = await sendSms({
      to: mobile,
      message: `Your Babyisland verification code is: ${mobileOtp}`
    });
    
    console.log("SMS Result:", smsResult); // For debugging
    
    // Even if SMS fails, we'll still create the account
    // This allows for development/testing without SMS integration
    
    return response.json({
      message: "User registered successfully. Please verify your email and mobile number.",
      error: false,
      success: true,
      data: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        mobile: savedUser.mobile,
        otp: process.env.NODE_ENV === 'development' ? mobileOtp : undefined // Only send OTP in response during development
      }
    });
    
  } catch (error) {
    console.error("Registration error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// Verify mobile number
export async function verifyMobileController(request, response) {
  try {
    const { mobile, otp } = request.body;
    
    if (!mobile || !otp) {
      return response.status(400).json({
        message: "Provide mobile number and OTP",
        error: true,
        success: false
      });
    }
    
    const user = await UserModel.findOne({ mobile });
    
    if (!user) {
      return response.status(400).json({
        message: "Mobile number not registered",
        error: true,
        success: false
      });
    }
    
    console.log("Stored OTP:", user.mobile_verification_otp); // For debugging
    console.log("Provided OTP:", otp); // For debugging
    
    const currentTime = new Date();
    
    if (user.mobile_verification_expiry < currentTime) {
      return response.status(400).json({
        message: "OTP has expired",
        error: true,
        success: false
      });
    }
    
    // Convert both to string for comparison
    if (String(otp) !== String(user.mobile_verification_otp)) {
      return response.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false
      });
    }
    
    await UserModel.findByIdAndUpdate(user._id, {
      mobile_verified: true,
      mobile_verification_otp: null,
      mobile_verification_expiry: null
    });
    
    return response.json({
      message: "Mobile number verified successfully",
      error: false,
      success: true
    });
    
  } catch (error) {
    console.error("Mobile verification error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// Request new mobile verification OTP
export async function requestMobileVerificationOtp(request, response) {
  try {
    const { mobile } = request.body;
    
    if (!mobile) {
      return response.status(400).json({
        message: "Please provide a mobile number",
        error: true,
        success: false
      });
    }
    
    // Find user by mobile number
    const user = await UserModel.findOne({ mobile });
    
    if (!user) {
      return response.status(400).json({
        message: "Mobile number not registered",
        error: true,
        success: false
      });
    }
    
    // Generate OTP
    const otp = generateSmsOtp();
    const expireTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    
    console.log("Generated OTP:", otp); // For debugging
    
    // Save OTP and expiry to user document
    await UserModel.findByIdAndUpdate(user._id, {
      mobile_verification_otp: otp,
      mobile_verification_expiry: expireTime
    });
    
    // Send OTP via SMS
    const smsResult = await sendSms({
      to: mobile,
      message: `Your Babyisland verification code is: ${otp}`
    });
    
    console.log("SMS Result:", smsResult); // For debugging
    
    return response.json({
      message: "Mobile verification OTP sent successfully",
      error: false,
      success: true,
      otp: process.env.NODE_ENV === 'development' ? otp : undefined // Only send OTP in response during development
    });
    
  } catch (error) {
    console.error("OTP request error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
