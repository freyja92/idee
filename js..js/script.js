$(document).ready(function() {
  let cardId = window.location.href.slice(window.location.href.indexOf('?') + 1);
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

  $.get('http://localhost:8080/api/cards/' + cardId, function(response) {
      result = createAnteprima(response);
      $('.anteprima').html(result);
  });



});

$(document).on('click', '.galleria-card', function(event) {
  window.location.replace('preview.html?'+$(event.target).parents('.galleria-card').data("id"), 'search.html/');
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
      <p class="card-text w-100 h-50 line-clamp">${card.descrizione}</p>
      <div class="card" style="border-color:#38B6FF; " >
        <div class="card-body text-center">
          <b>€ \${card.soldiRaccolti}</b>  a fronte di € \${card.soldiObiettivo}
        </div>
      </div>
  
  </div>
</div>
</div>`

}

function createAnteprima(card) {
  return `<div class="row">
<div class="col-8">
<h1 class="card-title">\${card.titolo}</h1>
<img src="${card.img}" style="width:100%" >
<p class="display-6">${card.descrizione}</p>
    </div>
    <div class="col">
        <div class="d-grid gap-3 col-6 mx-auto">
            <button class="btn btn-lg " type="button" style="background-color:rgb(246, 246, 55) !important;">Dona</button>
            <p><b>€ \${card.soldiRaccolti}</b>  a fronte di € \${card.soldiObiettivo}</p>
            <button class="btn btn-lg " type="button">Condividi</button>
            <button class="btn btn-lg" id="btn" type="button">Collabora</button>
          </div>
        
</div> 
</div> `
;
}