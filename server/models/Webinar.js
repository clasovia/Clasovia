import mongoose from 'mongoose'

const webinarSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  agenda: { type: [String], default: [] },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true, default: 0 },
  meetingLink: { type: String, required: true },
  seats: { type: Number, required: true, default: 100 },
  seatsTaken: { type: Number, required: true, default: 0 }
}, { timestamps: true })

export default mongoose.models.Webinar || mongoose.model('Webinar', webinarSchema)
