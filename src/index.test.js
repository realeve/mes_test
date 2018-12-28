const math = require('./index');
const { xml2js } = require('./xml2js');

test('单元测试demo', () => {
  expect(math.add(2, 6)).toBe(8);
});

test('xml转json', async () => {
  const xml = `<root>Hello xml2js!</root>`;
  let res = await xml2js(xml);
  console.log(res);
});
