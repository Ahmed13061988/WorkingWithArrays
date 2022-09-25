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
     <div class="movements__value">${mov} €</div>
  </div>   
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const calcDisplaySummary = function (movements) {
  const incomes = account1.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} € `;

  const out = account1.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} €`;
};

calcDisplaySummary(account1.movements);

const calculateBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};
calculateBalance(account1.movements);

// console.log(userName);

// const namesOnly = accounts.map(name => name.owner.split(' '));
// let initials = [];
// namesOnly.forEach(function (name) {
//   for (let i = 0; i < name.length; i++) {
//     initials.push(name[i].slice(0, 1));
//   }
//   console.log(initials);
// });

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
  return mov * conversion;
});

const movemnetsUSDArrow = movements.map(move => move * conversion);

const movementsUSDFor = [];

for (const move of movements) {
  movementsUSDFor.push(move * conversion);
}

console.log(movemnetsUSD, movementsUSDFor);

const movements2 = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? `diposeted` : `withdrew`} ${Math.abs(
      mov
    )}`
  // if (mov > 0) {
  //   return `Movement ${i + 1}: You diposeted ${mov}`;
  // } else {
  //   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  // }
);

console.log(movements2);

const superHeroes = [
  {
    name: 'Scorpion Hanzo',
    realm: 'Nethererelm',
    age: 'Unknown',
    side: 'Good',
  },
  {
    name: 'Sub-Zero Bi-Han',
    realm: 'Eart',
    age: 'Unknown',
    side: 'Good',
  },
  {
    name: 'Show-Kahn Emperor',
    realm: 'Out-World',
    age: 'Unknown',
    side: 'Bad',
  },
  {
    name: 'Lui-Kang Lui',
    realm: 'Earth',
    age: '35',
    side: 'Good',
  },
];

const initials = function (array) {
  array.forEach(function (int) {
    int.initials = int.name
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
initials(superHeroes);
console.log(superHeroes);

// const firstName = superHeroes.map(first => first.name.split(' ')[0]);
// console.log('firstName', firstName);

// const namesOnly = superHeroes.map(name => name.name);
// console.log('names only', namesOnly);

// const nameAndRealm = superHeroes.map(info => ({
//   name: info.name,
//   realm: info.realm,
// }));
// console.log('Name and Realm', nameAndRealm);

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

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements1.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

const withdrawls = account1.movements.filter(withdrawal => withdrawal < 0);

console.log(withdrawls);

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

console.log('--------LeetCode------');
let s = "Let's take LeetCode contest";
var reverseWords = function (s) {
  return s
    .split(' ')
    .map(item => item.split('').reverse().join(''))
    .join(' ');
};

//console.log(reverseWords(s));

const mama = 'Salwa Kareem';

const mama1 = mama.split(' ');
const mamaFinal = mama1
  .map(letter => letter.split('').reverse().join(''))
  .join(' ');

//console.log(mamaFinal);

const hifa = ['he', 'is', 'a guniea', 'pig'];
let rHifa = [];
for (let i = hifa.length - 1; i >= 0; i--) {
  let index = hifa.length - 1 - i; // (3-3) 0,(3-2) 1, (3-1) 2,(3-0) 3
  //console.log(index); // 0, 1, 2, 3
  rHifa[index] = hifa[i];
}
//console.log(rHifa);

//console.log(hifa.reverse().join(' '));

console.log(account1.movements);

const resultBalance = account1.movements.reduce(function (acc, curr, i) {
  return acc + curr;
}, 0);

const resultBalanceArrow = account1.movements.reduce(
  (acc, cur) => acc + cur,
  0
);

let balance = 0;

for (const mov of account1.movements) balance += mov;

// const max = account1.movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else {
//     return (acc = mov);
//   }
// });

const max = account1.movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
});

console.log('here', max);

const totalDepositInUSA = account1.movements
  .filter(move => move > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, value) => acc + value);

console.log(totalDepositInUSA);
