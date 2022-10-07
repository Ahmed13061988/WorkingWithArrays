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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ' ';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} € `;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const intrest = account.movements
    .filter(move => move > 0)
    .map(deposit => (deposit * account.intrestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, value) => acc + value, 0);
  labelSumInterest.textContent = `${intrest} €`;
};

const calculateBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const updateUi = function (currentAccount) {
  displayMovements(currentAccount.movements);
  calcDisplaySummary(currentAccount);
  calculateBalance(currentAccount);
};
//Event listener

let currentAccount;

let logined = btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and Welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    console.log(currentAccount.movements);
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    ammount > 0 &&
    receiverAccount &&
    currentAccount.balance >= ammount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-ammount);
    receiverAccount.movements.push(ammount);
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    updateUi(currentAccount);
  }

  console.log(ammount, receiverAccount);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUsername = inputCloseUsername.value;
  const closePin = Number(inputClosePin.value);
  console.log(currentAccount);
  if (
    currentAccount.username === closeUsername &&
    currentAccount.pin === closePin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
});

// Calling the btnLoad to add event listener to it
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const ammount = Number(inputLoanAmount.value);
  if (
    ammount > 0 &&
    currentAccount.movements.some(mov => mov >= ammount * 0.1)
  ) {
    currentAccount.movements.push(ammount);
    updateUi(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const conversion = 1.1;
// const movemnetsUSD = movements.map(function (mov) {
//   // return mov * conversion;
//   return mov * conversion;
// });

//const movemnetsUSDArrow = movements.map(move => move * conversion);

const movementsUSDFor = [];

// for (const move of movements) {
//   movementsUSDFor.push(move * conversion);
// }

//console.log(movemnetsUSD, movementsUSDFor);

// const movements2 = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? `diposeted` : `withdrew`} ${Math.abs(
//       mov
//     )}`
// if (mov > 0) {
//   return `Movement ${i + 1}: You diposeted ${mov}`;
// } else {
//   return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
// }
// );

//console.log(movements2);

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
//console.log(superHeroes);

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

//console.log(deposits);

const withdrawls = account1.movements.filter(withdrawal => withdrawal < 0);

//console.log(withdrawls);

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

//console.log(account1.movements);

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

//console.log('here', max);

const totalDepositInUSA = account1.movements
  .filter(move => move > 0)
  .map(mov => mov * 1.1)
  .reduce((acc, value) => acc + value);

//console.log(totalDepositInUSA);

const withdrawls1 = account1.movements.find(mov => mov < 0);
//console.log('heree', withdrawls1);

//console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
//console.log(account);

let accountFor = {};
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') accountFor = Object.assign(account);
}
//console.log(accountFor);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//console.log(movements.includes(-130));
//console.log(movements.some(move => move === -130));

// Some it's like ||
const anyDeposits = movements.some(mov => mov > 500);
//console.log(anyDeposits);

// Every it's like &&

// const deposit1 = movements.every(mov => mov > 0);
//console.log(deposit1);

//Separete callBack
const depositFun = move => move > 0;

const deposit1 = account4.movements.every(depositFun);
//console.log(deposit1);

//const arr = [[[1, 2], 3], [[4, 5], 6], 7, 8];
//console.log(arr.flat(2));

//const allMovements = accounts.map(acc => acc.movements);
let allMovements = [];
accounts.forEach(function (acc) {
  allMovements.push(acc.movements);
  //console.log(allMovements.flat());
});

const sumOfAllMovements = allMovements.flat().reduce((acu, cur) => acu + cur);
//console.log(sumOfAllMovements);

const sumOfAllMovements2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acu, cur) => acu + cur);
//console.log(sumOfAllMovements2);

const owners = ['Ahmed', 'Hassan', 'Hussein', 'Muhammed', 'Ali'];

//console.log(owners.sort());

//console.log(movements);

//Return < 0, A, B
//Return > 0, B, A

//Ascending
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});

//Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});

//another way to solve this
// movements.sort((a, b) => a - b); //This mean return positive number, it will sort ascending

// console.log('a-b', movements);

// movements.sort((a, b) => b - a); // This will return a nagative number, it will sort Descending
// console.log('b-a', movements);

