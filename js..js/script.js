
/* 
  ---- GUIDA ALL'UTILIZZO DELLE FUNZIONI DI QUESTO SCRIPT ----
  
  GET TABLE
    *
    * Dalla riga 49 alla riga 129 puoi trovare le variabili contenenti tutti i dati di tutte le singole tabelle del database
    *
    * Se per esempio vuoi utilizzare la variabile progetti che contiene tutti i progetti usa la seguente sintassi
    *
    * progetti.then(function(response) {
    *   //INSERISCI QUI IL TUO CODICE
    * });
    * 
    * IMPORTANTE: RICORDA CHE 'response' CONTIENE L'ARRAY DI OGGETTI JAVASCRIPT CON CUI DOVRAI LAVORARE
    *
  GET ID
    * 
    * Nella sezione finale del codice puoi trovare le funzioni da richiamare per ottenere l'elemento della tabella scelta con l'id richiesto
    * 
    * per utilizzarle usa la seguente sintassi
    * 
    * (async function() {
    *   let cartella = await getCartellaById(idCartella);
    * }) ();
    * 
    * IMPORTANTE: la parola chiave 'await' è necessaria per assegnare a cartella la risposta del server
    * 
  GESTIONE CLICK SU ELEMENTO GENERATO DINAMICAMENTE
    * 
    * Inserisci il tuo blocco codice direttamente nella sezione che riporta il tuo nome dalla riga 171 in poi
    * 
    * event contiene al suo interno l'elemento della pagina che è stato cliccato, tramite un if assicurati che il tuo
    * codice venga eseguito nel momento in cui l'elemento cliccato corrisponde con l'elemento cui il blocco di codice fa riferimento
    * 
    * $(event.target) elemento cliccato
    * 
  */

