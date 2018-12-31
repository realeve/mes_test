const {
  getData
} = require('./index');

test("MES test", async () => {
  const METHODS = ["getEmployee"]; // 需要测试接口方法清单
  const THREADS = 100; // 每组发送请求数量
  const MAX = 500; // 最多测试请求的实力
  const TIME_TOTAL = 10000; // 测试时间窗口长度设定，单位：毫秒

  let INDEX = 0; // 请求计数
  let COMPLETED = 0; // 完工请求计数
  let TESTERS = new Map(); // 测试请求分组记录，{"method1" => [...],"method2" => [...]}

  // 测试环境初始化
  const init = () => {
    console.log("task is started at " + new Date());
    METHODS.forEach(m => {
      TESTERS.set(m, []);
    });
  }

  // 测试请求对象
  class Tester {
    constructor(method) {
      this.method = method;
      this.id = ++INDEX;
      this.startTime = new Date();
      this.endTime = '';
      this.version = '';
      this.rowLength = 0;
      this.status = -1;
      this.errMsg = '';
    }

    getConsume() {
      return (this.endTime - this.startTime) / 1000;
    }

    setResult(result) {
      this.endTime = new Date();
      if (!result) {
        return;
      }
      this.version = result.VER;
      this.status = result.STATUS;
      this.errMsg = result.ERR_MSG;
      if (result.ROW) {
        this.rowLength = result.ROW.length;
      }
    }
  }

  // 单个测试
  const invoke = async (method, args = null) => {
    let tester = new Tester(method);
    let result = await getData(method, args);
    tester.setResult(result);
    TESTERS.get(method).push(tester);
    ++COMPLETED;
    // console.log(`tester ${tester.id} is ended, and used ${tester.getConsume()}s, ${COMPLETED}/${MAX}`);
    if (COMPLETED == MAX) {
      analysis();
    }
  }

  // 分组发送
  const groupTester = (quantity) => {
    for (let i = 0; i < quantity; i++) {
      invoke("getEmployee");
    }
  }

  // 拆分任务
  const splitTask = async () => {
    let times = MAX / THREADS;
    let interval = TIME_TOTAL / times;
    for (let i = 0; i < times; i++) {
      setTimeout(groupTester, interval * i, THREADS);
    }
  }

  // 结果分析
  const analysis = () => {
    console.log("analysising");
    // console.log(TESTERS);
    let wholeResult = [];
    let result = TESTERS.forEach((v, k) => {
      if (v.length === 0) {
        return {
          method: k,
          min: null,
          max: null,
          total: null,
          avg: null,
          methodResult: null
        };
      }
      let min = Number.MAX_SAFE_INTEGER;
      let max = 0;
      let total = 0;
      let methodResult = v.map(t => {
        let consume = t.getConsume();
        min = Math.min(min, consume);
        max = Math.max(max, consume);
        total += consume;
        return {
          VER: t.version,
          LENGTH: t.rowLength,
          CONSUME: consume,
          STATUS: parseInt(t.status)
        }
      });
      wholeResult.push({
        method: k,
        min,
        max,
        total,
        avg: total / v.length,
        methodResult
      });
    })
    // let resultString = JSON.stringify(Array.from(resultMap.values()).map(t => {
    //   return {
    //     VER: t.result.VER,
    //     LENGTH: t.result.ROW.length,
    //     CONSUME: t.consume
    //   }
    // }));
    // console.log(resultString);
    console.log("All tasks has done at " + new Date());
    console.log(JSON.stringify(wholeResult));
    wholeResult.forEach(m => {
      console.log()
      expect(m.avg).toBeLessThan(2);
      m.methodResult.forEach(t => {
        expect(t.VER).toBe("123123");
        expect(t.LENGTH).toBe(3);
        expect(t.STATUS).toBe(0);
      })
    })
    return wholeResult;
  }

  init();

  try {
    expect.assertions(1);
    splitTask();
  } catch (ex) {
    console.log(ex);
  }

});