const arrayOfNumbers = [34, 65, 1, 89, 80, 81, 3000, 4000, 5000, -100];
arrayOfNumbers.sort();
//console.log(arrayOfNumbers);

movements.sort();
//console.log(movements);

//Creating arrays progrommatically

const x = new Array(7); // creating an array with seven placeholders
//console.log(x);
x.fill(1, 3, 6); // it will fill it with the element we passed, in this case we pass the value, start index and last index which is not included
//console.log(x);

const arr = [1, 2, 3, 4, 5, 6];
arr.fill(23, 4); // this will replace 5 , 6 elements and replace them with 23
//console.log(arr);

//Array.from()

const y = Array.from({ length: 7 }, () => 1);

//console.log(y);

const z = Array.from({ length: 7 }, (_, i) => 1 + i);
//console.log(z);

const dice = Array.from({ length: 100 }, (_, i) =>
  Math.trunc(Math.random() * 6 + 1)
);
//console.log(dice);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  //console.log(movementsUI);
});

//What array methods to use and when

//Mutating the array
// .push, .unshift adding to an array
//.pop, .shift, .splice to remove from array

const sortArray = [1, 59, 300, 560, 4000, -4000];
//console.log(sortArray);
//console.log(sortArray.reverse());
//console.log(sortArray.sort((a, b) => a - b));
//console.log(sortArray.sort((a, b) => b - a));
const fillArray = new Array(3);
//console.log(fillArray.fill(1));

//Generate a new array
// .map, .filter, .slice, .concat, .flat, .flatMap
const array2 = [1, 2, 3, 4, 5, 6];
const newArray2 = array2.map(el => el * 2);
//console.log(newArray2);
const filteredArray2 = array2.filter(el => el >= 3);
//console.log(filteredArray2);
const slicedArray2 = array2.slice(); //creating shallow copy
const sliced2 = array2.slice(0, 3);
//console.log(sliced2);

//AN ARRAY INDEX
//indexOf, .findIndex
const array3 = ['ahmed', 'Ali', 'Hussein', 3, 5];
//console.log(array3.indexOf('Ali'));
//console.log(array3.indexOf('Moih')); // -1 mo index found
//console.log(array3.findIndex(el => el === 'ahmed')); // boolean to find the element

//AN ARRAY ELEMENT
//find
const array4 = [
  {
    name: 'Ali',
    position: 'dad',
  },
  {
    name: 'Ahmed',
    position: 'son',
  },
];

// console.log(array4.find(el => el.name === 'Ahmed'));

//ARRAY INCLUDES ELEMENT
// includes, some, every

const array5 = ['ahmed', 'ali', 5];

// console.log(array5.includes('ahmed'));
// console.log(array5.some(el => el > 4));
// console.log(array5.every(el => el === 0));

//ARRAY into a STRING
// join

const array6 = [1, 2, 3, 4, 5];
//console.log(array6.join('-'));

//ARRAY to reduce into one value

const array7 = [67, -30, -70];
//console.log(array7.reduce((acc, current) => acc + current));

//1-
const totall = accounts
  .map(mov => mov.movements)
  .flat()
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(totall);

//2-
// const thousandDollars = accounts
//   .flatMap(acc => acc.movements)
//   .filter(acc => acc >= 1000).length;
// console.log(thousandDollars);

const thousandDollars = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, current) => {
    current >= 1000 ? ++count : count;
  }, 0);

let a = 10;

console.log(++a);

//3-
const sums = accounts
  .flatMap(mov => mov.movements)
  .reduce(
    (sums, current) => {
      // current > 0 ? (sums.deposits += current) : (sums.withdrawals += current);
      sums[current > 0 ? 'deposits' : 'withdrawals'] += current;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

// convert title case

const convertTitleCase = function (title) {
  const expseptions = [
    'a',
    'an',
    'and',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
  ];
  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(
      word =>
        expseptions.includes(word)
          ? word
          : word[0].toUpperCase() + word.slice(1) // if the word is included with the current word then just leave it, if not just capitalized
    )
    .join(' ');
  return titleCase[0].toUpperCase() + titleCase.slice(1);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not to long'));
console.log(convertTitleCase('and this one is also good'));
