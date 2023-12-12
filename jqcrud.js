
$(function(){
    loadRecipes();
    $("#recipes").on("click",".btn-danger",handleDeleter)
    $("#addBtn").click(addPost);
})

function addPost (){
    var title = $("#title").val();
    var body = $("#body").val();

    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts/",
        method: "POST",
        data:{title,body},
        success: function(response){
            console.log(response);
            loadRecipes();

        }
    })

}

function handleDeleter(){
var btn = $(this);
var parentDiv = btn.closest(".recipe");
let id = parentDiv.attr("data-id");
console.log(id);
$.ajax({
    url:"https://jsonplaceholder.typicode.com/posts/"+id,
    method: "DELETE",
    success: function(){
        loadRecipes();
    }
});
}
function loadRecipes(){

    $.ajax({
        url:"https://jsonplaceholder.typicode.com/posts/",
        method:"GET",
        error: function(response){
            var recipes = $("#recipes");
           recipes.html("an error has occues");
        },
        success: function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for ( var i=0;i<response.length;i++){
                var rec = response[i];

                recipes.append("<div class='recipe' data-id='" + rec.id + "'><h3>" + rec.title + "</h3> <button class='btn btn-warning btn-sm float-right'>edit</button> <button class='btn btn-danger btn-sm float-right'>delete</button></div>");
                // recipes.append('<div ><h3> ${rec.title}  </h3 >   </div>');
        }}
    });


}

