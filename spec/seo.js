//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 yahoo or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var chromeLocation = require('chrome-location');
var seoConfig = require('seoConfig');
var seo = seoConfig.seo;
var scConfig = seoConfig.scConfig;
var yconfig = JSON.parse(fs.readFileSync(scConfig.yahoo));
if(_.isUndefined(yconfig.keyword)){
    console.log("yconfig is undefined!!!");
    throw "yconfig is undefined!!!";
}
var i;
var permote = false;
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var b = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
var changePage = function(){
    var pageChanged = false;
    b.findElements(By.css('.next')).then(function(next){
        if(next.length > 0){
            next[0].click();
        }else{
            b.findElements(By.css('#pg-next')).then(function(pgnext){
                if(pgnext.length > 0){
                    pgnext[0].click();
                    pageChanged = true;
                    searchResultFilter();
                }
            });
        }
    }).then(function(){
        if(pageChanged === false){
            searchResultFilter();
        }
    });
}
var matchingPromise = function(link){
    link.getAttribute('href').then(function(attr){
        console.log("  --href:" + attr);
        if(attr.match(yconfig.url) ){
            link.click();
            return true;
        }
    });
}
var linkMatching = function(t){
    console.log("linkMatching...");
    var target = t || [];
    var i;
    for(i=0 ; i<target.length ;i++){
        //模擬向下捲的行為
        b.executeScript('window.scrollTo(0,'+ (200*(i+1)) +');').then();
        b.sleep(_.random(500 , 3000));
        //過濾蒐尋結果的連結網址
        matchingPromise(target[i]);
    }
}
var searchResultFilter = function(){
    console.log("searchResultFilter...");
    var linkMatch = false;
    b.sleep(_.random(2000, 8000));
    b.findElements(By.css('.res h3 a')).then(function(t){
        if(t.length > 0){
            linkMatch = linkMatching(t);
        }else{
            b.findElements(By.css('a.ac-1st')).then(function(tt){
                linkMatch = linkMatching(tt);
            });
        }
    }).then(function(){
        //進行換頁的動作
        //需要注意 yahoo 頁面有兩種版型
        if(linkMatch === false){
            changePage();
        }
    });
    /*b.getTitle().then(function(title){
        console.log("title");
        console.log(title);
    });*/
}
var run = function(){
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
}
run();