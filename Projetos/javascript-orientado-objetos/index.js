import { Cliente } from "./Cliente.js";
import { ContaCorrente } from "./ContaCorrente.js";

const cliente1 = new Cliente("Ricardo", 11122233309);

const cliente2 = new Cliente("Alice", 88822233309);

const contaCorrenteRicardo = new ContaCorrente(1001, cliente1);

// contaCorrenteRicardo.depositar(100);
// contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.depositar(500);

// const valorSacado = contaCorrenteRicardo.sacar(50);
// console.log(valorSacado);

const conta2 = new ContaCorrente(102, cliente2);

let valor = 200;
contaCorrenteRicardo.transferir(valor, conta2);

console.log("valor: ", valor);

//conta2.saldo = 22000;  // TypeError: Cannot set property saldo of #<ContaCorrente> which has only a getter

console.log(conta2);
console.log(ContaCorrente.numeroDeContas);

//console.log(contaCorrenteRicardo);

 