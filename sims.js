//此處帶入使用者參數
/* 參數(存放在git ignore 的config)
1.入口 google or google
2.須要強化的關鍵字
3.delay 時間
*/
var _ = require('lodash');
var fs = require('fs');
var exec = require('child_process').exec,
    child;
var error = false;
var adsl = JSON.parse(fs.readFileSync('public/adslconfig.json' , {encoding:'utf-8'}));
//console.log(adsl);
var cb = function(err ,b ,c){
    error = err;
    console.log(err);
    console.log(b);
    console.log(c);
    console.log("callback");
};
var execScenario = function(){
    var execMode = fs.readFileSync('public/execMode.txt', {encoding:'utf-8'});
    console.log('execMode');
    console.log(execMode);
    switch(execMode){
        case('1'):
            console.log("exec seoYahoo");
            child = exec("node spec/seoYahoo.js" , cb);
        break;
        case('2'):
            console.log("exec seoGoogle");
            child = exec("node spec/seoGoogle.js" , cb);
        break;
        case('3'):
            console.log("exec Yahoo assasin");
            child = exec("node spec/asYahoo.js" , cb);
        break;
        case('4'):
            console.log("exec Google assasin");
            child = exec("node spec/asGoogle.js" , cb);
        break;
        default:
            console.log("exec seoYahoo");
            child = exec("node spec/seoYahoo.js" , cb);
    }
};
/*var cleanCookie = function(){
    //chrome cookies
    fs.openSync(chromeLocation + "\\..\\..\\user data\\default\\cookies","w+");
    //firefox cookies
    fs.openSync(process.env.APPDATA + "\\Mozilla\\Firefox\\Profiles\\p5577gez.default" , "w+");
};*/
var isWin = /^win/.test(process.platform);
if(isWin){
    exec('Rasdial "'+ adsl.name +'" /disconnect' ,function(err,stdout ,stderr){
        if(err){
            console.log(err);
            console.log(stdout);
            console.log(stderr);
            console.log("ADSL disconnect fail!");
        }
        exec('Rasdial '+ adsl.name +' '+ adsl.id +' ' + adsl.password , function(err2 ,stdout2 ,stderr2 ){
            if(err2){
                console.log(err2);
                console.log(stdout2);
                console.log(stderr2);
                console.log("ADSL connect fail!");
            }
            execScenario();
        });
    });
}else{
    exec('poff' , function(){
        if(err){
            console.log(err);
            console.log(stdout);
            console.log(stderr);
            console.log("ADSL disconnect fail!");
        }
        exec('pon dsl-provider' , function(err2 ,stdout2 ,stderr2 ){
            if(err2){
                console.log(err2);
                console.log(stdout2);
                console.log(stderr2);
                console.log("ADSL connect fail!");
            }
            execScenario();
        });
    });
}

