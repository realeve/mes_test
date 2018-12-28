const { xml2js } = require('./xml2js');

test('xml转json', async () => {
  const xml = `<root>Hello xml2js!</root>`;
  let res = await xml2js(xml);
  console.log(res);
  expect(res.root).toContain('Hello xml2js');

  // 测试xml报错
  const errXml = `<root>err root<root>`;
  expect.assertions(1);
  xml2js(errXml).catch((e) => {
    expect(e).toMatch(/root/);
  });
});
