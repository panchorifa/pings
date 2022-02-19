const { processFileLines } = require('./util')
const { warehouse } = require('./models')

const process = async filepath => {
  const w = warehouse()
  await processFileLines(filepath, line => {
    const [name, x, y, timestamp] = line.split(',')
    const vehicle = w.addVehicle(name)
    vehicle.addPing(x, y, timestamp)
  })
  return w
}

module.exports = process