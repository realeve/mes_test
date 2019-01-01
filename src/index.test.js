const {
  getData
} = require('./index');

const METHODS_TARGET = new Map();
METHODS_TARGET.set("getEmployee", {
  version: "123123",
  length: 3,
  status: "0"
})

test("MES test", async () => {
  // 单个测试
  Array.from(METHODS_TARGET.keys()).forEach(key => {
    let target = METHODS_TARGET.get(key);
    getData(key).then(result => {
      expect(result.VER).toBe(target.version);
      expect(result.ROW.length).toBe(target.length);
      expect(result.STATUS).toBe(target.status);
    });
  });

});