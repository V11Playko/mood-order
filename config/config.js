require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    smtpEmail: process.env.SMTP_EMAIL,
    smtpPassword: process.env.SMTP_PASSWORD,
}

module.exports = { config };