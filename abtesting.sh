# apache ab testing script
ab -H "Accept-Encoding: gzip,deflate" -T "application/soap+xml;charset=UTF-8" -p "test.txt" -n 500 -c 100 http://localhost:28120/WebService.asmx

# test.txt for ab testing
#<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:act="http://action.wim.cbpc.com">
#   <soap:Header/>
#   <soap:Body>
#      <act:getEmployee/>
#   </soap:Body>
#</soap:Envelope>