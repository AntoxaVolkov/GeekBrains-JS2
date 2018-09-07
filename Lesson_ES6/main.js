//////////////////////////////////////////////////////////////
/////////              Task 1
/////////////////////////////////////////////////////////////
let 
    res = 1;

function loop(times = 0, callback = null, ...arg){
    while (callback && times) {
        callback(...arg);
        --times;
    }
}

function func(a, b){
    res *= a + b;
}

loop(10, func, 2, 4);


console.log(">>>>>>>>>>>>>>>>> task 1 <<<<<<<<<<<<<<<<<<<<<<");
console.log(res);
console.log('');


//////////////////////////////////////////////////////////////
/////////              Task 2
/////////////////////////////////////////////////////////////

function calculateArea({figure = 'rectangle', a = 0, b = 0, d1 = 0, d2 = 0, h = 0, r = 0}) {
    let 
        area = 0,
        input;
    switch (figure) {
        case 'rectangle':
            if(a && !b){
                area = a * a;
                input = { a };
            }else if(a && b){
                area = a * b;
                input = { a, b };
            }else{
                throw "Нет необходимых параметров"
            }
            break;
        case 'triangle':
            if (a && b) {
                area = a * b / 2;
                input = { a, b };
            } else if (a && h) {
                area = a * h / 2;
                input = { a, h };
            } else {
                throw "Нет необходимых параметров"
            }
            break;
        case 'rhombus':
            if (d1 && d2) {
                area = d1 * d2 / 2;
                input = { d1, d2 };
            }else {
                throw "Нет необходимых параметров"
            }
            break;
        case 'trapeze':
            if (a && b && h) {
                area = (a + b) * h / 2;
                input = { a, b, h };
            } else {
                throw "Нет необходимых параметров"
            }
            break;
        case 'circle':
            if (r) {
                area = Math.PI * r * r;
                input = { r };
            } else {
                throw "Нет необходимых параметров"
            }
            break;
    
        default:
            throw "Нет необходимых параметров"
            break;
    }

    return {figure, area, input}
}


console.log(">>>>>>>>>>>>>>>>> task 2 <<<<<<<<<<<<<<<<<<<<<<");
console.log(calculateArea({ a: 2 }));
console.log(calculateArea({ figure : 'rectangle', a: 2, b: 3 }));
console.log(calculateArea({ figure: 'triangle', a: 2, b: 3 }));
console.log(calculateArea({ figure: 'triangle', a: 2, h: 4 }));
console.log(calculateArea({ figure: 'rhombus', d1: 2, d2: 4 }));
console.log(calculateArea({ figure: 'trapeze', a: 2, b: 4, h:3 }));
console.log(calculateArea({ figure: 'circle', r: 5 }));
console.log("");



//////////////////////////////////////////////////////////////
/////////              Task 3
/////////////////////////////////////////////////////////////


//////////////////////////
///// class Human
/////////////////////////

class Human {
    constructor({name, age, dateOfBirth}){
        this.name = name;
        this.dateOfBirth = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);
        this._calcAge();
    }
    _calcAge() {
        let 
            nowY = new Date().getFullYear(),
            nowM = new Date().getMonth(),
            nowD = new Date().getDate(),
            y = this.dateOfBirth.getFullYear(),
            m = this.dateOfBirth.getMonth(),
            d = this.dateOfBirth.getDate(),
            age = nowY - y;

        if(nowM < m){
            age--
        }
        if((m === nowM) && (nowD < d)){
            age --
        }
        this.age = age;
    }

    displayInfo(){
        
        return `Name: ${this.name}
            Age: ${this.age}
            Date of birth: ${this.dateOfBirth}`;
    }
}


//////////////////////////
///// class Employee
/////////////////////////

class Employee extends Human {
    constructor({salary, department, ...arg}) {
        super(arg);
        this.salary = salary;
        this.department = department;
    }

    displayInfo() {
        let str = super.displayInfo()
        return str + `
            Salary: ${this.name}
            Department: ${this.age}`;
    }
}


//////////////////////////
///// class Developer
/////////////////////////

class Developer extends Employee {
    constructor(arg) {
        super(arg)
        this._manager = null;
    }

    get manager() {
        return this._manager;
    }

    changeManager(manager) {
        if(manager instanceof Manager) {
            this._manager = manager;
        } else if(manager === undefined) {
            this._manager = null;
        } else {
            throw "Должен быть передан экземляр класса Manager или ничего";
        }
    }
}


