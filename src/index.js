const soap = require("soap");
const X2JS = require('x2js');
const SOAP_URL = "http://127.0.0.1:28120/WebService.asmx?WSDL";
const soapClient = soap.createClientAsync(SOAP_URL);
const parser = new X2JS();

module.exports.getData = async (method, args = null) => {
  return soapClient.then(client => client[method + "Async"](args).then(response => parser.xml2js(parser.xml2js(response[1]).Envelope.Body[method + "Response"].return).DBSET));
}

// module.exports.add = (a, b) => a + b;