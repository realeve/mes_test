const { getData } = require('./index');

// const METHODS_TARGET = new Map();
// METHODS_TARGET.set("getEmployee", {
//   version: "123123",
//   length: 3,
//   status: "0"
// })

// test("MES test", async () => {
//   // 单个测试
//   Array.from(METHODS_TARGET.keys()).forEach(key => {
//     let target = METHODS_TARGET.get(key);
//     getData(key).then(result => {
//       expect(result.VER).toBe(target.version);
//       expect(result.ROW.length).toBe(target.length);
//       expect(result.STATUS).toBe(target.status);
//     });
//   });

// });

const tasks = [
  {
    taskName: 'getEmployee',
    params: {
      version: '123123',
      length: 3,
      status: '0'
    }
  }
];

test('MES test', async () => {
  for (let i = 0; i < tasks.length; i++) {
    const { taskName, params } = tasks[i];
    console.log(`开始测试(${i + 1}/${tasks.length}), 接口:${taskName},`);
    let result = await getData(taskName);

    expect(result).toMatchObject({
      VER: params.version,
      STATUS: params.status
    });

    expect(result.ROW.length).toBe(params.length);

    // 此处没有对row里面的内容测试,需要保证后续的代码更新，在row中返回的数据能通过测试
  }
});
