$(document).ready(function() {
  alert(tinymce.Editor.translate('<p>%26euro%3B<%2Fp></p>'));
  let url = window.location.href;
  let cardId = window.location.href.slice(window.location.href.indexOf('?') + 1); //this is not only cardid, it may be search result
  let cards = [];
  let result = '';
   //l'endpoint 'http://localhost:8080/api/cards' restituisce i dati contenuti nella tabella progetto
  $.get('http://localhost:8080/api/cards', function(response) {
      cards = response;
      for (card of response) {
          result += createCard(card);
      }
      $('.galleria').html(result);
  });

  if (!isNaN(cardId)) {
    $.get('http://localhost:8080/api/cards/' + cardId, function(response) {
      result = createAnteprima(response, cardId);
      $('.anteprima').html(result);
    });
  }
  

  $('.go-back-preview').attr('href', url.replace(url.slice(url.lastIndexOf('/') + 1), 'preview.html?'+ cardId));


  $(document).on('click', function(event) {

    if ($(event.target).parents('.galleria-card').length > 0) {
      window.location.replace('preview.html?'+$(event.target).parents('.galleria-card').data("id"), 'search.html/');
    }
  
    if ($(event.target).hasClass('categoria')) {
      let categoria = $(event.target).html();
      $('.categoria').css('color', '#A172FF');
      $(event.target).css('color', '#38B6FF');
      result = '';
      $.get('http://localhost:8080/api/cards', function(response) {
      cards = response;
      for (card of response) {
        if (card.categoria == categoria)
          result += createCard(card);
      }
      $('.galleria').html(result);
      $('.categoria-nome').html(categoria);
      });
    }
  });

    //PARTE DI SPRING SECURITY

    let JWTHeader = {
      Authorization: 'Bearer ' + $.cookie('jwt')
    };

    let baseURL = 'http://localhost:8080'; // modifica la parte precedente del codice per utilizzare questo ingegnoso stratagemma

    //form login
    $("#loginBtn").click(function (event) {
      event.preventDefault();
      let email = $('#email').val();
      let password = $('#password').val();
      let params = {
          email: email,
          password: password
      };
      let jsonParams = JSON.stringify(params);
      $.ajax({
          url: `${baseURL}/api/auth/login`,
          contentType: 'application/json;charset=UTF-8',
          type: "POST",
          data: jsonParams,
          success: function (response) {
              //console.log('response = ' + JSON.stringify(response));
              let token = response.accessToken;
              console.log("token ricevuto = " + token);
              $.cookie('jwt', token);
              JWTHeader = updateHeader();
              extractPayload(token);
              //verifica
              console.log('verifica = ' + $.cookie('jwt'));
              console.log('JWTHeader = ' + JSON.stringify(JWTHeader));
          },
          error: function () {
              alert('login errato');
          }
      });
  });

  // Logout
  $('#logoutBtn').click(function () {
    $.cookie('jwt', '');
    JWTHeader = updateHeader();
  });

});



function createCard(card) {
  return `<div class="col">
  <div class="card h-100 w-100 galleria-card" data-id="${card.id}">
    <img src="${card.img}" class="card-img-top h-50" alt="...">
    <div class="card-body h-50">
      <h5 class="card-title">\${card.titolo}}</h5>
      <p class="card-text w-100 h-45 line-clamp">${card.descrizione}</p>
      <div class="card" style="border-color:#38B6FF; " >
        <div class="card-body text-center">
          <b>€ \${card.soldiRaccolti}</b>  a fronte di € \${card.soldiObiettivo}
        </div>
      </div>
  
  </div>
</div>
</div>`

}

function createAnteprima(card, cardId) {
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
            <button class="btn btn-lg" id="btn" type="button" onclick="window.location.replace('${'project.html?'+cardId}', 'preview.html')">Collabora</button>
          </div>
        
</div> 
</div>`;
}

function ricercaProgetto(form) {
  let url = window.location.href;
  window.location.replace(url.replace('index.html', 'search.html?'+ form.search.value));
  return false;
}

function updateHeader() {
  return {
      Authorization: 'Bearer ' + $.cookie('jwt')
  };
}

function extractPayload(token) {
  let array = token.split('.');
  let payload = array[1];
  let jsonPayload = atob(payload);
  console.log("jsonPayload = " + jsonPayload);
  //estrazione dei dati dal payload
  let objPayload = JSON.parse(jsonPayload);
  let userEmail = objPayload.sub;
  let dataExp = objPayload.exp;
  console.log("user email = " + userEmail + ", data expiration = " + dataExp);
 
}