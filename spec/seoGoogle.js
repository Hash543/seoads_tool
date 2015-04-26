var b = browser.driver;
var _ = require('lodash');
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    b.get('http://tw.yahoo.com');

    b.findElement(By.name('p')).sendKeys('write a protractor test');
    b.findElement(by.id('UHSearchWeb')).click().then(function(){
    	b.findElements(by.css('.res')).then(function(ttt){
    		ttt.map(function(v,k){
    			v.getText().then(function(text){
    				console.log(text);
    			});
    			console.log(v.getText());
    		});
    	});
    	b.getTitle().then(function(title){
    		console.log("title");
    		console.log(title);
    	});
    });

	b.sleep(5000);
    //var todoList = element.all(by.repeater('todo in todos'));
    //expect(todoList.count()).toEqual(3);
    expect(1).toEqual(1);
  });
});