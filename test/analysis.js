const process = require('../src/analysis')

const PINGS_TEST_FILE = `${__dirname}/pings.csv`

describe('analysis', () => {
  let analysis

  beforeEach(async () => {
    analysis = await process(PINGS_TEST_FILE)
  })

  test('average speeds', async () => {
    expect(analysis.getAverageSpeeds()).toEqual([
      ['A', 0.4444444444444444],
      ['B', 0.21428571428571427],
      ['C', 0.7954951288348661],
      ['M', 0]
    ])
  })

  test('most traveled', () => {
    expect(analysis.getMostTraveled(3, 1553273158)).toEqual([
      ['C', 11.313708498984763],
      ['A', 7],
      ['B', 3]
    ])
  })

  test('possible damage', () => {
    expect(analysis.getPossiblyDamaged()).toEqual([
      ['M', 'Insufficient pings']
    ])
  })
})
