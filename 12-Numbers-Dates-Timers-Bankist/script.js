'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-07-17T14:11:59.604Z',
    '2023-08-01T17:01:17.194Z',
    '2023-08-02T23:36:17.929Z',
    '2023-08-05T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account3 = {
  owner: 'Bora Hamarat',
  movements: [1400, 3400, -250, -490, -2956, 450, 4300, -30],
  interestRate: 1.2,
  pin: 3333,

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'TR',
  locale: 'tr-TR',
};
const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const formatMovementDates = function (date, locale) {
  const d1 = `${String(new Date(date).getDate())
    .padStart(2, '0')
    .padStart(2, '0')}/${String(new Date(date).getMonth() + 1).padStart(
    2,
    '0'
  )}/${new Date(date).getFullYear()}`;
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const calcDaysPassed = function () {
      const days = Math.round(
        (new Date() - new Date(currentAccount.movementsDates[i])) /
          (1000 * 60 * 60 * 24)
      );
      if (days < 365) {
        if (days == 0) return 'Today';
        else if (days == 1) return 'Yesterday';
        else if (days <= 7 && days > 1) return days + ' days ago';
        else if (days > 7 && days <= 31)
          return Math.floor(days / 7) + ' weeks ago';
        else if (days > 31) return Math.round(days / 31) + ' months ago';
      } else {
        return Math.floor(days / 365) + ' years ago';
      }
    };
    const daysPassed = calcDaysPassed();
    /*const displayDate = formatMovementDates(
      currentAccount.movementsDates[i],
      currentAccount.locale
    );*/
    const displayDate = new Intl.DateTimeFormat(currentAccount.locale).format(
      new Date(currentAccount.movementsDates[i])
    );

    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const displayMov = new Intl.NumberFormat(currentAccount.locale, {
      style: 'currency',
      currency: currentAccount.currency,
    }).format(mov > 0 ? mov : mov * -1);
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class=""movements__date>${displayDate}</div>
    <div class="movements__daysPassed">${daysPassed}</div>
    <div class="movements__value">${displayMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const displayMov = formatted(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = `${displayMov}`;
};
const formatted = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formattedIncomes = formatted(incomes, acc.locale, acc.currency);
  labelSumIn.textContent = `${formattedIncomes}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const formattedOut = formatted(out, acc.locale, acc.currency);
  labelSumOut.textContent = `${formattedOut}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  const formattedInterest = formatted(interest, acc.locale, acc.currency);
  labelSumInterest.textContent = `${formattedInterest}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  //createUsernames(accounts);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  labelDate.textContent = Intl.DateTimeFormat(currentAccount.locale, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  }).format(new Date());

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //setTimer(10);
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer);
    timer = startLogOutTimer(5);
    // Update UI
    updateUI(currentAccount);
  }
});
const currentDate = `${String(new Date().getDate()).padStart(2, '0')}/${String(
  new Date().getMonth() + 1
).padStart(
  2,
  '0'
)}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}`;

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    receiverAcc.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);
    clearInterval(timer);
    timer = startLogOutTimer(5);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(Number(inputLoanAmount.value));

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());

      // Update UI
      updateUI(currentAccount);
      clearInterval(timer);
      timer = startLogOutTimer(5);
    }, 2500);
    inputLoanAmount.value = '';
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//Conversting and checking numbers
/*
console.log(+'23');
console.log(Number('23'));
console.log(Number.parseInt('3.2px'));
console.log(Number.parseFloat('3.2rem'));
console.log(Number.parseFloat('10px'));
console.log(Number.isNaN(23 / 0));
console.log(Number.isNaN(+'23X'));
console.log(Number.isFinite(23 / 0));
console.log(Number.isFinite(+'23X'));
console.log(Number.isFinite(10));
console.log(Number.isInteger(11 / 2));
console.log(Number.isInteger(9 / 3));
*/

//Math and Rounding
/*
console.log(Math.sqrt(36));
console.log(36 ** (1 / 2));
console.log(Math.max(12, 34, '56', 78, '90'));
console.log(Math.min(12, '34px', 56, 78, 90));
console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.floor(Math.random() * 10) + 1);
const randomIntFromInterval = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
console.log(randomIntFromInterval(1, 5));
console.log(Math.round(23.3)); //round close value
console.log(Math.round(23.6));
console.log(Math.ceil(23.3)); //round top value
console.log(Math.ceil(23.6));
console.log(Math.floor(23.3)); //round under value
console.log(Math.floor(23.6));
console.log(Math.trunc(23.6));
console.log((2.7).toFixed(0)); //round and show only decimal as string 2
console.log((2.7).toFixed(2)); //round and show decimal and 2 digits after decimal part as string 2.70
console.log((3.24).toFixed(1)); //3.4
console.log(+(3.26).toFixed(1)); //3.5 + converts to number.
*/

//Reminder operator
/*
const isEven = int => int % 2 == 0;
console.log(isEven(10));
console.log(isEven(11));
const isOdd = int => int % 2 == 1;
console.log(isOdd(10));
console.log(isOdd(11));
*/
let show = false;
document.querySelector('.showEvenOrOdd').addEventListener('click', function () {
  if (!show) {
    [...document.querySelectorAll('.movements__row')].forEach(function (
      row,
      i
    ) {
      Number(
        row.querySelector('.movements__value').textContent.replace('€', '')
      ).toFixed(0) % 2
        ? (row.style.backgroundColor = '#fff')
        : (row.style.backgroundColor = '#fff');
    });
  } else {
    [...document.querySelectorAll('.movements__row')].forEach(function (
      row,
      i
    ) {
      Number(
        row.querySelector('.movements__value').textContent.replace('€', '')
      ).toFixed(0) % 2
        ? (row.style.backgroundColor = 'AntiqueWhite')
        : (row.style.backgroundColor = 'Azure');
    });
  }
  show = !show;
});

//Working with BigInt
/*
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MAX_VALUE);
console.log(430423677124355470123464823n); //n converts number to BıgInt
console.log(typeof 20, typeof 20n);
*/

//Creating Date
const now = new Date();
const movementDates = function (movementDates) {
  for (const date of movementDates)
    console.log(
      `DATE: ${new Date(date).getDay()}/${new Date(date).getMonth()}/${new Date(
        date
      ).getFullYear()} TIME: ${new Date(date).getHours()}:${new Date(
        date
      ).getMinutes()}:${new Date(date).getSeconds()}`
    );
};
//movementDates(account1);
//movementDates(account1.movementsDates);
/*labelDate.textContent = `${String(new Date().getDate()).padStart(
  2,
  '0'
)}/${String(new Date().getMonth() + 1).padStart(
  2,
  '0'
)}/${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}`;
*/
//Operations with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future));
const today = new Date(2023, 7, 6, 18, 35);
console.log(today);
const daysPassed =
  (new Date(2023, 7, 16) - new Date(2023, 7, 6)) / (1000 * 60 * 60 * 24);

console.log(daysPassed);

//Internatiolazing Dates
/*labelDate.textContent = Intl.DateTimeFormat(navigator.language, {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
}).format(new Date());
console.log(Intl.DateTimeFormat("en-US").format(new Date()));
*/

//Internatiolazing Numbers
/*
console.log(
  Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(
    3884765.57
  )
);*/

//Timers
//Timeout
const words = ['Time', 'is', 'up', '!'];
const warning = setTimeout(
  (w1, w2, w3, w4) => {
    console.log(`${w1} ${w2} ${w3}${w4}`);
  },
  3000,
  ...words
);
if (words.includes('!')) clearTimeout(warning);
//Interval
const setTimer = function (minute) {
  labelTimer.textContent = `${String(minute).padStart(2, '0')}:${'00'}`;
  //let secondValue = second;
  //second = secondValue - 1;
  minute = minute - 1;
  let second = 59;
  setInterval(function () {
    if (minute >= 0) {
      if (minute != 0) {
        console.log(minute + ':' + second);
        labelTimer.textContent = `${String(minute).padStart(2, '0')}:${String(
          second
        ).padStart(2, '0')}`;
        if (second > 1) {
          second--;
        } else if (second == 1) {
          if (minute == 1) {
            minute = 0;
            second = 0;
            labelTimer.textContent = `${String(minute).padStart(
              2,
              '0s'
            )}:${String(second).padStart(2, '0')}`;
            labelWelcome.textContent = 'Log in to get started';
            console.log('Time is up');
            containerApp.style.opacity = 0;
            clearInterval(setTimer);
          }
          minute--;
          second = 59;
        }
      }
    }
  }, 1000);
};
const startLogOutTimer = function (value) {
  let time = value * 60;
  const tick = function () {
    if (time > 0) {
      let min = String(Math.trunc(time / 60)).padStart(2, '0');
      let sec = String(time % 60).padStart(2, '0');
      labelTimer.textContent = `${min}:${sec}`;
    } else if (time == 0) {
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      clearInterval(timer);
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
