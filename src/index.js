const soap = require("soap");
const X2JS = require('x2js');
const SOAP_URL = "http://127.0.0.1:28120/WebService.asmx?WSDL";
const soapClient = soap.createClientAsync(SOAP_URL);
const parser = new X2JS();

const getJSONResult = (method, xml) => {
  let result = parser.xml2js(xml[1]).Envelope.Body[method + "Response"].return;
  return parser.xml2js(result);
}

module.exports.getData = async (method, args = null) => {
  let client = await soapClient.then(c => c[method + "Async"]);
  return client(args).then(response => getJSONResult(method, response).DBSET);
}

// module.exports.add = (a, b) => a + b;