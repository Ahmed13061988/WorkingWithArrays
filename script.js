'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ' ';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
  <div class="movements__row">
     <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__value">${mov}€</div>
  </div>   
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const conversion = 1.1;
const movemnetsUSD = movements.map(function (mov) {
  // return mov * conversion;
  return 23;
});

const movemnetsUSDArrow = movements.map(move => move * conversion);

const movementsUSDFor = [];

for (const move of movements) {
  movementsUSDFor.push(move * conversion);
}
console.log(movemnetsUSD, movementsUSDFor);
/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //Slice
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice(1, -1));
// console.log(arr.slice());

// //Splice
// //console.log(arr.splice(2));

// console.log(arr);
// arr.splice(3, 2);
// console.log(arr);
// arr.splice(0, 1, 'Alif');
// console.log(arr);

// const array = ['Ahmed', 'Ali', 'Hussein'];
// console.log(array);
// array.splice(2, 1, 'Ghaeb', 'Alubaidi');
// console.log(array);

// //Reverse
// const anotherArr = ['Skriniar', 'Brozovic', 'Samir'];
// // console.log(anotherArr.reverse());
// // console.log(anotherArr);

// //Concat
// const concatedArr = anotherArr.concat(array);
// //console.log(concatedArr);

// //JOIN
// //console.log(anotherArr.join('-'));

// //At method
// const arrAt = [23, 11, 64];
// // console.log(arrAt[0]);
// // console.log(arrAt.at(0));
// // console.log(arrAt.slice(-1)[0]); // last element
// // console.log(arrAt[arrAt.length - 1]); // last element
// // console.log(arrAt.at(-1)); // last element
// // console.log(arrAt.at(-2));

// const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements1.entries()) {
//   console.log(
//     movement > 0
//       ? `${i + 1} You diposited ${movement}`
//       : `${i + 1} You withdrew ${Math.abs(movement)}`
//   );
// }

// movements1.forEach(function (movement, index, array) {
//   console.log(`${index + 1}: ${movement}`);
//   //console.log(index); // this will return the index of the element
//   //console.log(array); // this will return the entire array
// });

// const currencies1 = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies1.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const currenciesUnique = new Set(currencies1);

// currenciesUnique.forEach(function (value, key, set) {
//   console.log(` ${value}`); // the key is same as value, because set doen't have keys or index at all
// });
