//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 yahoo or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var chromeLocation = require('chrome-location');
var seoConfig = require('../config/seoConfig');
var seo = seoConfig.seo;
var scConfig = seoConfig.scConfig;
var yconfig = JSON.parse(fs.readFileSync(scConfig.asYahoo));
if(_.isUndefined(yconfig.keyword)){
    console.log("yconfig is undefined!!!");
    throw "yconfig is undefined!!!";
}
var i;
var linkMatch = null;
var permote = false;
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var b = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var linkMatching = function(t){
    console.log("linkMatching...");
    var target = t || [];
    var i;
    console.log(t);
    t.map(function(v , k){
        //模擬向下捲的行為
        b.executeScript('window.scrollTo(0,'+ (200*(i+1)) +');').then();
        b.sleep(_.random(500 , 3000));
        //過濾蒐尋結果的連結網址
        v.getAttribute('href').then(function(attr){
            console.log("  --href:" + attr);
            if(!attr.match(yconfig.url) ){
                console.log("對此網址進行刺殺");
                console.log(attr);
                linkMatch = v;
            }
        });
    });
}
var searchResultFilter = function(){
    console.log("searchResultFilter...");
    b.sleep(_.random(2000, 8000));
    b.findElements(By.css('.bcan1cb')).then(function(t){
        if(t.length > 0){
            linkMatching(t);
        }
    }).then(function(){
        //進行換頁的動作
        //需要注意 yahoo 頁面有兩種版型
        if(linkMatch == null){
            console.log("上方廣告區塊沒有符合資料!");
        }else{
            linkMatch.click();
            b.sleep(_.random(2000 , 8000));
            console.log("\n\n---------------job done---------------\n\n");
        }
    });
    /*b.getTitle().then(function(title){
        console.log("title");
        console.log(title);
    });*/
}
//console.log(fs.readFileSync(chromeLocation + "\\..\\..\\user data\\default\\cookies"));
//fs.openSync(chromeLocation + "\\..\\..\\user data\\default\\cookies");
//fs.openSync(process.env.APPDATA + "\\Mozilla\\Firefox\\Profiles\\p5577gez.default");
//console.log(process.env.APPDATA);
console.log("patten:");
console.log("  --keyword:" + yconfig.keyword);
console.log("  --url:" + yconfig.url);
b.get('http://tw.yahoo.com');
b.sleep(_.random(2000, 8000));
b.findElement(By.name('p')).sendKeys(yconfig.keyword);
b.findElement(By.id('UHSearchWeb')).click().then(function(){
    searchResultFilter();
});
b.sleep(5000);
b.quit();