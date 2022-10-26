$(document).ready(function() {
    let cards = [];
    let result = '';
     //l'endpoint 'http://localhost:8080/api/cards' restituisce i dati contenuti nella tabella progetto
    $.get('http://localhost:8080/api/cards', function(response) {
        //cards = JSON.parse(response);
        for (card of response) {
            result += createCard(card);
        }
        $('.galleria').html(result);
    });

    

    $('.galleria-card').click(function() {
        alert('ciao');
    });
    
    console.log($('.galleria-card'));

});

/*
TEMPLATE OF A CARD
    <div class="col">
        <div class="card h-100 w-100 ">
          <img src="img/ImageCard6.jpg" class="card-img-top h-50" alt="...">
          <div class="card-body h-50">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text w-100 h-50 text-truncate">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
              aliquid eaque in delectus nobis nisi? Cupiditate itaque saepe deserunt nisi vero corporis voluptas
              aliquam, delectus omnis! Saepe id quo harum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Labore libero unde veritatis quod minima fugiat soluta repudiandae ipsum dolore odio praesentium, neque
              non ipsam! Nulla excepturi inventore nam odit commodi.</p>
              
              <p>More information</p>
            <a href="#" class="text-end">
              <p>More information</p>
            </a>
          </div>
        </div>
      </div>
*/

function createCard(card) {
    return `<div class="col">
    <div class="card h-100 w-100 galleria-card" data-id="${card.id}">
      <img src="${card.img}" class="card-img-top h-50" alt="...">
      <div class="card-body h-50">
        <h5 class="card-title">\${card.titolo}}</h5>
        <p class="card-text w-100 h-50 text-truncate">${card.descrizione}</p>
        <a href="#" class="text-end">
          <p>More information</p>
        </a>
      </div>
    </div>
  </div>`

}