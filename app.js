let palos = ['H', 'C', 'D', 'S'];
let especiales = ['J', 'Q', 'K', 'A'];
let mazo = [];
let otracarta = document.querySelector('#otracarta');
let puntuacionjugador=0, puntuacionpc=0;
let novamas = document.querySelector('#novamas');
let otrapartida = document.querySelector('#otrapartida');
let marcadortotal1 = 0;
let marcadortotal2 = 0;
let marcauser = document.querySelector('#marcadortotaljugador');
let marcapc = document.querySelector('#marcadortotalpc');

const crearMazo = () => {
    for (i=2;i<11;i++){
        for (let j of palos){
        mazo.push(`${i}${j}`);
        };
    };

    for (let i of especiales){
        for (let j of palos){
        mazo.push(`${i}${j}`);
        };
    };
    return _.shuffle(mazo);
};

let mazobarajado = crearMazo()

const marcador = (puntuacionjugador,puntuacionpc) => {
    
    if (((puntuacionjugador>puntuacionpc) && (puntuacionjugador<=21)) || (puntuacionjugador<=21 && puntuacionpc>21)){
        marcadortotal1++;
        marcauser.textContent=marcadortotal1;
    }else if (puntuacionjugador==puntuacionpc){}
    else if(((puntuacionjugador<puntuacionpc) && (puntuacionpc<=21)) || (puntuacionpc<=21 && puntuacionjugador>21)){
        marcadortotal2++;
        marcapc.textContent=marcadortotal2;
}

};

const repartirCarta = (mazoyabarajado) => {
    let carta = mazoyabarajado.pop();
    return carta;
};

const valorCarta = (carta) => {
    
    let valor = carta.slice(0, carta.length - 1);
    
    if (isNaN(valor)){
        if (valor == "A"){
            valor = 11;
        }else{
            valor = 10;
        }
        
    }else{
        valor = valor * 1;
    }

    return valor;
}



const crearCarta = (carta) => {
    let divcarta = document.querySelector('#cartasJugador');
    let cajacarta = document.createElement('img');
    cajacarta.src = `cartas/cartas/${carta}.png`;

    divcarta.append(cajacarta);
}

const crearCartaPc = (carta) => {
    let divcarta = document.querySelector('#cartasPc');
    let cajacarta = document.createElement('img');
    cajacarta.src = `cartas/cartas/${carta}.png`;

    divcarta.append(cajacarta);
}

const cambiarPuntuacionJugador = (puntuacion) => {
    let marcador = document.querySelector("#marcadorjugador");
    marcador.textContent = puntuacion;
}

const cambiarPuntuacionPc = (puntuacion) => {
    let marcador = document.querySelector("#marcadorpc");
    marcador.textContent = puntuacion;
}

const turnocomputadora = () => {
    do {
        let cartaturno = repartirCarta(mazobarajado);
        puntuacionpc= puntuacionpc + valorCarta(cartaturno);
        cambiarPuntuacionPc(puntuacionpc); 
        crearCartaPc(cartaturno)}
    while (puntuacionpc <= puntuacionjugador && puntuacionjugador<=21)
};

otracarta.addEventListener("click", () => {
    let cartaturno = repartirCarta(mazobarajado);
    puntuacionjugador = puntuacionjugador + valorCarta(cartaturno);
    cambiarPuntuacionJugador(puntuacionjugador); 
    crearCarta(cartaturno);

    if (puntuacionjugador > 21) {
        otracarta.disabled=true;
        novamas.disabled=true;
        turnocomputadora();
    } else if (puntuacionjugador == 21){
        window.alert("Felicidades has conseguido 21");
        otracarta.disabled=true;
        novamas.disabled=true;
        turnocomputadora();
    }

});

novamas.addEventListener("click", () => {
    turnocomputadora();
});


otrapartida.addEventListener("click", () => {
    let cartasusuario = document.querySelector('#cartasJugador');
    let cartaspc = document.querySelector('#cartasPc');
    marcador(puntuacionjugador,puntuacionpc);
    cartasusuario.innerHTML="";
    cartaspc.innerHTML="";
    puntuacionjugador=0;
    puntuacionpc=0;
    cambiarPuntuacionJugador(puntuacionjugador);
    cambiarPuntuacionPc(puntuacionpc);
    mazo=[];
    crearMazo();
    console.log(mazo);
    otracarta.disabled=false;
    novamas.disabled=false;

})