const nodemailer = require('nodemailer');
 
class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
 
  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music API',
      to: targetEmail,
      subject: 'Ekspor lagu dari playlist',
      text: 'Terlampir hasil dari ekspor lagu dari playlist',
      attachments: [
        {
          filename: 'playlistSongs.json',
          content,
        },
      ],
    };
 
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;