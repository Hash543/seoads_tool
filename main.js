var _ = require('lodash');
var fs = require('fs');
var jade = require('jade');
var fr = require('forever-monitor');
var seoConfig = require('seoConfig');
var seo = seoConfig.seo;
var assassin = seoConfig.as;
var scConfig = seoConfig.scConfig;
var scf;
var commonTemplate = "editConfig" ;
var execMode = 'public/execMode.txt';
var adslconfig = 'public/adslconfig.json';
var fem;
var errorLog = fs.openSync('public/error.log' , 'w+');
var adslFile = 'public/adslconfig.json';
var serviceId;

if(fs.existsSync(execMode)){
	fem = fs.openSync(execMode , 'r+');
}else{
	fem = fs.openSync(execMode , 'w+');
	fs.writeSync(fem , '1');
}
var currentMode = fs.readFileSync(execMode , {encoding:'utf-8'});
Object.keys(scConfig).map(function(value, index) {
   	if(!fs.existsSync(scConfig[value])){
   		scf = fs.openSync(scConfig[value] , 'w+');
   		fs.writeSync(scf, '{}', 'utf-8'); 
   	}
});
var msgDisplay = function(err , msg){
    var t = $(".errorMsg");
    if(err == true){
        t.css("background" , "#ff0000");
    }
    t.html(msg);
    t.fadeIn( "slow");
    setTimeout(function(){
        t.fadeTo( "slow", 0 ,function(){
            t.css("display" , "none");
            t.css("background" , "#cccc77");
            t.css("opacity" , 1);
        });
    },3000);
};
var startService = function(){
    //forever monitor
}
$(document).ready(function(){
    var execMode = $('input[name="execMode"]');
    $('input[name="execMode"][value="'+currentMode+'"]').prop('checked',true);
    var funcs = $(".func"),f , views , funcName , funcForm , v ;
    //處理ADSL config 檔案的編輯
    $(function() {
        var adsl = $("#adslConnect");
        var adslJade = jade.compileFile("views/adslconfig.jade");
        var content = fs.readFileSync(adslFile , {encoding:'utf-8'});
        var adslConfig = JSON.parse( content );
        if(adslConfig === null){
            adslConfig = {
                name: '',
                id: '',
                password: ''
            }
        }
        var adslHtml = adslJade({adsl: adslConfig});
        $("#adslConfig").html(adslHtml);
        $("#updateAdsl").click(function(e){
            console.log(123);
            var newConfig = {
                name: $(this).parent().siblings("div:eq(0)").children("input").val(), 
                id: $(this).parent().siblings("div:eq(1)").children("input").val(), 
                password: $(this).parent().siblings("div:eq(2)").children("input").val()
            };
            var f = fs.openSync(adslFile , 'w+');
            fs.writeSync(f, JSON.stringify(newConfig) , 'utf-8');
        });
    });
    $( "#adslConfig" ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });
 
    $( "#adslConnect" ).click(function(e) {
        e.preventDefault();
        $( "#adslConfig" ).dialog( "open" );
    });
    //處理四種功能的內容以及點效果
    funcs.each(function(e , j){
        funcName = $(this).attr("config"); 
        var data = JSON.parse(fs.readFileSync(scConfig[funcName], {encoding:'utf-8'}));
        if(data === null){
            data = {
                keyword: '',
                url: ''
            }
        }
        views = jade.compileFile("views/editConfig.jade");
        funcForm = views({data:data , funcName: funcName});
        $(this).after(funcForm);
    }).click(function(e){
        e.preventDefault();
        $(this).siblings(".funcShell").css("display","block");
    });
    execMode.change(function(e){
    	var val = e.currentTarget.value;
	  	fs.write(fem , val , 0);
    });
    
    $(".funcShell input[type='button']").click(function(e){
        var curNode = $(this);
        var keyword = curNode.parent().siblings("div:eq(0)").children("input").val();
        var url = curNode.parent().siblings("div:eq(1)").children("input").val();
        var curFuncName = curNode.siblings("input[type='hidden']").val();
        var updateResult ;
        var newData ={
            keyword: keyword, 
            url: url
        };
        var f = fs.openSync(scConfig[curFuncName] , 'w+');
        fs.write(f, JSON.stringify(newData) , 'utf-8' , function(err , b , c){
            if(err === null){
                msgDisplay(false , "It's ok!");
            }else{
                msgDisplay(true , "It's fail!");
            }    
        });
    });
    //處理啟動服務的功能
    $(".startService input").click(function(e){
        if($(this).prop("checked") === true){
            var child = fr.start ("sims.js" , {
                silent: false, 
                max: 5
            });
            console.log(child);
            child.on('start' , function(){
                console.log("sims.js start work!");
            });
            child.on('restart' , function(){
                console.log("sims.js restart work!");
            });
        }else{
            console.log(3221);
        }
    });
});