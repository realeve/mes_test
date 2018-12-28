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
