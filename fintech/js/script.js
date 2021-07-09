document.body.style.overflow = 'hidden';
$(document).ready(function(){
    $('.modal').modal().on('shown', function(){
        $('body').css('overflow', 'hidden');
    }).on('hidden', function(){
        $('body').css('overflow', 'auto');
    })
    // FOOTER
    var d = new Date(), output = d.getFullYear();        
    $("#year").text(output);
});