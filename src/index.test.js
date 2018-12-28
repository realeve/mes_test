const math = require('./index');
const { xml2js } = require('./lib/xml2js');
const db = require('./lib/db');

//  demo 1
test('单元测试demo', () => {
  expect(math.add(2, 6)).toBe(8);
});

// demo 2
test('xml转json', async () => {
  const xml = `<root>Hello xml2js!</root>`;
  let res = await xml2js(xml);
  console.log(res);
  expect(res.root).toContain('Hello xml2js');
});

// demo 3
test('ajax接口测试', async () => {
  let res = await db.getBasePeopleCounter();
  expect(res.header).toHaveLength(2);
  expect(res.data).toEqual([
    {
      lucky_user: 201217,
      all_user: '24508139'
    }
  ]);
  expect(res).toMatchObject({
    rows: 1,
    header: ['lucky_user', 'all_user'],
    title: '小超人活动参与人数及中奖人数',
    source: '数据来源：微信开发'
  });
});
