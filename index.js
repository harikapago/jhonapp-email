const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Configure Nodemailer with your email service provider's details
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yadlajaswanth123@gmail.com',
    pass: 'fvjiokrhymfulwmp',
  },
});

// API endpoint to send an email
app.post('/send-email', (req, res) => {
  const { name, phone, email, message } = req.body;

  // Email content
  const mailOptions = {
    from: 'yadlajaswanth123@gmail.com',
    to: 'multitechelectronicsrjy@gmail.com', // Replace with your recipient's email address
    subject: 'Multitech-Electronics- Enquiry',
    html: `
      <p>Name: ${name}</p>
      <p>Phone: ${phone}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({error, message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
