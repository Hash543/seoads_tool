$(document).ready(function(){
	var currentMode = $('input[name="currentMode"]').val();
    var execMode = $('input[name="execMode"]');
    $('input[name="execMode"][value="'+currentMode+'"]').prop('checked',true);
    execMode.change(function(e){
    	jQuery.ajax( '/', {
    		method: 'post',
    		data: {
    			mode: e.target.value
    		},
    		complete: function(d , s){
    			console.log(d);
    			console.log(s);
    		}
    	} );
    });
});