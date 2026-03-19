import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import Webinar from './models/Webinar.js'

dotenv.config()

const seedData = [
  {
    title: 'Modern React with Hooks',
    description: 'Build scalable React applications using Hooks, Context and modern best practices.',
    agenda: ['React hooks deep dive', 'State management', 'Performance tuning', 'Deployment'],
    instructor: 'Priya Singh',
    duration: '2h',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    price: 499,
    meetingLink: 'https://zoom.us/j/1234567890',
    seats: 100,
    seatsTaken: 0
  },
  {
    title: 'Building Next.js App Router',
    description: 'End-to-end course for creating production-ready Next.js applications',
    agenda: ['App Router fundamentals', 'Server Components', 'Auth', 'Payments'],
    instructor: 'Amit Patel',
    duration: '2.5h',
    date: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
    price: 699,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    seats: 80,
    seatsTaken: 0
  }
]

const seed = async () => {
  try {
    await connectDB()
    await Webinar.deleteMany({})
    await Webinar.create(seedData)
    console.log('Seed complete')
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed()
