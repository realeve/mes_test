const parseString = require('xml2js').parseString;
module.exports.xml2js = (xml, option = { trim: true }) =>
  new Promise((resolve, reject) => {
    parseString(xml, option, function(e, res) {
      if (e) {
        reject(e);
      } else {
        resolve(res);
      }
    });
  });
