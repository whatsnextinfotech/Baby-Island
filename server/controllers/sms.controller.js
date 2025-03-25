// controllers/sms.controller.js
import UserModel from '../models/user.model.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import genertedRefreshToken from '../utils/generatedRefreshToken.js';
import twilio from 'twilio';

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const verifyServiceSid = process.env.TWILIO_VERIFY_SID ;

// Format phone number for international use
const formatPhoneNumber = (mobile) => {
  let formattedMobile = mobile.replace(/\D/g, '');
  if (formattedMobile.length === 10) {
    // Indian 10-digit number
    formattedMobile = `+91${formattedMobile}`;
  } else if (!formattedMobile.startsWith('+')) {
    formattedMobile = `+${formattedMobile}`;
  }
  return formattedMobile;
};

// Request SMS OTP for login
export async function requestSmsOtpController(request, response) {
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
    
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact Admin, account is not active",
        error: true,
        success: false
      });
    }
    
    const formattedMobile = formatPhoneNumber(mobile);
    console.log(`Sending verification to: ${formattedMobile}`);
    
    try {
      // Send verification code using Twilio Verify
      const verification = await client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: formattedMobile, channel: 'sms' });
      
      console.log(`Verification status: ${verification.status}`);
      
      if (verification.status !== 'pending') {
        return response.status(500).json({
          message: "Failed to send verification code",
          error: true,
          success: false
        });
      }
      
      // Update user with verification sent timestamp
      await UserModel.findByIdAndUpdate(user._id, {
        sms_verification_sent: new Date()
      });
      
      return response.json({
        message: "Verification code sent successfully",
        error: false,
        success: true
      });
    } catch (verifyError) {
      console.error("Verify API error:", verifyError);
      return response.status(500).json({
        message: verifyError.message || "Failed to send verification code",
        error: true,
        success: false
      });
    }
    
  } catch (error) {
    console.error("General error in requestSmsOtpController:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}

// Verify SMS OTP and login
export async function verifySmsOtpController(request, response) {
  try {
    const { mobile, otp } = request.body;
    
    if (!mobile || !otp) {
      return response.status(400).json({
        message: "Provide mobile number and verification code",
        error: true,
        success: false
      });
    }
    
    // Find user by mobile
    const user = await UserModel.findOne({ mobile });
    
    if (!user) {
      return response.status(400).json({
        message: "Mobile number not registered",
        error: true,
        success: false
      });
    }
    
    const formattedMobile = formatPhoneNumber(mobile);
    
    try {
      // Verify the code using Twilio Verify
      const verificationCheck = await client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({ to: formattedMobile, code: otp });
      
      console.log(`Verification check status: ${verificationCheck.status}`);
      
      if (verificationCheck.status !== 'approved') {
        return response.status(400).json({
          message: "Invalid verification code",
          error: true,
          success: false
        });
      }
      
      // Generate tokens
      const accessToken = await generatedAccessToken(user._id);
      const refreshToken = await genertedRefreshToken(user._id);
      
      // Update user
      await UserModel.findByIdAndUpdate(user._id, {
        last_login_date: new Date(),
        sms_verification_sent: null
      });
      
      // Set cookies
      const cookiesOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
      };
      response.cookie('accessToken', accessToken, cookiesOption);
      response.cookie('refreshToken', refreshToken, cookiesOption);
      
      return response.json({
        message: "Login successful",
        error: false,
        success: true,
        data: {
          accessToken,
          refreshToken
        }
      });
    } catch (verifyError) {
      console.error("Verify check API error:", verifyError);
      return response.status(400).json({
        message: verifyError.message || "Failed to verify code",
        error: true,
        success: false
      });
    }
    
  } catch (error) {
    console.error("Error in verifySmsOtpController:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}

// Send OTP for registration
export async function sendRegistrationOtpController(request, response) {
  try {
    const { mobile } = request.body;
    
    if (!mobile) {
      return response.status(400).json({
        message: "Please provide a mobile number",
        error: true,
        success: false
      });
    }
    
    // Check if user already exists
    const existingUser = await UserModel.findOne({ mobile });
    if (existingUser) {
      return response.status(400).json({
        message: "Mobile number already registered",
        error: true,
        success: false
      });
    }
    
    const formattedMobile = formatPhoneNumber(mobile);
    
    try {
      // Send verification code
      const verification = await client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: formattedMobile, channel: 'sms' });
      
      if (verification.status !== 'pending') {
        return response.status(500).json({
          message: "Failed to send verification code",
          error: true,
          success: false
        });
      }
      
      // Store in session or temporary storage
      request.session = request.session || {};
      request.session.pendingRegistration = {
        mobile: mobile,
        verificationSent: new Date()
      };
      
      return response.json({
        message: "Verification code sent successfully",
        error: false,
        success: true
      });
    } catch (verifyError) {
      console.error("Verify API error:", verifyError);
      return response.status(500).json({
        message: verifyError.message || "Failed to send verification code",
        error: true,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in sendRegistrationOtpController:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}

// Send OTP for password reset
export async function sendPasswordResetOtpController(request, response) {
  try {
    const { mobile } = request.body;
    
    if (!mobile) {
      return response.status(400).json({
        message: "Please provide a mobile number",
        error: true,
        success: false
      });
    }
    
    // Find user by mobile
    const user = await UserModel.findOne({ mobile });
    
    if (!user) {
      return response.status(400).json({
        message: "Mobile number not registered",
        error: true,
        success: false
      });
    }
    
    const formattedMobile = formatPhoneNumber(mobile);
    
    try {
      // Send verification code
      const verification = await client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: formattedMobile, channel: 'sms' });
      
      if (verification.status !== 'pending') {
        return response.status(500).json({
          message: "Failed to send verification code",
          error: true,
          success: false
        });
      }
      
      // Update user with reset request timestamp
      await UserModel.findByIdAndUpdate(user._id, {
        password_reset_requested: new Date()
      });
      
      return response.json({
        message: "Password reset verification code sent successfully",
        error: false,
        success: true
      });
    } catch (verifyError) {
      console.error("Verify API error:", verifyError);
      return response.status(500).json({
        message: verifyError.message || "Failed to send verification code",
        error: true,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in sendPasswordResetOtpController:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}

// Verify OTP for any purpose (general purpose verification)
export async function verifyGeneralOtpController(request, response) {
  try {
    const { mobile, otp, purpose } = request.body;
    
    if (!mobile || !otp) {
      return response.status(400).json({
        message: "Provide mobile number and verification code",
        error: true,
        success: false
      });
    }
    
    const formattedMobile = formatPhoneNumber(mobile);
    
    try {
      // Verify the code
      const verificationCheck = await client.verify.v2.services(verifyServiceSid)
        .verificationChecks
        .create({ to: formattedMobile, code: otp });
      
      if (verificationCheck.status !== 'approved') {
        return response.status(400).json({
          message: "Invalid verification code",
          error: true,
          success: false
        });
      }
      
      // For tracking purposes, record the verification
      if (purpose === 'profile_update') {
        // Find user and update verification status
        const user = await UserModel.findOne({ mobile });
        if (user) {
          await UserModel.findByIdAndUpdate(user._id, {
            profile_verified: true,
            last_verification: new Date()
          });
        }
      }
      
      return response.json({
        message: "Verification successful",
        error: false,
        success: true,
        purpose: purpose
      });
    } catch (verifyError) {
      console.error("Verify check API error:", verifyError);
      return response.status(400).json({
        message: verifyError.message || "Failed to verify code",
        error: true,
        success: false
      });
    }
  } catch (error) {
    console.error("Error in verifyGeneralOtpController:", error);
    return response.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false
    });
  }
}