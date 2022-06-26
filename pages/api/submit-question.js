export default async function handler(req, res) {
  try {

    const response = await fetch(process.env.FLOOQ_DATAFLOW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body),
    })

    if (!response.ok) {
      res.status(500).json('Failed to send question')
    } else {
      res.status(200).json('Success')
    }

  } catch (e) {
    res.status(500).json(e)
  }
}
