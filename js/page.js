$(function() {

    Bela.init();

    // DODAVANJE PARTIJE
    $('.igra form').on('submit', function(e) {
        e.preventDefault();
    });

    // NOVA IGRA
    $('.nova-igra').on('click', function() {
    });

    // BRISANJE I AZURIRANJE

    action = function(e) {
        if(e.target == $('button.obrisi')[0] || e.target == $('button.azuriraj')[0]){
            if(tipka.data('action') == 'obrisi') {
            } else {
                $('.modal .potvrdi').on('click', function() {
                });
            }
        }
    };

    $('body').on('click', action);
});