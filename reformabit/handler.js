"use strict"
const pdf = require('html-pdf')

module.exports = (context, callback) => {
  const json = JSON.parse(context)

  pdf.create(json.html, json.config)
    .toStream((err, stream) => {
    if (err) {
      return callback(err, null)
    }

    stream.pipe(process.stdout)
  })
}
