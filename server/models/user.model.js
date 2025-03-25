import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "provide password"]
    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        required: [true, "provide mobile number"]  // Making it required and string type
    },
    // New fields for mobile verification
    mobile_verified: {
        type: Boolean,  // Changed to Boolean
        default: false
    },
    mobile_verification_otp: {
        type: String,
        default: null
    },
    mobile_verification_expiry: {
        type: Date,
        default: null
    },
    // New fields for SMS OTP login
    sms_login_otp: {
        type: String,
        default: null
    },
    sms_login_otp_expiry: {
        type: Date,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login_date: {
        type: Date,
        default: null  // Changed from empty string to null
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'address'
        }
    ],
    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'cartProduct'
        }
    ],
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    forgot_password_otp: {
        type: String,
        default: null
    },
    forgot_password_expiry: {
        type: Date,
        default: null  // Changed from empty string to null
    },
    role: {
        type: String,
        enum: ['ADMIN', "USER"],
        default: "USER"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;