//////////////////////////
///// class Manager
/////////////////////////

class Manager extends Employee {
    constructor(arg) {
        super(arg)
        this._developers = [];
    }

    get developers() {
        return this._developers;
    }

    addDeveloper(developer){
        if (developer instanceof Developer) {
            this._developers.push(developer);
            developer.changeManager(this);
        } else {
            throw "Должен быть передан экземляр класса Developer";
        }
    }

    removeDeveloper(developer){
        if (developer instanceof Developer) {
            this._developers = this._developers.filter( item => {
                if(item === developer){
                    developer.changeManager();
                    return false;
                }
                return true;
            });
        } else {
            throw "Должен быть передан экземляр класса Developer";
        }
    }
}

const
    managers = [],
    developers = [],
    arrDevelopers = [
        {
            name: "Вася",
            dateOfBirth: new Date("09/07/1992"),
            salary: 28000,
            department: "Frontend"
        },
        {
            name: "Витя",
            dateOfBirth: new Date("09/06/1992"),
            salary: 30000,
            department: "Frontend"
        },
        {
            name: "Митя",
            dateOfBirth: new Date("09/08/1992"),
            salary: 25000,
            department: "DevOps"
        },
        {
            name: "Костя",
            dateOfBirth: new Date("08/07/1992"),
            salary: 25000,
            department: "DevOps"
        },
        {
            name: "Маша",
            dateOfBirth: new Date("08/07/1994"),
            salary: 35000,
            department: "Backend"
        },
        {
            name: "Алина",
            dateOfBirth: new Date("09/06/1994"),
            salary: 25000,
            department: "Backend"
        },
    ],
    arrManagers = [
        {
            name: "Ольга",
            dateOfBirth: new Date("07/09/1992"),
            salary: 40000,
            department: "Frontend"
        },
        {
            name: "Катя",
            dateOfBirth: new Date("08/11/1990"),
            salary: 35000,
            department: "DevOps"
        },
        {
            name: "Костя",
            dateOfBirth: new Date("12/23/1990"),
            salary: 45000,
            department: "Backend"
        },
    ];

for(let manager of arrManagers){
    managers.push(new Manager(manager));
}
for(let developer of arrDevelopers){
    developers.push(new Developer(developer));
}

console.log(">>>>>>>>>>>>>>>>> task 3 <<<<<<<<<<<<<<<<<<<<<<");
console.log(managers);
console.log(developers);

managers[0].addDeveloper(developers[0]);
managers[0].addDeveloper(developers[1]);
managers[1].addDeveloper(developers[2]);
managers[1].addDeveloper(developers[3]);
managers[2].addDeveloper(developers[4]);
managers[2].addDeveloper(developers[5]);
managers[2].removeDeveloper(developers[5]);
console.log("");



//////////////////////////////////////////////////////////////
/////////              Task 4
/////////////////////////////////////////////////////////////

function* makeQuestionnaire() {
    let name = yield "Ваше имя?";
    console.log(name);
    let age = yield "Ваш возраст?";
    console.log(age);
    let sex = yield "Ваш пол?";
    console.log(sex);
    console.log({ name, age, sex });
}

const questionnaire = makeQuestionnaire()

console.log(">>>>>>>>>>>>>>>>> task 4 <<<<<<<<<<<<<<<<<<<<<<");
console.log(questionnaire.next().value);
console.log(questionnaire.next("Anton").value);
console.log(questionnaire.next("26").value);
console.log(questionnaire.next("male").value === undefined ? 'Спасибо' : '');
console.log("");


//////////////////////////////////////////////////////////////
/////////              Task 5
/////////////////////////////////////////////////////////////

const arrPromises = [];
let i = 1;

function makePromise() {
    let promise = new Promise((res, rej) => {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://jsonplaceholder.typicode.com/users/${i}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if(xhr.readyState != 4) return;
                
                if(xhr.status != 200){
                    rej({status: xhr.status, text: xhr.statusText});
                }else{
                    let user = JSON.parse(xhr.responseText)
                    res(user);
                }
            };
        } catch (error) {
            rej(error)
        }
    });
    arrPromises.push(promise);
    i++;
}

loop(10, makePromise);

Promise.all(arrPromises).then( res => {
    console.log(">>>>>>>>>>>>>>>>> task 5 <<<<<<<<<<<<<<<<<<<<<<");
    console.log(res);
    console.log("");
});


///////////////////////////////////////////////////////////////////////////////////

