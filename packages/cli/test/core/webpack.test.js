const Webpack = require('../../core/webpack')

jest.mock('../../lib/webpack/entries', () => jest.fn())

describe('Webpack', () => {
  describe('#constructor', () => {
    it('defaults to development mode', () => {
      const webpack = new Webpack()
      expect(webpack.config.mode).toEqual('development')
    })
  })
})
