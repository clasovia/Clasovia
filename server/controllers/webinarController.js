import Webinar from '../models/Webinar.js'

export const createWebinar = async (req, res) => {
  try {
    const webinar = await Webinar.create(req.body)
    res.status(201).json({ success: true, data: webinar })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, error: error.message })
  }
}

export const getWebinars = async (req, res) => {
  try {
    const now = new Date()
    const webinars = await Webinar.find({ date: { $gte: now } }).sort('date')
    res.json({ success: true, data: webinars })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

export const getWebinarById = async (req, res) => {
  try {
    const webinar = await Webinar.findById(req.params.id)
    if (!webinar) return res.status(404).json({ success: false, message: 'Webinar not found' })
    res.json({ success: true, data: webinar })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
