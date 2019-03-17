$(document.documentElement).on('click', '.test', function () {
    if($(this).style('display') === "none"){
        $(this).style('display','inline');
    }
    else{
        $(this).style('display','none');

    }
});