const math = require('./index');
const db = require('./lib/db');

//  demo 1
test('单元测试demo', () => {
  expect(math.add(2, 6)).toBe(8);
});

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
