module.exports = {
  login: {
    identifier: 'input[placeholder*="mobile"], input[placeholder*="email"], input[type="text"]',
    submit: 'button:has-text("Get login link"), button:has-text("Send OTP")',
    otp: 'input[autocomplete="one-time-code"], input[placeholder*="OTP"], input[type="tel"]',
    signUp: 'button:has-text("Sign up")'
  },
  register: {
    fullName: 'input[placeholder="Enter a full name"]',
    email: 'input[placeholder="Enter Email Address"]',
    mobile: 'input[placeholder*="9876543210"], input[type="tel"]',
    sellerToggle: 'text=Want to sell your property',
    submit: 'button:has-text("Sign up")'
  },
  otp: {
    input: '[data-testid="otp"], input[name="otp"]',
    verify: '[data-testid="verify-otp"], button:has-text("Verify")',
    resend: '[data-testid="resend-otp"], button:has-text("Resend")'
  }
};
