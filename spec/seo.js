//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 yahoo or google
2.須要強化的關鍵字
3.delay 時間
*/
var b = browser.driver;
var _ = require('lodash');
var fs = require('fs');
var seoConfig = require('../config/seoConfig');
var seo = seoConfig.seo;
var scConfig = seoConfig.scConfig;
var yconfig = JSON.parse(fs.readFileSync(scConfig.yahoo));
if(_.isUndefined(yconfig.keyword)){
    console.log("yconfig is undefined!!!");
    throw "yconfig is undefined!!!";
}
var i;
var permote = false;
describe('permote keyword ' + yconfig.keyword + ' seo on Yahoo', function() {
  it('should add a todo', function() {
    b.get('http://tw.yahoo.com');
    b.sleep(_.random(2000, 8000));
    b.findElement(By.name('p')).sendKeys(yconfig.keyword);
    b.findElement(by.id('UHSearchWeb')).click().then(function(){
    	b.findElements(by.css('.res h3 a')).then(function(ttt){
    		for(i=0 ; i<ttt.length ;i++){
                //模擬向下捲的行為
    			b.executeScript('window.scrollTo(0,'+ (200*(i+1)) +');').then(function(){
                    
                });
                //過濾蒐尋結果的連結網址
                ttt[i].getAttribute('href').then(function(attr){
                    if(attr.match(yconfig.url) ){
                        ttt[i].click();
                    }
                });
    		}
    	}).then(function(){
            //進行換頁的動作
        });
    	/*b.getTitle().then(function(title){
    		console.log("title");
    		console.log(title);
    	});*/
    });

	b.sleep(5000);
    //var todoList = element.all(by.repeater('todo in todos'));
    //expect(todoList.count()).toEqual(3);
    expect(1).toEqual(1);
  });
});