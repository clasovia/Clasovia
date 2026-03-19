import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const sendRegistrationConfirmation = async ({ userName, userEmail, webinar }) => {
  const subject = 'Webinar Registration Confirmed'
  const html = `
    <h2>Hi ${userName},</h2>
    <p>Your registration for <strong>${webinar.title}</strong> is confirmed.</p>
    <ul>
      <li><strong>Date:</strong> ${new Date(webinar.date).toLocaleDateString()}</li>
      <li><strong>Time:</strong> ${new Date(webinar.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
      <li><strong>Instructor:</strong> ${webinar.instructor}</li>
      <li><strong>Meeting Link:</strong> <a href="${webinar.meetingLink}">${webinar.meetingLink}</a></li>
      <li><strong>Duration:</strong> ${webinar.duration}</li>
    </ul>
    <p>Join instructions:</p>
    <p>1. Click the meeting link 5-10 minutes before start.</p>
    <p>2. Use your name and email to join.</p>
    <p>3. Keep your mic muted unless speaking.</p>
    <p>Looking forward to seeing you!</p>
    <p>Best,<br/>The Clasovia Team</p>
  `

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: userEmail,
    subject,
    html
  })
}