$(document).ready(function () {

  //VARIABILI UTILI AL CARICAMENTO DELLA PAGINA

  let url = window.location.href;
  const queryParams = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  let JWTHeader = {
    Authorization: 'Bearer ' + $.cookie('jwt')
  };

  //toggle
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
          return new bootstrap.Popover(popoverTriggerEl)
        })
  //INIZIALIZZAZIONE ARRAY CONTENENTI TUTTI GLI ELEMENTI DI TUTTE LE TABELLE DEL DATABASE IN ORDINE CRONOLOGICO

  //CONSIDERA LA POSSIBILITà DI INIZIALIZZARE LE VARIABILI AL MOMENTO DEL BISOGNO

  let cartelle = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/cartelle', function (response) {
      resolve(response);
    });
  });

  let categorie = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/categorie', function (response) {
      resolve(response);
    });
  });

  let commenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/commenti', function (response) {
      resolve(response);
    });
  });

  let documenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/documenti', function (response) {
      resolve(response);
    });
  });

  let documentiModificati = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/docmod', function (response) {
      resolve(response);
    });
  });

  let donazioni = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/donazioni', function (response) {
      resolve(response);
    });
  });

  let iscrittiNewsletter = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/iscrittiNewsletter', function (response) {
      resolve(response);
    });
  });

  let partecipazioniProgetti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/partecipazioni', function (response) {
      resolve(response);
    });
  });

  let progetti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/progetti', function (response) {
      resolve(response);
    });
  });

  let proposte = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/proposte', function (response) {
      resolve(response);
    });
  });

  let socialLinks = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/social', function (response) {
      resolve(response);
    });
  });

  let utenti = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/utenti', function (response) {
      resolve(response);
    });
  });

  let versioniProposte = new Promise((resolve, reject) => {
    $.get('http://localhost:8080/versioni', function (response) {
      resolve(response);
    });
  });

  //NavBar utente loggato
  (async function () {
    if (checkLoggedUser()) {
          let utente = await getUtenteByEmail(checkLoggedUser());
          $('#navbar').html(`    <div class="container-fluid">
          <a class="navbar-brand" href="index.html"><img src="img/logonav.png"></a>     
          <ul class="nav justify-content-end fs-2">
            <li class="nav-item ">
              <a class="nav-link  " aria-current="page"style="color: #DCF5FF" href="search.html">Idee</a>
            </li>
            <li class="nav-item">
              <a class="nav-link  " style="color:#DCF5FF" aria-current="page" href="guida.html">Guida</a>
            </li>
            <li class="nav-item  ">
              <div class="btn-group dropstart ">
              <a class="btn dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color:#DCF5FF" href="#"><i class="bi bi-person-workspace"></i></a>
              <ul class="dropdown-menu ">

                <li><a class="dropdown-item" href="profilocopy.html?idUtente=${utente.idUtente}">Profilo</a></li>
                <li><a class="dropdown-item" href="user.html">Impostazioni</a></li>
                <li><a class="dropdown-item" href="#" id="logoutBtn">Esci</a></li>
              </ul>
            </div>
            </li>
          </ul>
        </div>`);
        } else {
          //Sloggare l'utente
          $.cookie('jwt', '');
          updateHeader();
        }
      })();



  //Generazione galleria progetti in search.html

  progetti.then((response) => {
    let htmlString = '';
    if (queryParams.search != undefined) { //se è stata effettuata una ricerca
      for (card of response) {
        //console.log(card);
        if (card.titolo.toLowerCase().includes(queryParams.search.toLowerCase())) {
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

  //Generazione anteprima in preview.html

  
   /* progetti.then((response) => {
      let progetto;
      for (progetto of response) {
        if (progetto.idProgetti == queryParams.idProgetto) {
       //  $('.anteprima').html(createAnteprima(progetto, 'idProgetto=' + queryParams.idProgetto));

        }
      }
    });*/


  (async function () {
    if (queryParams.idProgetto != undefined) {
    let progetto = await getProgettoById(queryParams.idProgetto);
    $('#preview-titolo').html(progetto.titolo);
    $('#preview-img').attr('src', progetto.img)
    $('#preview-info').html(progetto.info);
   // $('#preview-btn').attr('data-id', progetto.idProgetti);
    //$('#preview-btn').attr('href', url.replace(url.slice(url.lastIndexOf('/') + 1), 'preview.html?idProgetto=' + queryParams.idProgetto));
    //francesca
    }
    })();

    $('#preview-btn').click(function(){ 
      window.open (window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + "project.html?idProgetto="+ queryParams.idProgetto, "_self");
    });

  //Pulsante per tornare indietro in project.html

  $('.go-back-preview').attr('href', url.replace(url.slice(url.lastIndexOf('/') + 1), 'preview.html?idProgetto=' + queryParams.idProgetto));


  //Gestione eventi di click sulla pagina

  $(document).on('click', function (event) {

    //Selezione card in search.html

    if ($(event.target).parents('.galleria-card').length > 0) {
      window.location.replace('preview.html?' + $(event.target).parents('.galleria-card').data("id"), 'search.html/');
    }

    //Selezione Categoria in search.html

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

    //ANDREA SABIA

    if($(event.target).hasClass('documento')) {

      (async function() {
        let documento = await getDocumentoById(event.target.id.slice(event.target.id.indexOf('-') + 1));
        $('.titolo-documento').html(documento.nome);
        $('.corpo-documento').html(documento.testo);
      })();
      
    }

    //PASQUALE PANICO



    //CRISTIAN FIERRO
   

    if ($(event.target).parents('.vai-al-profilo').length > 0) {
      window.open('profilocopy.html?idUtente='+$(event.target).parents('.vai-al-profilo').data('utente'), '_self');
    }

 //CRISTIAN FIERRO

    if ($(event.target).hasClass('aggiungi-documento')) {

      (async function () {
        //scrivere funzione
        $('#modalProposta').modal("toggle");
      })();

    }

    //DOMENICO PETITO



    //ANTONIO PASCARELLA



    //FRANCESCA BARONISSI

    
     // $('#logoutBtn').click(function () {
      if ($(event.target).attr('id') == 'logoutBtn') {
    
        

      $.cookie('jwt', '');
      JWTHeader = updateHeader();
      window.open (window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/"+"index.html", "_self");
    };


  });

  //PARTE DI SPRING SECURITY



  //form login francesca
  let baseURL = 'http://localhost:8080';
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
        window.open (window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/"+"index.html", "_self");

    
       
        
      },
      error: function () {
        alert('login errato');
      }
    });
  });




  //signup francesca
  
  $('#signupBtn').click(function(event) {
    event.preventDefault();
    let nome = $("#signupNome").val();
    let cognome = $("#signupCognome").val();
  
    let email = $('#signupEmail').val();
    let password = $('#signupPwd1').val();
    let params = {
      email: email,
      password: password,
      nome: nome, 
      cognome: cognome, 
    };
  
  
    //validation
    var uppercasePassword = /(?=.*?[A-Z])/;
    var lowercasePassword = /(?=.*?[a-z])/;
    var digitPassword = /(?=.*?[0-9])/;
    var spacesPassword = /^$|\s+/;
    var symbolPassword = /(?=.*?[#?!@$%^&*-])/;
    let password2 = $('#signupPwd2').val();
    var pass1= $('#signupPwd1');
    var validName = /^[a-zA-Z ]*$/;
    var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var errore ='';
  
    if (password != password2) {
      errore+='Le password inserite non coincidono \n'
      $('#signupPwd2').addClass('invalid-input');
    } if (uppercasePassword.test(password)==false) {
      errore+='Non sono presenti caratteri in maiuscolo e/o minuscolo\n'
      pass1.addClass('invalid-input');
  
    } if (digitPassword.test(password)== false) {
      errore+= 'La password deve contenere almeno 9 caratteri \n'
      pass1.addClass('invalid-input');
    } if ( symbolPassword.test(password)== false) {
      errore+= 'La password deve contenere almeno un simbolo\n'
      pass1.addClass('invalid-input'); 
    } if (nome.length <= 0 ) {
      errore+= 'Inserire il nome\n';
      $('#signupNome').addClass('invalid-input'); 
    } if (validName.test(nome)==false ) {
      errore+= 'inserire un nome valido \n'
      $('#signupNome').addClass('invalid-input');
    } if (cognome.length <= 0 ) {
      errore+= 'Inserire il cognome\n';
      $('#signupCognome').addClass('invalid-input'); 
    } if (validName.test(cognome)==false ) {
      errore+= 'inserire un cognome valido \n'
      $('#signupCognome').addClass('invalid-input');
    }if (email <=0) {
      errore+= 'Inserire un e-mail\n'
      $('#signupEmail').addClass('invalid-input');
    }
      if (validEmail.test(email)== false){
        errore+= 'Inserire un e-mail valida\n'
        $('#signupEmail').addClass('invalid-input');
      } if (document.getElementById("terminiCondizioni").checked ==false) {
        errore+= 'Accettare termini e condizioni';
      }
  

    if (password === password2  && uppercasePassword.test(password)==true && 
    lowercasePassword.test(password)==true && digitPassword.test(password)==true && !(spacesPassword.test(password)==true) &&
    symbolPassword.test(password)==true && nome.length > 0 && validName.test(nome) == true && cognome.length > 0 && validName.test(cognome)== true &&
    validEmail.test(email) == true && document.getElementById("terminiCondizioni").checked==true ){


  let jsonParams = JSON.stringify(params);
    $.ajax({
      url: `${baseURL}/api/auth/signup`,
      contentType: 'application/json;charset=UTF-8',
      type: "POST",
      data: jsonParams,

      success: function (response) {
        
        
        alert("La registrazione è andata a buon fine");
        window.open(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/"+"index.html", "_self");

          
        
        let token = response.accessToken;
        console.log("token ricevuto = " + token);
        $.cookie('jwt', token);
        JWTHeader = updateHeader();
        extractPayload(token);

        console.log('verifica = ' + $.cookie('jwt'));
        console.log('JWTHeader = ' + JSON.stringify(JWTHeader));

      
    
      },

      
      error: function () {
        alert('registrazione fallita');

        
      }
    })

  } else { alert (errore)}



});



//francesca post FUNZIONA


//creazione progetto 
$("#submitForm").click(function(event){
  event.preventDefault();
  let titolo = $('#titoloCreazione').val();
  let img =$("#formImg").val().replace("C:\\fakepath", "img");
  let info=$("#formDescrizione").val();
  let cifraGoal=$("#formGoal").val();
  let idCategorie= $("#formCategorie").val();
  let params = {
   titolo:titolo,
   img: img,
   info: info,
   cifraGoal: cifraGoal,
   idCategorie: idCategorie

  };

  let jsonParams = JSON.stringify(params);
    $.ajax({
      url: `${baseURL}/progetti/save`,
      contentType: 'application/json;',
      type: "POST",
      data: jsonParams,
      success: async function (response) {
        let utente = await getUtenteByEmail(checkLoggedUser());
        let idProgetto = response.idProgetti;
        let partecipazione = {
            ruolo : 'proprietario',
            punteggio : 0,
            idUtente : utente.idUtente,
            idProgetto : idProgetto

        };
        let jsonPartecipazione = JSON.stringify(partecipazione);
        $.ajax({
          url:` ${baseURL}/partecipazioni/save`,
          contentType: 'application/json;',
          type: "POST",
          data: jsonPartecipazione,
          success: function (response) {


            alert("il tuo progetto è stato creato correttamente ");
          },
          error: function () {
            alert('ti ho trovato')
            $.ajax({
              url: `${baseURL}/progetti/delete/${idProgetto}`,
              type: 'DELETE',
              success: function(result) {
                alert('errore');
              }
          });

          }
        });
      },
      error: function () {
        alert('errore');
      }
    });


  });

  

    //update del profilo 
    

    

      $("#assurdoBtn").click(async function(event){
        event.preventDefault();
        let utente = await getUtenteByEmail(checkLoggedUser());
        let nome= $("#nomeCreazione").val();
        let cognome = $("#cognomeCreazione").val();
        let email = $('#emailCreazione').val();
        let immagineProfilo =$("#picCreazione").val().replace("C:\\fakepath", "img");
        let bio = $("#bioCreazione").val();
        let params = {
          nome:nome,
          cognome: cognome,
          email:email,
          immagineProfilo:immagineProfilo,
          bio:bio,
          password: utente.password
          
        }; 
    
        let jsonParams = JSON.stringify(params);
        $.ajax({
          url: `${baseURL}/utenti/update/`+ utente.idUtente,
          contentType: 'application/json;',
          type: "PUT",
          data: jsonParams,
          success: function (response) {
      
            
            alert("il tuo profilo è stato aggiornato correttamente ")
          },
          error: function () {
            alert('errore');
          }
        });
    
    
    
    
        });
      


    





  //ANDREA SABIA

  (async function createTreeData () {
    if (queryParams.idProgetto != undefined && window.location.pathname == '/project.html') {
      let parentFolder = await getCartellaById(queryParams.idProgetto, 'Generale');
      parentFolder = initializeFolder(parentFolder);
      documenti.then(function(response) {
        let documento;
        for (documento of response) {
          if (documento.cartella.cartelleId.idProgetto == queryParams.idProgetto) {
            parentFolder = addDocument(parentFolder, documento);
          }
        }

        let treeData = treeNodes([], parentFolder.sottoCartella, parentFolder.documenti);
        treeData.push({text: 'Aggiungi un Documento', icon:'fa-solid fa-plus', class:'aggiungi-documento'});
        $('#tree').bstreeview({
        data: treeData
        });
      });
    }
    
    
  })();
  function initializeFolder (folder) {
    folder.documenti = [];
    let cartella;
    let count = 0;
    for(cartella of folder.sottoCartella) {
      folder.sottoCartella[count++] = initializeFolder(cartella);
    }
    folder.sottoCartella.sort((a,b) => (a.cartelleId.nomeSottoCartella > b.cartelleId.nomeSottoCartella) ? 1 : ((b.cartelleId.nomeSottoCartella > a.cartelleId.nomeSottoCartella) ? -1 : 0));
    return folder;
  }

  function addDocument(parentFolder, documento) { //Si potrebbe ottimizzare
    if (parentFolder.cartelleId.nomeSottoCartella != documento.cartella.cartelleId.nomeSottoCartella) {
      let cartella;
      let count = 0;
      for (cartella of parentFolder.sottoCartella) {
        parentFolder.sottoCartella[count++] = addDocument(cartella, documento);
      }
    } else {
      parentFolder.documenti.push(documento);
    }
    return parentFolder;
  }
  
  function treeNodes (treeNode, cartelle, documenti) {
    let cartella;
    let count = 0;
    for (cartella of cartelle) {
      treeNode.push({text: cartella.cartelleId.nomeSottoCartella, icon:'fa fa-folder'});
      if (cartella.sottoCartella.length != 0 || cartella.documenti.length != 0) {
        treeNode[count++].nodes = treeNodes([], cartella.sottoCartella, cartella.documenti);
      } else {
        treeNode[count++].nodes = [{text: 'Aggiungi un Documento', icon:'fa-solid fa-plus', class:'aggiungi-documento'}];
      }
    }
    let documento;
    for (documento of documenti) {
      treeNode.push({id: 'documento-' + documento.id, text: documento.nome, icon:'fa-solid fa-file', class:'documento'});
    }
    treeNode.push({text: 'Aggiungi un Documento', icon:'fa-solid fa-plus', class:'aggiungi-documento'});
    console.log(cartelle.length == 0);
    if (cartelle.length == 0) {
      
    }
    return treeNode;
  }

  //PASQUALE PANICO

    
  
  $.get('http://localhost:8080/donazioni', function (response) {
    let donazione;
    let htmlDaAggiungere = '';
    let htmlTutto= '';
    let i=0;
    //sort response su data
    //ciclo 3 volte
    response.sort((a,b) => (a.orarioPubblicazione > b.orarioPubblicazione) ? -1 : ((b.orarioPubblicazione > a.orarioPubblicazione) ? 1 : 0));
    for (donazione of response) {
      i++
      if(queryParams.idProgetto == donazione.progetto.idProgetti){
        if(i<=3)
          htmlDaAggiungere += createListaDonazioni(donazione);
       
          htmlTutto+=createListaDonazioni(donazione);
      }
      
    }
    
    htmlDaAggiungere+= ` <div class="card" style="border-color:#38B6FF " > 
    <button class=" btn " data-bs-toggle="modal" data-bs-target="#mostraTutto" href="#" style="border-width: 1px; background-color: white !important; color: black;">
     Mostra tutti 
    </button>
  </div>
  <form class="modal form-progetto" tabindex="-1" id="mostraTutto">
    <div class="modal-dialog"style="overflow-y: initial;  " >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Donazioni</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
       
        <div class="modal-body" style="overflow-y: auto;  height: 80vh;" id="donazioni-tutto">
         
        </div>
        
      </div>
    </div>
  </div>
  </form>`
    $('#donazioni').html(htmlDaAggiungere);
    $('#donazioni-tutto').html(htmlTutto);
  });

  function createListaDonazioni(donazione) {
    return `
    <div class="card  d-flex   " style="border: none; ">
    <div class="card-text " >
      
      <div class="row  " >
        <div class="col-4">
          <div class="card" style="border: none">
            <img src=  "${donazione.utente == null ?" https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png" : donazione.utente.immagineProfilo}" alt="avatar"
              class="rounded-circle h-100 w-100 mb-4 mt-4" >
            </div></div>
            <div class="col-8">
              <div class="card-body">
                <p class="card-title mb-4 mt-4">${donazione.utente == null ?"Anonima" : donazione.utente.nome  }
                ha donato <b>€${donazione.importo} </b></p>
              </div>
     
    </div>
  </div>
    `
  }

  //CRISTIAN FIERRO

//AL POSTO DI '1' Inserirai il l'id dell'utente loggato
(async function() {
      let utente = await getUtenteByEmail(checkLoggedUser());
      utente.idUtente;



    $('#foto').attr("src", utente.immagineProfilo);
    $('#nomeUtenteProfilo').html(utente.nome);
    $('#emailUtenteProfilo').html(utente.email);
    $('#cognomeUtenteProfilo').html(utente.cognome);
    $('#bioProfiloUtente').html(utente.bio);



}) ();




(function () {
  partecipazioniProgetti.then(async function(response) {
    let emailDaVerificare = checkLoggedUser();
    let emailUtente;
    let partecipazioni;
    let htmlDaAggiungereAProprietario = '';
    let htmlDaAggiungereACollaboratore = '';
    let progetti;

    for(partecipazioni of response) { 
      emailUtente = partecipazioni.utente.email; 
     
      let num = partecipazioni.progetto.idProgetti;
      progetti = await getProgettoById(num);
      let ruolo = partecipazioni.ruolo;
          if (ruolo === 'proprietario' && emailUtente == emailDaVerificare) {
           

            htmlDaAggiungereAProprietario += createCardUser(progetti);
          } else if (ruolo === 'collaboratore' && emailUtente == emailDaVerificare) {
          
            htmlDaAggiungereACollaboratore += createCardUser(progetti);
          }
          
    }
    $('#mieiProgetti').html(htmlDaAggiungereAProprietario);
          $('#visualizzaProgetti').html(htmlDaAggiungereACollaboratore);
  });
})();
( function () {
  partecipazioniProgetti.then(async function(response) {
    if (queryParams.idUtente != undefined) {
      let utente = await getUtenteById(queryParams.idUtente);
    let emailDaVerificare = utente.email;
    let partecipazioni;
    let htmlDaAggiungereAProprietario = '';
    let htmlDaAggiungereACollaboratore = '';
    let progetti;

    for(partecipazioni of response) { 
      let emailUtente = partecipazioni.utente.email;    
      let num = partecipazioni.progetto.idProgetti;
      let ruolo = partecipazioni.ruolo;
      $.get('http://localhost:8080/progetti/' + num, function(response) {
        progetti = response;
          if (ruolo === 'proprietario' && emailUtente === emailDaVerificare) {
            htmlDaAggiungereAProprietario += createCardUser(progetti);
          } else if (ruolo === 'collaboratore' && emailUtente === emailDaVerificare) {
            htmlDaAggiungereACollaboratore += createCardUser(progetti);
          }
          $('#profiloProgetti').html(htmlDaAggiungereAProprietario);
          $('#profiloCollab').html(htmlDaAggiungereACollaboratore);
        })  
    }
    }
    
  });
})();



$.get('http://localhost:8080/partecipazioni', function (response) {
  //let utente = response;
  let utente;
  let html = "";
  response.sort((a,b) => (a.utente.nome > b.utente.nome) ? 1 : ((b.utente.nome > a.utente.nome) ? -1 : 0));
    for(utente of response){
      if (utente.ruolo == 'collaboratore') {
        html+=`
      <tbody >
          <tr class="gino mt-3">
              <td class="pt-2"> <img class="fotolistacollaboratori" id="foto" src="${utente.utente.immagineProfilo}" alt="">
                  <div class="pl-lg-5 pl-md-3 pl-1 name"></div>
              </td>
              <td id="nomeUtenteProfilo" class="pt-3">${utente.utente.nome}</td>
              <td class="pt-3"><div class="btn">Vai al profilo</div></td>
          </tr>
          <tr id="spacing-row">
              <td></td>
          </tr>
      </tbody>
      `
      }

      
  }
  $('#listaColl').html(html);
});

//Salvataggio proposta 

(async function() {
  let utente = await getUtenteByEmail(checkLoggedUser());
  utente.idUtente;
  $('#salvaProposta').click(function () {
    testoProposta = tinymce.get("testoProposta").getContent()
    motivazione = $('#insMotiv').val();
    let params = {
      idUtente: utente.idUtente,
      testoModificato: testoProposta,
      motivazione: motivazione,
      dataPubblicazione: new Date().getTime()
    }
    let jsonParams = JSON.stringify(params);
    console.log('params string = ' + jsonParams);
    $.ajax({
      url: 'http://localhost:8080/proposte/save',
      contentType: 'application/json;charset=UTF-8',
      type: "POST",
      data: jsonParams,
      success: async function (response) {
        let idProposta = response.idProposte;
        let utente = await getUtenteByEmail(checkLoggedUser());
        partecipazioniProgetti.then(function (response) {
          let registrato = false;
          for (partecipazione of response) {
            if (utente.idUtente == partecipazione.utente.idUtente) {
              registrato = true;
            }
          }
          console.log("registrato =" + registrato);
          if (!registrato) {
            console.log(utente.idUtente);
            console.log(queryParams.idProgetti);
        let partecipazione = {
            ruolo : 'collaboratore',
            punteggio : 0,
            idUtente : utente.idUtente,
            idProgetto : queryParams.idProgetto

        };
        let jsonPartecipazione = JSON.stringify(partecipazione);
        $.ajax({
          url:` ${baseURL}/partecipazioni/save`,
          contentType: 'application/json;',
          type: "POST",
          data: jsonPartecipazione,
          success: function (response) {


            alert('proposta inserita');
            location.reload(true);
          },
          error: function (response) {
            console.log('parametri inviati' + JSON.stringify(response));
            $.ajax({
              url: `${baseURL}/proposte/delete/${idProposta}`,
              type: 'DELETE',
              success: function(result) {
                alert('errore');
              }
          });
          
          }
        });
          } else {
            alert('proposta inserita');
            location.reload(true);
          }
        });
      }
  });
});
}) ();

/*$('#salvaProposta').click(function () {
  testoProposta = tinymce.get("testoProposta").getContent()
  motivazione = $('#insMotiv').val();
  let params = {
    testoModificato: testoProposta,
    motivazione: motivazione
  }
  let jsonParams = JSON.stringify(params);
  console.log('params string = ' + jsonParams);
  $.ajax({
    url: 'http://localhost:8080/proposte/save',
    contentType: 'application/json;charset=UTF-8',
    type: "POST",
    data: jsonParams,
    success: function (response) {
      console.log('response dopo create =' + JSON.stringify(response));
      alert('proposta inserita');
      //ricarica la pagina
      location.reload(true);
    }
  });
});*/

//accordion lista proposte
let i = 0;
let proposteList = [];
$.get('http://localhost:8080/proposte', function (response) {
  let accordion = '<div class="accordion" id="accordion">';
  for (proposte of response) {
    i++;
    accordion +=
      '<div class="accordion-item mt-3">' + '<h2 class="accordion-header" id="heading' + i + '">' +
      '<button style="background-color: #DCF5FF !important;"class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapseOne">' +
      '<strong>Proposta di ' + proposte.utente.nome + '</strong>' + '</button>' + '</h2>' +
      '<div id="collapse' + i + '" class="accordion-collapse collapse" aria-labelledby="heading' + i + '">' +
      '<div class="accordion-body">' +
      '<div class="row">' +
      '<div class="col">' +
      '<p>' + '<h5>Proposta pubblicata il:</h5> ' +'<div>'+ proposte.dataPubblicazione +'</div>'+'</p>' +
      '<p>' + '<h5>Motivazione:</h5> ' +'<div>'+ proposte.motivazione + '</div>'+'</p>' +
      '<p>' + '<h5>Proposta:</h5> ' +'<div>'+ proposte.testoModificato + '</div>'+'</p>' +
      '</div>' + '</div>' + '</div>' + '</div>';
    proposteList[i] = {
      motivazione: proposte.motivazione
    }
  }
  $("#listaProposte").append(accordion);
});
  //DOMENICO PETITO
  










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


function createCard(card) {
  return `<div class="col">
  <div class="card h-100 w-100 galleria-card" data-id="${'idProgetto=' + card.idProgetti}">
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

function createCardUser(card) {
  return `<div class="col-lg-4 pt-3">
  <div class="card h-100 w-100 galleria-card" data-id="${'idProgetto=' + card.idProgetti}">
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

function createAnteprima(progetto, query) {
  return `<div class="row">
<div class="col-lg-8">
<h1 class="card-title">${progetto.titolo}</h1>
<img src="${progetto.img}" style="width:100%" >
<p class="display-6">${progetto.info}</p>
    </div>
    <div class="col-lg-4 pt-5">
        <div class="d-grid gap-3 col-10 mx-auto">

          
         
            <button class="btn btn-lg " type="button">Condividi</button>
            <button class="btn btn-lg" id="btn" type="button" onclick="window.location.replace('${'project.html?' + query}', 'preview.html')">Collabora</button>
            <button class="btn btn-lg " type="button" style="background-color:rgb(255, 194, 14) !important;">Dona</button>
            <div class="card" style="border-color:rgb(255, 194, 14); " > 
            <div class="card-body text-center">
              <b>€  ${progetto.cifraRaccolta}</b> raccolti a fronte di € ${progetto.cifraGoal}
            </div>
          </div>
          </div>
        
</div> 
</div>
<div class="container-fluid" id="donazioni">
</div>


`;
}

function ricercaProgetto(form) {
  let url = window.location.href;
  window.location.replace(url.replace('index.html', 'search.html?' + form.search.value));
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
  //$.cookie('dataExp', objPayload.exp);
  let dataExp = objPayload.exp;
  //console.log("user email = " + userEmail + ", data expiration = " + dataExp);
  //return {userEmail:}
}

//TUTTI I GETID PER RECUPERARE L'ELEMENTO DEL DATABASE

async function getCartellaById(id, nome) {
  let cartella;
  await $.get('http://localhost:8080/cartelle/' + id +'_' + nome, function (response) {
    cartella = response;
  });
  return cartella;
}

async function getCategoriaById(id) {
  let categoria;
  await $.get('http://localhost:8080/categorie/' + id, function (response) {
    categoria = response;
  });
  return categoria;
}

async function getCommentoById(id) {
  let commento;
  await $.get('http://localhost:8080/commenti/' + id, function (response) {
    commento = response;
  });
  return commento;
}

async function getDocumentoById(id) {
  let documento;
  await $.get('http://localhost:8080/documenti/' + id, function (response) {
    documento = response;
  });
  return documento;
}

async function getDocumentoModificatoById(id) {
  let documento;
  await $.get('http://localhost:8080/docmod/' + id, function (response) {
    documento = response;
  });
  return documento;
}


async function getDonazioneById(id) {
  let donazione;
  await $.get('http://localhost:8080/donazioni/' + id, function (response) {
    donazione = response;
  });
  return donazione;
}

async function getIscrittoNewsletterById(id) {
  let iscrittoNewsletter;
  await $.get('http://localhost:8080/iscrittiNewsletter/' + id, function (response) {
    iscrittoNewsletter = response;
  });
  return iscrittoNewsletter;
}

async function getPartecipazioneById(id) {
  let partecipazione;
  await $.get('http://localhost:8080/partecipazioni/' + id, function (response) {
    partecipazione = response;
  });
  return partecipazione;
}

async function getProgettoById(id) {
  let progetto;
  await $.get('http://localhost:8080/progetti/' + id, function (response) {
    progetto = response;
  });
  return progetto;
}

async function getPropostaById(id) {
  let proposta;
  await $.get('http://localhost:8080/proposte/' + id, function (response) {
    proposta = response;
  });
  return proposta;
}

async function getSocialById(id, nome) {
  let social;
  await $.get('http://localhost:8080/social/' + id + '_' + nome, function (response) {
    social = response;
  });
  return social;
}

async function getUtenteById(id) {
  let utente;
  await $.get('http://localhost:8080/utenti/' + id, function (response) {
    utente = response;
  });
  return utente;
}

async function getVersioneById(id) {
  let versione;
  await $.get('http://localhost:8080/versioni/' + id, function (response) {
    versione = response;
  });
  return versione;
}

//Get utente by email

async function getUtenteByEmail(email) {
  let utente;
  await $.get('http://localhost:8080/utenti/email/' + email, function(response) {
    utente = response;
  });
  return utente;
}

function checkLoggedUser () {
  if ($.cookie('jwt') != undefined && $.cookie('jwt') != '') {
    array = $.cookie('jwt').split('.');
    payload = array[1];
    jsonPayload = atob(payload);
    objPayload = JSON.parse(jsonPayload);
    if (objPayload.exp*1000 > new Date().getTime()) {
      //token valido, l'utente può proseguire la navigazione
      if (objPayload.sub == '') {
        alert('email vuota');
        return false;
      } else {
        return objPayload.sub; //restituisco l'email
      }
    } else {
      //token scaduto, butta fuori l'utente eliminando l'informazione nel cookie
      return false;
    }
  } else {
    return false;
  }

  
}
