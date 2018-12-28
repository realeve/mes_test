const { axios } = require('./axios');

/** NodeJS服务端调用：
 *
 *   @database: { 微信开发 }
 *   @desc:     { 小超人活动参与人数及中奖人数 }
 */
module.exports.getBasePeopleCounter = () =>
  axios({
    url: '/78/287145a32b.json'
  });
