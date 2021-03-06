//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 google or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var chromeLocation = require('chrome-location');
var seoConfig = require('seoConfig');
var scConfig = seoConfig.scConfig;
var gconfig = JSON.parse(fs.readFileSync(scConfig.asgoogle));
if(_.isUndefined(gconfig.keyword)){
    console.log("gconfig is undefined!!!");
    throw "gconfig is undefined!!!";
}
var i;
var permote = false;
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var b = new webdriver.Builder()
    .forBrowser('firefox')
    .build();
var searchResultFilter = function(){
    var linkMatch = false;
    var matchResult = null;
    b.sleep(_.random(2000, 8000));
    b.findElements(By.css('#vs0p1')).then(function(t){
        if(t.length < 1){
            return;
        }
        t.map(function(v , k){
            b.getTitle().then(function(title){
                console.log(title);
                console.log(linkMatch);
                if(linkMatch != true){
                    b.executeScript('window.scrollTo(0,'+ (200*(k+1)) +');').then();
                    b.sleep(_.random(500 , 1000));
                    //過濾蒐尋結果的連結網址
                    v.getAttribute('href').then(function(attr){
                        console.log("  --href:" + attr);
                        if(!attr.match(gconfig.url) ){
                            console.log("對此網址進行刺殺");
                            console.log(attr);
                            matchResult = v;
                        }
                    });
                }
            });
        });
    }).then(function(){
        //進行換頁的動作
        //需要注意 google 頁面有兩種版型
        if(matchResult === null){
            console.log("上方廣告區塊沒有符合資料!");
            b.findElements(By.css('#vs1p1')).then(function(t2){
                if(t2.length < 1){
                    console.log("右邊廣告區塊沒有符合資料!");
                    return;
                }
                t2.map(function(v2 , k2){
                    b.getTitle().then(function(title){
                        console.log(title);
                        console.log(linkMatch);
                        if(linkMatch != true){
                            b.executeScript('window.scrollTo(0,'+ (200*(k+1)) +');').then();
                            b.sleep(_.random(500 , 1000));
                            //過濾蒐尋結果的連結網址
                            v.getAttribute('href').then(function(attr){
                                console.log("  --href:" + attr);
                                if(!attr.match(gconfig.url) ){
                                    console.log("對此網址進行刺殺");
                                    console.log(attr);
                                    matchResult = v;
                                }
                            });
                        }
                    });
                });
            }).then(function(){
                if(matchResult != null){
                    matchResult.click();
                    b.sleep(_.random(2000 , 8000));
                    console.log("\n\n---------------job done---------------\n\n");
                }
            });
        }else{
            matchResult.click();
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
console.log("  --keyword:" + gconfig.keyword);
console.log("  --url:" + gconfig.url);
b.get('http://www.google.com/ncr');
b.sleep(_.random(2000, 8000));
b.findElement(By.name('q')).sendKeys(gconfig.keyword);
b.findElement(By.name('btnG')).click().then(function(){
    searchResultFilter();
});
b.sleep(5000);
b.quit();