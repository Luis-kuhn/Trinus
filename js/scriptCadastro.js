var TxtType = function(el, palavras) {
    this.palavras = palavras;
    this.el = el;
    this.loop = 0;
    this.periodo = 2000
    this.txt = '';
    this.tick();
    this.apagando = false;
};

TxtType.prototype.tick = function() {
 
    var i = this.loop % this.palavras.length;
    var fullTxt = this.palavras[i];

    if (this.apagando) {

        this.txt = fullTxt.substring(0, this.txt.length - 1);

    } else {

        this.txt = fullTxt.substring(0, this.txt.length + 1);

    }

    this.el.innerHTML = '<span class="wordsTypeWrite">' + this.txt + '</span>';

    var interno = this;
    var velocidade = 200 - Math.random() * 100;

    if (this.apagando) { 

        velocidade /= 2; 

    }

    if (!this.apagando && this.txt === fullTxt) {

        velocidade = this.periodo;
        this.apagando = true;

    } else if (this.apagando && this.txt === '') {

        this.apagando = false;
        this.loop++;
        velocidade = 500;

    }

    setTimeout(function() {
    interno.tick();
    }, velocidade);
};

window.onload = function() {

    var elements = document.getElementsByClassName('typeWrite');

    var palavras = elements[0].getAttribute('data-words');
    if (palavras) {

        new TxtType(elements[0], JSON.parse(palavras));
        
    }

};