$(document).ready(function() {

  //VARIABILI UTILI AL CARICAMENTO DELLA PAGINA

  let url = window.location.href;
  let queryResult = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));

  let JWTHeader = {
    Authorization: 'Bearer ' + $.cookie('jwt')
  };

  //INIZIALIZZAZIONE ARRAY CONTENENTI TUTTI GLI ELEMENTI DI TUTTE LE TABELLE DEL DATABASE IN ORDINE CRONOLOGICO
  
    let cartelle = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/cartelle', function(response) {
      resolve(response);
    });
  });

  let categorie = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/categorie', function(response) {
      resolve(response);
    });
  });

  let commenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/commenti', function(response) {
      resolve(response);
    });
  });

  let documenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/documenti', function(response) {
      resolve(response);
    });
  });

  let documentiModificati = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/docmod', function(response) {
      resolve(response);
    });
  });

  let donazioni = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/donazioni', function(response) {
      resolve(response);
    });
  });

  let iscrittiNewsletter = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/iscrittiNewsletter', function(response) {
      resolve(response);
    });
  });

  let partecipazioniProgetti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/partecipazioni', function(response) {
      resolve(response);
    });
  });

  let progetti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/progetti', function(response) {
      resolve(response);
    });
  });

  let proposte = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/proposte', function(response) {
      resolve(response);
    });
  });

  let socialLinks = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/social', function(response) {
      resolve(response);
    });
  });

  let utenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/utenti', function(response) {
      resolve(response);
    });
  });

  let versioniProposte = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/versioni', function(response) {
      resolve(response);
    });
  });

  progetti.then((response) => {
    let htmlString = '';
    if (queryResult != url) { //se è stata effettuata una ricerca
      for (card of response) {
        //console.log(card);
        if (card.titolo.toLowerCase().includes(queryResult.toLowerCase())) {
          htmlString += createCard(card);
        }
      }
    } else {
      for (card of response) {
        htmlString += createCard(card);
      }
    }
    $('.galleria').html(htmlString);
  });

  if (!isNaN(queryResult)) {
    progetti.then((response) => {
      let progetto;
      for (progetto of response) {
        if (progetto.idProgetti == queryResult) {
          $('.anteprima').html(createAnteprima(progetto, queryResult));
        }
      }
    });
  }
  

  $('.go-back-preview').attr('href', url.replace(url.slice(url.lastIndexOf('/') + 1), 'preview.html?'+ queryResult));


  $(document).on('click', function(event) {

    if ($(event.target).parents('.galleria-card').length > 0) {
      window.location.replace('preview.html?'+$(event.target).parents('.galleria-card').data("id"), 'search.html/');
    }
  
    if ($(event.target).hasClass('categoria')) {

      let categoria = $(event.target).html();
      $('.categoria').css('color', '#A172FF');
      $(event.target).css('color', '#38B6FF');

      progetti.then((response) => {
        let htmlString = '';
        for (card of response) {
          if (card.categoria.nome == categoria)
            htmlString += createCard(card);
        }
        $('.galleria').html(htmlString);
        $('.categoria-nome').html(categoria);
      });

    }
  });

    //PARTE DI SPRING SECURITY

    // modifica la parte precedente del codice per utilizzare questo ingegnoso stratagemma

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

  //ANDREA SABIA



  //PASQUALE PANICO

  $.get('http://localhost:8080/donazioni', function(response) {
    let donazione;
    let htmlDaAggiungere = '';
    for (donazione of response) {
        htmlDaAggiungere += createListaDonazioni(donazione);
    }
    //$('#donazioni').html(htmlDaAggiungere);
  });

  function createListaDonazioni(donazione) {
    return `
    <div class="card d-flex   " style="border: none; ">
                  <div class="card-text " >
                    
                    <div class="row  " >
                      <div class="col-4">
                        <div class="card" style="border: none">
                    <img src="https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png" alt="avatar"
                      class="rounded-circle h-100 w-100 mb-4 mt-4" >
                    </div></div>
                    <div class="col-8">
                      <div class="card-body">
                        <p class="card-title mb-4 mt-4">${donazione.nome}
                        ha donato <b>€ ${donazione.importo} </b></p>
                      </div>
                   
                  </div>
                </div>
                </div>
                </div>
    `
  }

  //CRISTIAN FIERRO

  let social;
  $.get()
  $.get('http://localhost:8080/utenti/' + queryResult, function() {
    let utente = response;
    let htmlDaAggiungere = creaInfoProfilo(utente);
    $('#infoUtente').html(htmlDaAggiungere);
  });

  function creaInfoProfilo (utente) {
      return `
      <div class="row"> 
                <div class="col-sm-3">
                  <p class="mb-0">Nome</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${utente.nome}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">${utente.mail}</p>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Social</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0"><a href="#">LinkedIn</a>, <a href="#">GitHub</a></p>
                </div>
              </div>
             
            
              </div>
          

              <!--bio-->
          <div class="row rows-col-1 ">
            <div class="col-md-10 mb-4 ">
              
                  <p class="mb-4"> Biografia
                  </p>
                  <i>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis hic ea eius laborum autem qui adipisci quos. Minima, ad repellat. Voluptate voluptas dicta temporibus laborum culpa praesentium unde dignissimos aut?</i>
                 
                  
              </div>
            </div>
          </div>
      `;
  }

  //DOMENICO PETITO



  //ANTONIO PASCARELLA
  


  //FRANCESCA BARONISSI
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

  // Visualizzazione di tutti gli utenti
  $('#getUserBtn').click(function () {
      $.ajax({
          url: `${baseURL}/api/admin/users`,
          headers: JWTHeader,
          contentType: 'application/json;charset=UTF-8',
          type: "GET",
          success: function (response) {
              console.log(response);
          },
          error: function () {
              alert('accesso non autorizzato');
          } 
      });
  });

  // Logout
  $('#logoutBtn').click(function () {
      $.cookie('jwt', '');
      JWTHeader = updateHeader();
  });

}); /* end jQuery */

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



  

//});



function createCard(card) {
  return `<div class="col">
  <div class="card h-100 w-100 galleria-card" data-id="${card.id}">
    <img src="${card.img}" class="card-img-top h-50" alt="...">
    <div class="card-body h-50">
      <h5 class="card-title">${card.titolo}</h5>
      <p class="card-text w-100 h-45 line-clamp">${card.info}</p>
      <div class="card" style="border-color:#38B6FF; " >
        <div class="card-body text-center">
          <b>€ ${card.cifraRaccolta}</b>  a fronte di € ${card.cifraGoal}
        </div>
      </div>
  
  </div>
</div>
</div>`

}

function createAnteprima(progetto, queryResult) {
  return `<div class="row">
<div class="col-8">
<h1 class="card-title">${progetto.titolo}</h1>
<img src="${progetto.img}" style="width:100%" >
<p class="display-6">${progetto.info}</p>
    </div>
    <div class="col">
        <div class="d-grid gap-3 col-6 mx-auto">
            <button class="btn btn-lg " type="button" style="background-color:rgb(246, 246, 55) !important;">Dona</button>
            <p><b>€ ${progetto.cifraRaccolta}</b>  a fronte di € ${progetto.cifraGoal}</p>
            <button class="btn btn-lg " type="button">Condividi</button>
            <button class="btn btn-lg" id="btn" type="button" onclick="window.location.replace('${'project.html?'+queryResult}', 'preview.html')">Collabora</button>
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