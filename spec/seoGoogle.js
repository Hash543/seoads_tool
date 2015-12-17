//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 google or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var http = require('http');
var util = require(__dirname + '/../lib/util.js');
var chromeLocation = require('chrome-location');
var seoConfig = require('seoConfig');
var FirefoxProfile = require('firefox-profile');
var seo = seoConfig.seo;
var pageNum = 0;
var browser = util.browser();

var sc; //scenario config
var i; // for loop
var b; // browser webdriver
var permote = false;
var randomViewCount = _.random(1,4);
var randomViewExecCount = 0;
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
var initialRobot = function(cb){
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
                        if(attr.match(sc.url) ){
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
            matchResult.click().then(function(){
                console.log("randomView start");
                randomView();
                console.log("randomView end");
            });
            console.log("\n\n---------------job done---------------\n\n");
        }
    });
    /*b.getTitle().then(function(title){
        console.log("title");
        console.log(title);
    });*/
}
var randomView = function(){
    b.sleep(_.random(2000 , 8000));
    console.log("randomViewExecCount");
    console.log(randomViewExecCount);
    console.log("randomViewCount");
    console.log(randomViewCount);
    var randomNav;
    if(randomViewExecCount < randomViewCount){
        console.log("randomViewExecCount < randomViewCount");
        b.getTitle().then(function(){
            b.sleep(3000);
            console.log("radomview count:" + randomViewExecCount);
            if(b.isElementPresent(webdriver.By.css('nav li a'))){
                b.findElements(By.css('nav > ul > li > a')).then(function(t){
                    randomNav = _.random(0,(t.length-1));
                    console.log("randomNav");
                    console.log(randomNav);
                    t.map(function(v , k){
                        v.getAttribute('href').then(function(href){
                            console.log("key");
                            console.log(k);
                            console.log("href");
                            console.log(href);
                            if(randomNav == k){
                                v.click();
                            }
                        }).then(function(){
                            console.log("randomViewExecCount +++");
                            randomViewExecCount++;
                            b.sleep(_.random(1000 , 3000));
                            b.executeScript('window.scrollTo(0,'+ (50*(_.random(7))) +');').then();
                            b.sleep(_.random(1000 , 3000));
                            b.executeScript('window.scrollTo(0,'+ (50*(_.random(7))) +');').then();
                            b.sleep(_.random(1000 , 3000));
                            console.log(456);
                            randomView();
                        });
                    });
                    console.log(123);
                });
            }
        },15000);
    }else{
        console.log("randomViewExecCount >= randomViewCount");
        b.quit();
    }
}
//console.log(fs.readFileSync(chromeLocation + "\\..\\..\\user data\\default\\cookies"));
//fs.openSync(chromeLocation + "\\..\\..\\user data\\default\\cookies");
//fs.openSync(process.env.APPDATA + "\\Mozilla\\Firefox\\Profiles\\p5577gez.default");
//console.log(process.env.APPDATA);
var options = {
  hostname: 'list168.com',
  port: 80,
  path: '/seoapi/getcustomer.php',
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    sc = JSON.parse(chunk)[0];
    if(_.isUndefined(sc.keyword)){
        console.log("gconfig is undefined!!!");
        throw "gconfig is undefined!!!";
    }
    sc.url = sc.c_address;
    initialRobot(function(){
        console.log("  --keyword:" + sc.keyword);
        console.log("  --url:" + sc.url);
        b.get('http://www.google.com/ncr');
        b.sleep(_.random(2000, 8000));
        b.findElement(By.name('q')).sendKeys(util.splitKeyword(sc.keyword));
        b.sleep(_.random(2000, 8000));
        b.findElement(By.name('q')).sendKeys(webdriver.Key.ENTER).then(function(){
            searchResultFilter();
        });
        /*if(b.isElementPresent(webdriver.By.name('btnG'))){
            b.findElement(By.name('btnG')).click().then(function(){
                searchResultFilter();
            });
        }else{
            b.findElement(By.name('btnK')).click().then(function(){
                searchResultFilter();
            });
        }*/
        /*b.findElement(By.name('btnK')).click().then(function(){
            searchResultFilter();
        });*/
        console.log("result filter");
        b.sleep(5000);
        b.quit();    
    });
    console.log('BODY: ' + chunk);
  });
  res.on('end', function() {
    console.log('No more data in response.')
  })
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();