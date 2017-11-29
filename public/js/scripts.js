var $search = $('#search');
var $movie_name = $('#movie_name');

$search.click(function(){
    var movie_name = $movie_name.val();
    $.get('/'+movie_name, function(data) {

    });
});