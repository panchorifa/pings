const { getSpeed, getDistance } = require('./calculations')

const ping = (x, y, timestamp) => ({x, y, timestamp })

const vehicle = name => {
  const pings = []
  return {
    name,
    pings,
    addPing: (x, y, timestamp) => pings.push(ping(x, y, timestamp)),
    getAverageSpeed: () => {
      if(pings.length < 2) return 0
      let previousPing = null
      const speeds = []
      pings.forEach(p => {
        if (previousPing) speeds.push(getSpeed(previousPing, p))
        previousPing = p
      })
      return speeds.reduce((total, speed) => total + speed, 0)/speeds.length
    },
    getTraveledDistance: (timestamp) => {
      if(pings.length < 2) return 0
      let traveledDistance = 0
      let previousPing = null
      pings.forEach(p => {
        if(previousPing && p.timestamp >= timestamp) {
          traveledDistance += getDistance(previousPing, p)
        }
        previousPing = p
      })
      return traveledDistance
    },
    getReasonForPossibleDamage: () => {
      if (pings.length < 2) return 'Insufficient pings'
      // Other possible reasons:
      // - Check speed/distance between pings and have tresholds ?
      return null
    }
  }
}

const warehouse = () => {
  const vehicles = {}
  return {
    vehicles,
    addVehicle: (name) => {
      let v = vehicles[name]
      if (!v) {
        v = vehicle(name)
        vehicles[name] = v
      }
      return v
    },
    getAverageSpeeds: () => Object.values(vehicles)
      .map(v => [v.name, v.getAverageSpeed()]),
    getMostTraveled: (maxResults, timestamp) => {
      const vehicleDistanceList = Object.values(vehicles)
        .map(v => [v.name, v.getTraveledDistance(timestamp)])
        .sort((a, b) => b[1] - a[1])
      return vehicleDistanceList.slice(0, maxResults)
    },
    getPossiblyDamaged: ()=> Object.values(vehicles)
      .filter(v => !!v.getReasonForPossibleDamage())
      .map(v => [v.name, v.getReasonForPossibleDamage()]),
  }
}

module.exports = {
  ping, vehicle, warehouse
}