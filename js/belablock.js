$(function() {
    vrijednost1 = $('#bodovi1');
    vrijednost2 = $('#bodovi2');
    rezultat = $('.rezultat');
    broj = 0;
    ukupnotim1 = 0;
    ukupnotim2 = 0;
    if(localStorage.tim1) ukupnotim1 = Number(localStorage.tim1);
    if(localStorage.tim2) ukupnotim2 = Number(localStorage.tim2);
    rezultat.find('.tim1').text(ukupnotim1);
    rezultat.find('.tim2').text(ukupnotim2);
    if(ukupnotim1 >= ukupnotim2) {
        razlika = ukupnotim1 - ukupnotim2;
    } else {
        razlika = ukupnotim2 - ukupnotim1;
    }
    rezultat.find('td mark').text(razlika);

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

    $('.igra form').on('submit', function(e) {
        e.preventDefault();
        tim1 = Number(vrijednost1.val());
        tim2 = Number(vrijednost2.val());
        zvanje = $('#zvanje').val();
        zvanje = Number(zvanje);
        tim = $('#tim').val();
        if(tim == 1) {
            tim1 += zvanje;
        }
        if(tim == 2) {
            tim2 += zvanje;
        }
        broj ++;
        html = '<tr class="igra">';
        html += '<td>' + broj + '</td>';
        html += '<td>' + tim1 + '</td>';
        html += '<td>' + tim2 + '</td>';
        html += '<td><button class="btn btn-sm btn-danger obrisi" style="margin-right: 5px;">Obriši</button><button class="uredi btn btn-sm btn-warning">Uredi</button></td>';
        html += '</tr>';
        $(html).insertAfter('tr.table-heading');
        ukupnotim1 += tim1;
        ukupnotim2 += tim2;
        localStorage.tim1 = ukupnotim1;
        localStorage.tim2 = ukupnotim2;
        rezultat.find('.tim1').text(localStorage.tim1);
        rezultat.find('.tim2').text(localStorage.tim2);
        if(ukupnotim1 >= ukupnotim2) {
            razlika = ukupnotim1 - ukupnotim2;
        } else {
            razlika = ukupnotim2 - ukupnotim1;
        }
        rezultat.find('td mark').text(razlika);
    });

    $('.nova-igra').on('click', function() {
        localStorage.tim1 = 0;
        localStorage.tim2 = 0;
        ukupnotim1 = 0;
        ukupnotim2 = 0;
        $('tr.igra').remove();
        rezultat.find('.tim1').text('');
        rezultat.find('.tim2').text('');
        rezultat.find('td mark').text('');
    });
});