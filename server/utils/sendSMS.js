// utils/sendSMS.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

async function sendSms({ to, message }) {
  try {
    // Format the phone number correctly for Twilio
    // Twilio requires E.164 format: +[country code][phone number]
    
    // Remove any non-digit characters
    let formattedTo = to.replace(/\D/g, '');
    
    // Check if the number already has a country code
    if (formattedTo.startsWith('91') && formattedTo.length >= 12) {
      // Indian number that already has country code without +
      formattedTo = `+${formattedTo}`;
    } else if (formattedTo.length === 10) {
      // Indian 10-digit number without country code
      formattedTo = `+91${formattedTo}`;
    } else if (!formattedTo.startsWith('+')) {
      // Any other number without + prefix
      formattedTo = `+${formattedTo}`;
    }
    
    console.log(`Sending SMS to formatted number: ${formattedTo}`);
    
    // For testing/development, you can use Twilio's test credentials
    // and bypass actual SMS sending
    if (process.env.NODE_ENV === 'development' && process.env.TWILIO_TEST_MODE === 'true') {
      console.log('Test mode: Simulating SMS send');
      console.log(`Would send "${message}" to ${formattedTo}`);
      return {
        success: true,
        messageId: 'test-message-id',
        test: true
      };
    }
    
    const result = await client.messages.create({
      body: message,
      from: twilioNumber,
      to: formattedTo
    });
    
    console.log(`SMS sent successfully. SID: ${result.sid}`);
    return {
      success: true,
      messageId: result.sid
    };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return {
      success: false,
      error: error.message || "Failed to send SMS"
    };
  }
}

export default sendSms;