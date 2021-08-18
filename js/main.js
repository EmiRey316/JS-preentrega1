//
//              SISTEMA DE SIMULACIÓN DE PRÉSTAMOS
//
//  2 tipo de préstamos habilitados:
//  
//  - Préstamo Simple: Préstamo en que el capital solicitado se divide en partes iguales en todas las cuotas.
//                      Además se paga el interés correspondiente a cada mensualidad.
//                      En las primeras cuotas se paga más y en las útimas menos.
//
//  - Prestamo Americano: Préstamo en que el capital solicitado se paga en su totalidad en la últimacuota y en el
//                         resto solo se pagan intereses, por ello la última cuota es muy superior a las demás.
//



//Constantes y variables generales.
const tasaAnualSimple = 40;
const tasaAnualAmericana = 50;

let pagoTotal = 0;



//Funciones compartidas entre los tipos de préstamos.
const interes = (capital, tasa) => (capital * (tasa / 12)) / 100;

function imprimirCuota(numeroCuota, valorCuota) {
    console.log(`El valor de la cuota ${numeroCuota} es $ ${valorCuota}.`);
}



//      CÁLCULOS PARTICULARES DEL PRÉSTAMO SIMPLE.
//Queda como function para el proyecto, ya que en el desafío de las clases 5 y 6 ya pasa a ser un objeto.
function calcularSimple(monto, cantidadCuotas) {
    let abonoMensual = monto / cantidadCuotas;

    //Defino la variable saldo, que será el resto de capital que falta pagar.
    let saldo = monto;

    for (let i = 1; i <= cantidadCuotas; i++) {
        let interesCuota = interes(saldo, tasaAnualSimple);
        let valorCuota = abonoMensual + interesCuota;
        imprimirCuota(i, valorCuota);
        pagoTotal = pagoTotal + valorCuota;
        saldo = saldo - abonoMensual;
    }
}



//      CÁLCULOS PARTICULARES DEL PRÉSTAMO AMERICANO.
//Queda como function para el proyecto, ya que en el desafío de las clases 5 y 6 ya pasa a ser un objeto.
function calcularAmericano(monto, cantidadCuotas) {
    let interesMensual = interes(monto, tasaAnualAmericana);

    //En este caso, el pago total es el monto solicitado sumado al interes pagado en todas las cuotas.
    pagoTotal = monto + (interesMensual * cantidadCuotas);

    for (let i = 1; i < cantidadCuotas; i++) {
        imprimirCuota(i, interesMensual);
        //Las primeras cuotas únicamente tienen interés.
    }
        
    let cuotaFinal = monto + interesMensual;
    imprimirCuota(cantidadCuotas, cuotaFinal);
}




//              EJECUCIÓN


//Pedido de datos al cliente. Selección del tipo de préstamo a gestionar.
let tipo = Number(prompt("Bienvenido, seleccione el tipo de préstamo que desea solitar ([1] Préstamo Simple  -  [2] Préstamo Americano)"));

//Ciclo While hasta que el cliente seleccione una opción de tipo correcta.
while ((tipo != 1) && (tipo != 2)) {
    tipo = Number(prompt("Debe seleccionar una opción válida ([1] Préstamo Simple  -  [2] Préstamo Americano)"));
}


//Pedido de datos al cliente. Monto y cantidad de cuotas a gestionar.
let prestamoMonto = Number(prompt("Ingrese el monto que desea solicitar", "Monto"));
let prestamoCuotas = parseInt(prompt("Ingrese la cantidad de cuotas que desea solicitar", "Cuotas"));

//Ciclo While hasta que el cliente seleccione una cantidad de cuotas mayor a 1 para evitar un ciclo for infinito.
while (prestamoCuotas < 1) {
    prestamoCuotas = parseInt(prompt("Debe ingresar una cantidad de cuotas correcta (mayor o igual a 1)"));
}



switch (tipo) {
    case 1:
        console.log(`Préstamo del tipo Simple por $ ${prestamoMonto} en ${prestamoCuotas} cuotas.`);
        console.log(`Tabla de amortización:`);
        calcularSimple(prestamoMonto, prestamoCuotas);
        break;

    case 2:
        console.log(`Préstamo del tipo Americano por $ ${prestamoMonto} en ${prestamoCuotas} cuotas.`);
        console.log(`Tabla de amortización:`);
        calcularAmericano(prestamoMonto, prestamoCuotas);
        break;
}

console.log(`El total a pagar al final del crédito será de $ ${pagoTotal}`);