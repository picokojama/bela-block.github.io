$(function() {

    // DOM ELEMENTI
    vrijednost1 = $('#bodovi1');
    vrijednost2 = $('#bodovi2');

    // VARIJALE ZA PRACENJE
    broj = 0; // broj odigranih partija
    ukupnotim1 = 0;
    ukupnotim2 = 0;
    // ako je pohranjeno u localstorageu, povuci odatle
    if(localStorage.tim1) ukupnotim1 = Number(localStorage.tim1);
    if(localStorage.tim2) ukupnotim2 = Number(localStorage.tim2);

    // FUNKCIJA ZA ISPIS REZULTATA
    function ispisiRezultat(tim1, tim2) {
        tim1 = Number(tim1);
        tim2 = Number(tim2);
        rezultat = $('.rezultat');
        rezultat.find('.tim1').text(tim1);
        rezultat.find('.tim2').text(tim2);
        if(tim1 >= tim2) {
            rezultat.find('mark').text(tim1 - tim2);
        } else {
            rezultat.find('mark').text(tim2 - tim1);
        }
    }

    // POCETNI SETUP
    ispisiRezultat(ukupnotim1, ukupnotim2);

    // AUTOMATSKI IZRAČUN BODOVA
    handler = function() {
        $this = $(this);
        if($this[0] == vrijednost1[0]) {
            $drugi = vrijednost2;
        }
        if($this[0] == vrijednost2[0]) {
            $drugi = vrijednost1;
        }
        value = 181 - $this.val();
        $drugi.val(value);
    };

    vrijednost1.on('keyup', handler);
    vrijednost2.on('keyup', handler);

    // DODAVANJE PARTIJE
    $('.igra form').on('submit', function(e) {
        e.preventDefault();

        // dobi bodove obaju timova
        tim1 = Number(vrijednost1.val());
        tim2 = Number(vrijednost2.val());
        zvanje = Number($('#zvanje').val());
        tim = $('#tim').val();
        if(tim == 1) {
            tim1 += zvanje;
        }
        if(tim == 2) {
            tim2 += zvanje;
        }
        broj ++;

        // dodaj red u tablicu
        html = '<tr class="igra">';
        html += '<td>' + broj + '</td>';
        html += '<td>' + tim1 + '</td>';
        html += '<td>' + tim2 + '</td>';
        html += '<td><button class="btn btn-sm btn-danger obrisi" style="margin-right: 5px;">Obriši</button><button class="uredi btn btn-sm btn-warning">Uredi</button></td>';
        html += '</tr>';
        $(html).insertAfter('tr.table-heading');

        // izmjeni ukupan rezultat
        ukupnotim1 += tim1;
        ukupnotim2 += tim2;
        localStorage.tim1 = ukupnotim1;
        localStorage.tim2 = ukupnotim2;
        ispisiRezultat(ukupnotim1, ukupnotim2);
    });

    // NOVA IGRA
    $('.nova-igra').on('click', function() {
        localStorage.tim1 = 0;
        localStorage.tim2 = 0;
        ukupnotim1 = 0;
        ukupnotim2 = 0;
        $('tr.igra').remove();
        ispisiRezultat(0, 0);
    });
});