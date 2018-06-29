const Slate = require('../../core/slate')

describe('Slate', () => {
  describe('#constructor', () => {
    it('defaults to development environment', () => {
      const slate = new Slate()
      expect(slate.env).toEqual('development')
    })
  })
})
