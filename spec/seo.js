//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 yahoo or google
2.須要強化的關鍵字
3.delay 時間
*/
var b = browser.driver;
var _ = require('lodash');
var i;
describe('permote babysofa seo', function() {
  it('should add a todo', function() {
    b.get('http://tw.yahoo.com');

    b.findElement(By.name('p')).sendKeys('沙發清潔');
    b.findElement(by.id('UHSearchWeb')).click().then(function(){
    	b.findElements(by.css('.res h3 a')).then(function(ttt){
    		for(i=0 ; i<ttt.length ;i++){
    			console.log(ttt[i]);
    			ttt[i].getAttribute('href').then(function(attr){
    				if(attr.match('www.babysofa.com.tw') ){
    					//ttt[i].click();
    				}
    			});
    		}
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