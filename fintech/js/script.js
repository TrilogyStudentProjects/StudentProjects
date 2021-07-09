var version = 1.22;
console.log(version);
$(document).ready(function(){
    // FOOTER
    var d = new Date(), output = d.getFullYear();        
    $("#year").text(output);
});