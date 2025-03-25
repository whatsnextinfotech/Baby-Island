// routes/user.router.js
import { Router } from 'express';
import {
    forgotPasswordController,
    loginController,
    logoutController,
    refreshToken,
    registerUserController,
    resetpassword,
    updateUserDetails,
    uploadAvatar,
    userDetails,
    verifyEmailController,
    verifyForgotPasswordOtp
} from '../controllers/user.controller.js';
import {
    requestSmsOtpController,
    verifySmsOtpController,
    sendRegistrationOtpController,
    sendPasswordResetOtpController,
    verifyGeneralOtpController
} from '../controllers/sms.controller.js';
import {
    registerWithMobileController,
    verifyMobileController,
    requestMobileVerificationOtp
} from '../controllers/mobile.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router();

// Authentication routes
userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth, logoutController);

// Profile management
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar);
userRouter.put('/update-user', auth, updateUserDetails);
userRouter.get('/user-details', auth, userDetails);

// Password management
userRouter.put('/forgot-password', forgotPasswordController);
userRouter.put('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.put('/reset-password', resetpassword);
userRouter.post('/refresh-token', refreshToken);

// SMS OTP login routes
userRouter.post('/request-sms-otp', requestSmsOtpController);
userRouter.post('/verify-sms-otp', verifySmsOtpController);

// Additional OTP functionality
userRouter.post('/send-registration-otp', sendRegistrationOtpController);
userRouter.post('/send-password-reset-otp', sendPasswordResetOtpController);
userRouter.post('/verify-general-otp', verifyGeneralOtpController);

// Mobile verification routes
userRouter.post('/register-with-mobile', registerWithMobileController);
userRouter.post('/verify-mobile', verifyMobileController);
userRouter.post('/request-mobile-verification', requestMobileVerificationOtp);

export default userRouter;