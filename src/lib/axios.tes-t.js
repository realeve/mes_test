const { axios } = require('./axios');

test('axios 传入数组参数', async () => {
  let res = await axios({
    url: 'http://api.cbpc.ltd/78/287145a32b.json',
    data: {
      t: []
    }
  });
  expect(res.header).toHaveLength(2);
});

test('axios 报错', () => {
  // expect.assertions(1);
  return expect(
    axios({ url: 'http://api.cbpc.ltd/444' })
  ).rejects.toMatchObject({
    data: { msg: '不存在的路由:444', status: '500', url: '444' },
    description: '服务器发生错误，请检查服务器。不存在的路由:444'
  });
});
