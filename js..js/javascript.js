$(document).ready(function () {
    let i = 0;
    let cardsList = [];

    $.get('http://localhost:8080/api/cards', function (response) {
        console.log(response); //debug
        //$("#content").load("accordion.html");
        let anteprima = '<div class="card" id="card">';
        for (card of response) {
            i++;
            card+=
        
           ' <img src="'+img+'" class="card-img-top h-50" alt="...">'+
           '<div class="card-body">'+
              '<h5 class="card-title">'+ i +'</h5>'+
             ' <p class="card-text h-50 text-truncate">'+ card.descrizione +'.</p>'+
              '<a href="#" class="text-end">'+
               ' <p>More information</p>'+
             ' </a>'+
           ' </div>'+
          '</div>';
          cardsList[i]= {
            id: card.id,
            descrizione: card.descrizione
          }
        }      $("#content").append(card);
});
})