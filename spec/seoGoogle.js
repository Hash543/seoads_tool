//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 google or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var util = require(__dirname + '/../lib/util.js');
var chromeLocation = require('chrome-location');
var seoConfig = require('seoConfig');
var FirefoxProfile = require('firefox-profile');
var seo = seoConfig.seo;
var scConfig = seoConfig.scConfig;
var gconfig = JSON.parse(fs.readFileSync(scConfig.seogoogle));
var pageNum = 0;
var browser = util.browser();
if(_.isUndefined(gconfig.keyword)){
    console.log("gconfig is undefined!!!");
    throw "gconfig is undefined!!!";
}
var i; // for loop
var b; // browser webdriver
var permote = false;

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
var innitialRobot = function(cb){
    if(browser == 'chrome'){
        //-------------------
        var chrome = require('selenium-webdriver/chrome');
        var opts = new chrome.Options();
        opts.addArguments(['user-agent="'+util.randomUA()+'"']);
        //-------------------
        b = new webdriver.Builder().
            withCapabilities(opts.toCapabilities()).
            build();
        cb();
    }else{
        //----------firefox user agent test---------
        var myProfile = new FirefoxProfile();        
        var capabilities = webdriver.Capabilities.firefox();
        // here you set the user-agent preference 
        myProfile.setPreference('general.useragent.override', util.randomUA());
        console.log(myProfile);

        // attach your newly created profile 
        myProfile.encoded(function(encodedProfile) {
            capabilities.set('firefox_profile', encodedProfile);
            console.log(encodedProfile);
            // start the browser 
            b = new webdriver.Builder().
                withCapabilities(capabilities).
                build();
            cb();
        });
        //-------------------    
    }
};
//--------------------    

var changePage = function(){
    var pageChanged = false;
    pageNum++;
    console.log("   --- should change page!");
    b.findElements(By.id('pnnext')).then(function(next){
        if(next.length > 0){
            next[0].click();
        }
    }).then(function(){
        if(pageChanged === false){
            searchResultFilter();
        }
    });
}
var searchResultFilter = function(){
    var linkMatch = false;
    var matchResult = null;
    b.sleep(_.random(2000, 8000));
    b.findElements(By.css('.srg .g .r a')).then(function(t){
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
                        if(attr.match(gconfig.url) ){
                            matchResult = v;
                        }
                    });
                }
            });
        });
    }).then(function(){
        //進行換頁的動作
        //需要注意 google 頁面有兩種版型
        console.log("進行換頁的動作");
        console.log(linkMatch);
        if(matchResult === null){
            if(pageNum < 10){
                changePage();
            }
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
innitialRobot(function(){
    console.log("patten:");
    console.log("  --keyword:" + gconfig.keyword);
    console.log("  --url:" + gconfig.url);
    b.get('http://list168.com/test.php');
    b.sleep(_.random(2000, 5000));
    b.get('http://www.google.com/ncr');
    b.sleep(_.random(2000, 8000));
    b.findElement(By.name('q')).sendKeys(util.splitKeyword(gconfig.keyword));
    b.findElement(By.name('btnG')).click().then(function(){
        searchResultFilter();
    });
    b.sleep(5000);
    b.quit();    
});
