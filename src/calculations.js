const getDistance = (ping1, ping2) => {
  const xDiff = Math.abs(ping1.x - ping2.x)
  const yDiff = Math.abs(ping1.y - ping2.y)
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
}

const getSpeed = (ping1, ping2) => {
  const time = Math.abs(ping1.timestamp - ping2.timestamp)
  return getDistance(ping1, ping2)/time
}

module.exports = {
  getDistance, getSpeed
}