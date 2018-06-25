"use strict"
const pdf = require('html-pdf')

module.exports = (context, callback) => {
  const json = JSON.parse(context)
  const html = json.html
  const config = json.config

  pdf.create(html, config)
    .toStream((err, stream) => {
    if (err) {
      return callback(err, null)
    }

    stream.pipe(process.stdout)
  })
}
