function sortWords(string) {
    const reg = /\d+/;

    return string.split(' ')
        .map(word => {
            console.log(word.match(reg));
            return word.match(reg);
        })
        .sort((a, b) => {
            return a - b
        })
        .map(elem => {
            return elem.input;
        })
        .join(' ');
}

Number.prototype.isSimple = function () {
    for (let i = 2; i <= this - 1; i++) {
        if (this % i === 0) {
            return false;
        }
    }

    return true;
}

function reverse(number) {
    return parseInt(number.toString()
        .split('')
        .reverse()
        .join(''));
}

function revNum(num, res = 0) {
    if (!num) return res;
    res = res * 10 + num % 10;
    return revNum(Math.floor(num / 10), res);
}

// Объяснить почему
var a = {};         //глобальная переменная "а" с сылкой на пустой объект
function clear(a) { //локальная переменная функции "а"
    a.a = 10;       //присваеваем 10 как свойство объекта {a: 10}
    a = null;       //перезаписываем локальную переменную функции
};

clear(a);           //вызываем функцию передавая ссылку на объект

console.log(a);     //глобальная переменная "а" все еще ссылается на объект

/// Что будет, почему, и как исправить
var userService = {
    currentFilter: 'active',
    users: [
        { name: 'Alex', status: 'active' },
        { name: 'Nick', status: 'delete' },
    ],
    getFiltered: function () {
        return this.users.filter(function (user) { //использовавть стрелочную функцию
            return user.status === this.currentFilter; //this === users
        });
    },
};

userService.getFiltered(); //[]

function calc(number) {
    return number.toString()
        .split('')
        .reduce((acc, curr) => {
            let num = Number(curr);

            if (!isNaN(num)) {
                return acc += num;
            }

            return acc;
        }, 0);
}

function calcReg(number) {
    return number.toString()
        .match(/\d/g)
        .reduce((acc, curr) => {
            return acc + Number(curr)
        }, 0);
}

console.log(calcReg(123.45)); // 15
console.log(calc(111.1111)); // 7
console.log(calc(123)); // 6