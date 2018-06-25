"use strict"

const getStdin = require('get-stdin')
const pdf = require('html-pdf')

getStdin().then(val => {
  const json = JSON.parse(val)

  pdf.create(json.html, json.config)
    .toStream((err, stream) => {
      if (err) {
        return console.error(err)
      }

      stream.pipe(process.stdout)
    })
}).catch(e => {
  console.error(e.stack)
})
