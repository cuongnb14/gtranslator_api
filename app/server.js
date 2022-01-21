const express = require('express')
const app = express()
const port = 3000
const ip = '0.0.0.0';
const { translate } = require('~app/translator');



app.get('/translate', async (req, res) => {
  try {
    const from = req.query.from
    const to = req.query.to
    const content = req.query.content

    const result = await translate(from, to, content)
    res.json({result});
  } catch(e) {
    res.status(500).send(e);
  }
  
})

app.listen(port, ip, () => {
  console.log(`Start listening at http://${ip}:${port}`)
})
