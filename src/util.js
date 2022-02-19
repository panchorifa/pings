const fs = require('fs')
const readline = require('readline')

const processFileLines = (filepath, lineProcessorFn) => new Promise(resolve => {
  const reader = readline.createInterface({
    input: fs.createReadStream(filepath),
  })
  reader.on('line', line => lineProcessorFn(line))
  reader.on('close', resolve)
})

module.exports = {
  processFileLines,
}