var Bela = {

    // varijable za pracenje
    broj : 0,

    // dom elementi
    vrijednost1 : '',
    vrijednost2 : '',
    zvanjet1 : '',
    zvanjet2 : '',
    ukupno1Elem : '',
    ukupno2Elem : '',
    razlikaElem : '',
    inserting : '',

    init : function(config) { // započni
        Bela.vrijednost1 = config.vrijednost1;
        Bela.vrijednost2 = config.vrijednost2;
        Bela.zvanjet1 = config.zvanjet1;
        Bela.zvanjet2 = config.zvanjet2;
        Bela.ukupno1Elem = config.ukupno1Elem;
        Bela.ukupno2Elem = config.ukupno2Elem;
        Bela.razlikaElem = config.razlikaElem;
        Bela.inserting = config.inserting;
        Bela.ucitaj_iz_ls();
    },

    spremi_u_ls : function() {
        localStorage.tim1 = Bela.ukupnotim1;
        localStorage.tim2 = Bela.ukupnotim2;
    },

    ucitaj_iz_ls : function() {
        if(localStorage.tim1) Bela.ukupnotim1 = Number(localStorage.tim1);
        if(localStorage.tim2) Bela.ukupnotim2 = Number(localStorage.tim2);
    },

    ispisiRezultat : function() { // ispisi trenutni trzultat
        Bela.ukupno1Elem.text(Bela.ukupnotim1);
        Bela.ukupno2Elem.text(Bela.ukupnotim2);
        if(tim1 >= tim2) {
            Bela.razlikaElem.text(Bela.ukupnotim1 - Bela.ukupnotim2);
        } else {
            Bela.razlikaElem.text(Bela.ukupnotim2 - Bela.ukupnotim1);
        }
    },

    oduzmiVrijednost : function(tim1, tim2) {
        tim1 = Number(tim1);
        tim2 = Number(tim2);
        Bela.ukupnotim1 -= tim1;
        Bela.ukupnotim2 -= tim2;
    },

    dodajVrijednost : function(tim1, tim2) {
        tim1 = Number(tim1);
        tim2 = Number(tim2);
        Bela.ukupnotim1 += tim1;
        Bela.ukupnotim2 += tim2;
    },

    izracunajDruguVrijednost : function(prvi, drugi, $this) {
        $ovaj = $this;
        if($ovaj[0] == prvi[0]) {
            $onaj = drugi;
        }
        if($ovaj[0] == drugi[0]) {
            $onaj = prvi;
        }
        value = 181 - Number($ovaj.val());
        $drugi.val(value);
    },

    dobiKrajnjuVrijednost : function(vrijednost1, vrijednost2, zvanje1, zvanje2) {
        vrijednost1 = typeof vrijednost1 !== 'undefined' ? Number(vrijednost1) : Number(Bela.vrijednost1.val());
        vrijednost2 = typeof vrijednost2 !== 'undefined' ? Number(vrijednost2) : Number(Bela.vrijednost2.val());
        zvanje1 = typeof zvanje1 !== 'undefined' ? Number(zvanje1) : Number(Bela.zvanje1.val());
        zvanje2 = typeof zvanje2 !== 'undefined' ? Number(zvanje2) : Number(Bela.zvanje2.val());
        vrijednost1 += zvanje1;
        vrijednost2 += zvanje2;
        Bela.dodajVrijednost(vrijednost1, vrijednost2);
        return [vrijednost1, vrijednost2]
    },

    dodajRed : function(tim1, tim2, zvanje1, zvanje2) {
        vrijednosti = Bela.dobiKrajnjuVrijednost(tim1, tim2, zvanje1, zvanje2);
        html = '<tr class="igra">';
        html += '<td>' + Bela.broj + '</td>';
        html += '<td class="tim1red">' + vrijednosti[0] + '</td>';
        html += '<td class="tim2red">' + vrijednosti[1] + '</td>';
        html += '<td><button class="btn btn-sm btn-danger obrisi" data-action="obrisi" style="margin-right: 5px;">Obriši</button><button data-action="azuriraj" class="azuriraj btn btn-sm btn-warning" data-toggle="modal" data-target=".azuriranje">Uredi</button></td>';
        html += '</tr>';
        Bela.inserting(html);
    },

    dobiVrijednostiIzReda : function(red) {
        tim1 = Number(red.find('td.tim1red').text());
        tim2 = Number(red.find('td.tim2red').text());
        return [tim1, tim2];
    },

    makniRed : function(red) {
        vrijednosti = Bela.dobiVrijednostiIzReda(red);
        Bela.oduzmiVrijednost(vrijednosti[0], vrijednosti[1]);
        Bela.broj--;
        red.fadeOut(300);
        red.remove();
    },

    dobiRedOdTipke : function(tipka) {
        return tipka.parent().parent();
    },

    makniRedOdTipke : function(tipka) {
        Bela.makniRed(Bela.dobiRedOdTipke(tipka));
    },

    azuriraj : function(red, tim1, tim2, zvanje1, zvanje2) {
        stare_vrijednosti = Bela.dobiVrijednostiIzReda(red);
        Bela.oduzmiVrijednost(stare_vrijednosti[0], stare_vrijednosti[1]);
        nove_vrijednosti = Bela.dobiKrajnjuVrijednost(tim1, tim2, zvanje1, zvanje2);
        Bela.dodajVrijednost(nove_vrijednosti[0], nove_vrijednosti[1]);
        return nove_vrijednosti;
    },

    azurirajRed : function(red, tim1, tim2, zvanje1, zvanje2) {
        vrijednosti = Bela.azuriraj(red, tim1, tim2, zvanje1, zvanje2);
        red.find('td.tim1red').text(vrijednosti[0]);
        red.find('td.tim2red').text(vrijednosti[1]);
    },

    reset : function() {
        Bela.ukupnotim1 = 0;
        Bela.ukupnotim2 = 0;
    }
};

Object.defineProperties(Bela, {
    ukupnotim1 : {
        get : function() {
            return Bela.ukupnotim1;
        },
        set : function(value) {
            Bela.ukupnotim1 = value;
            Bela.spremi_u_ls();
            Bela.ispisiRezultat();
        }
    },
    ukupnotim2 : {
        get : function() {
            return Bela.ukupnotim2;
        },
        set : function(value) {
            Bela.ukupnotim2 = value;
            Bela.spremi_u_ls();
            Bela.ispisiRezultat();
        }
    }
});