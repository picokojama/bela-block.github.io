$(function() {

    bodovi1 = $('#bodovi1');
    bodovi2 = $('#bodovi2');
    zvanje1 = $('#zvanje1');
    zvanje2 = $('#zvanje2');

    Bela.init({
        vrijednost1 : bodovi1,
        vrijednost2 : bodovi2,
        zvanjet1 : zvanje1,
        zvanjet2 : zvanje2,
        ukupno1Elem : $('.rezultat .tim1'),
        ukupno2Elem : $('.rezultat .tim2'),
        razlikaElem : $('.rezultat mark'),
        inserting : function(html) {
            $(html).insertAfter('tr.table-heading');
        }
    });

    $('.bodovi').on('keyup', function() {
        Bela.izracunajDruguVrijednost(bodovi1, bodovi2, $(this));
    });

    $('.igra form').on('submit', function(e) {
        e.preventDefault();
        Bela.dodajRed(bodovi1, bodovi2, zvanje1, zvanje2);
    });

    $('.nova-igra').on('click', function() {
        Bela.novaIgra();
    });

    action = function(e) {
        if(e.target == $('button.obrisi')[0] || e.target == $('button.azuriraj')[0]){
            tipka = $(e.target);
            if(tipka.data('action') == 'obrisi') {
                Bela.makniRedOdTipke(tipka);
            } else {
                $('.azurirajtim').on('keyup', function() {
                    Bela.izracunajDruguVrijednost($('#azurirajtim1'), $('#azurirajtim2'), $(this));
                });
                $('.modal .potvrdi').on('click', function() {
                    Bela.azurirajRed(Bela.dobiRedOdTipke(tipka), $('#azurirajtim1'), $('#azurirajtim2'), $('#azurirajzvanje1'), $('#azurirajzvanje2'));
                });
            }
        }
    };

    $('body').on('click', action);
});