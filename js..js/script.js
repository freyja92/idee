$(document).ready(function() {
    let cards = [];
    let result;
     //l'endpoint 'http://localhost:8080/api/cards' restituisce i dati contenuti nella tabella progetto
    $.get('http://localhost:8080/api/cards', function(response) {
        //cards = JSON.parse(response);
        for (card of cards) {
            result += createCard(card);
        }
    });

    $('.galleria').html(result);
});