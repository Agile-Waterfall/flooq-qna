export default function handler(req, res) {
  const data = req.body
  console.log(data)

  // TODO: Send to data flow

  res.status(500).json('Failed to send question')
}
