var http = require('http');
var fs = require('fs');
var handleRequest = function(request, response){
	response.setHeader("Content-Type", "text/html");
	response.setHeader("charset", "utf-8");
	var html = fs.readFileSync('./template/setConfig.html');
	//console.log(request);
    response.end(html );
}
var server = http.createServer(handleRequest);

server.listen(8080,'127.0.0.1',function(){
    console.log('HTTP伺服器在 http://127.0.0.1:8080/ 上運行');
});
/*var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
var _ = require('lodash');
var Browsers = ['chrome','chrome'];
var driver = new webdriver.Builder()
    .forBrowser(Browsers[_.random(1)])
    .build();

driver.get('http://www.google.com/ncr');
driver.findElement(By.name('q')).sendKeys('webdriver');
driver.findElement(By.name('btnG')).click();
driver.wait(until.titleIs('webdriver - Google Search'), 10000);
driver.quit();*/