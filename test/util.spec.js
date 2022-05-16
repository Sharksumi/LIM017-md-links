import { getAbsolutePath } from '../util.js'

const routeTest = 'C:\\Users\\Andrea Trevejo\\Desktop\\Laboratoria\\LIM017-md-links\\MD3.md'

describe('getAbsolutePath', () => {
  it('Show resolve path in windows', () => {
    expect(getAbsolutePath('./MD3.md')).toBe(routeTest)
  })
})