function sortWords(string) {
    const reg = /\d+/;

    return string.split(' ')
        .map(word => {
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
            return user.status === this.currentFilter; //this === window
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
            return acc + Number(curr);
        }, 0);
}

console.log(calcReg(123.45)); // 15
console.log(calc(111.1111)); // 7
console.log(calc(123)); // 6


// Что будет, почему, и как исправить
const o = {
    a: 10,
    b: 20,
    sum() {
        console.log(this.a + this.b);
    },
};

const o1 = {
    a: 1,
    b: 2,
    sum: o.sum // записываем в sum ссылку на функцию sum из обекта о
};

o1.sum(); //3 - вызываем функцию sum как метод объекта о1, соответственно this.a === 1 this.b === 3
setTimeout(o.sum, 5000); /* NaN потому что undefined + undefined, 
                            в setTimeout передается ссылка на функцию которую она вызвыет, 
                            при таком вызове this === window
                            window.a === undefined window.b === undefined*/


//Что выведется в консоль и почему?

function foo() {
    console.log('script end'); // выведется сразу
    setTimeout(function() {     // отправляет функцию в "очередь задач" обещая ее выполнить минимум через 4мс
       console.log('setTimeout');  
    }, 0);  

    Promise.resolve()        // ставит во очередь "микрозадач" Promise then
        .then(function() {  
            console.log('promise1');  
        })                   // ставит во очередь "микрозадач" Promise then
        .then(function() {  
            console.log('promise2');  
        });  

    console.log('script start');  //выведется сразу
}  

foo();
/*
сначала выполняются все синхронные команды, далее отрабатывают "микрозадачи" которые 
установил промис, далее отрабатфвают задачи из "очереди задач"
    script end
    script start
    promise1
    promise2
    setTimeout
*/

//Что выведется в консоль и почему?
Promise.resolve('BatMan')                       // вернет промис в состоянии fulfilled передав 'BatMan'
    .then(function (val) {                      // val === 'BatMan'
        console.log('then', val);               // then BatMan
        throw new Error('Error happen');        // перекинет в .catch передав туда 'Error: Error happen'
        return 'OMG!';                          // не выполниться
    })
    .then((val) => console.log('then', val))    // не выполниться
    .catch((val) => {                           // val === 'Error: Error happen'
        console.log('catch', val);              // catch Error: Error happen
        return Promise.reject();                // вернет промис в состоянии rejected передав в него undefined
    })
    .then(firstHandler, secondHandler)          // выполниться secondHandler(undefined) вернет в следующий then undefined
    .then(firstHandler, secondHandler)          // выполниться firstHandler(undefined) вернет в следующий then undefined
    .then(firstHandler, secondHandler);         // выполниться firstHandler(undefined)

function firstHandler(val) {
    console.log('first', val);
}

function secondHandler(val) {
    console.log('second', val);
}

/*
    then BatMan
    catch Error: Error happen
    second undefined
    first undefined
    first undefined
*/


//Что выведется в консоль и почему?
var prom1 = Promise.resolve('Error happen'); // промис в состоянии fulfilled

//1
/*первый then отработате выведет сообщение 'Error happen1'
потом кинет ошибку, второй then поймает эту ошибку и выведет сообщение 'Error: error'*/
prom1
.then((res) => { // res === 'Error happen'
	console.log(res + '1'); // 'Error happen1'
	throw new Error('error');
})
.then(null, (err) => console.log(err)); // 'Error: error'

//2
/*первый then отработате выведет сообщение 'Error happen2'
потом кинет ошибку*/
prom1
.then((res) => {
	console.log(res + '2'); // 'Error happen2'
	throw new Error('error');
}, (err) => console.log(err));

// 3
/*первый then отработате выведет сообщение 'Error happen2'
потом кинет ошибку, ошибку обработает блок catch который выведет сообщение 'Error: error'*/
prom1
.then((res) => {
	console.log(res + '2'); // 'Error happen2'
	throw new Error('error');
})
.catch((err) => console.log(err)); // 'Error: error'

var prom2 = Promise.reject('Error happen'); // промис в состоянии rejected 

// 1
/*первый than не отработает т.к у него не определен onRejected
у второго than сработает onRejected и выведет сообщение 'Error happen'*/
prom2
.then((res) => {
	console.log(res + '1');
	throw new Error('error');
})
.then(null, (err) => console.log(err)); // 'Error happen'

// 2
/*на  первом than отработает onRejected выведет сообщение 'Error happen'*/
prom2
.then((res) => {
	console.log(res + '2');
	throw new Error('error');
}, (err) => console.log(err));  // 'Error happen'

// 3
/*then не отработает catch выведет сообщение 'Error happen'*/
prom2
.then((res) => {
	console.log(res + '2');
	throw new Error('error');
})
.catch((err) => console.log(err));  // 'Error happen'