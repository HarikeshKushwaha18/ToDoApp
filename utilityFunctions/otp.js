function generateOTP() {
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    
    return otp;
}

export {generateOTP};