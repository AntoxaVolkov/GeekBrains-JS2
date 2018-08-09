function CoffeeMachine(power, capacityWater, capacityGrains) {
    this._power = power || 1000;
    this._waterAmount = 0;
    this._grains = 0;
    this._timeoutId = null;
    this._capacityOfWater = capacityWater || 500;
    this._capacityOfGrains = capacityGrains || 100;
    this._maxTemp = 90;
    this._contInfo = document.querySelector('#info');
    this._contCounter = document.querySelector('#counter');


    this._counterUpdate();
}

CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._getTimeToBoil = function () {
    return (this._waterAmount * this.WATER_HEAT_CAPACITY * this._maxTemp) / this._power;
};

CoffeeMachine.prototype.launch = function () {
    if (!this._isEmpty()){
        this._info('Начато приготовление кофе');
        this._run();
    }else{
        this._error('Кофемашина пустая.')
    }
    
};

CoffeeMachine.prototype._run = function () {
    if (!this._timoutId){
        this._timoutId = setTimeout(() => {
            this._waterAmount -= 50;
            this._grains -= 10;
            this._timoutId = null;
            this._counterUpdate();
            this._info('Кофе готов!');
        }, this._getTimeToBoil());
    }else{
        this._error('Уже запущена');
    }
    console.log(this._timoutId ) 
};

CoffeeMachine.prototype.stop = function () {
    if( this._timoutId ){
        clearTimeout( this._timoutId );
        this._timoutId = null;

        this._info('Кофемашина остановлена');
    }else{
        this._error('Кофемашина не была запущена');
    }
};

CoffeeMachine.prototype.addWater = function (amount) {
    amount = +amount;
    if ((this._waterAmount + amount) <= this._capacityOfWater) {
        this._waterAmount += +amount;
        this._info('Вода добавлена');
        this._counterUpdate();
    } else {
        this._error('Слишком много воды.');
    } 
};

CoffeeMachine.prototype.addGrains = function (grains) {
    grains = +grains;
    if ((this._grains + grains) <= this._capacityOfGrains){
        this._grains += grains;
        this._info('Зерно добавлено');
        this._counterUpdate();
    }else{
        this._error('Слишком много зёрен.');
    }     
};

CoffeeMachine.prototype._isEmpty = function () {
    return (this._waterAmount < 50) || (this._grains < 10);
};

CoffeeMachine.prototype._info = function (text) {
    this._contInfo.className = 'info';
    this._contInfo.innerText = text;
};

CoffeeMachine.prototype._error = function (text) {
    this._contInfo.className = 'error';
    this._contInfo.innerText = text;
};

CoffeeMachine.prototype._counterUpdate = function (text) {
    this._contCounter.innerText = "Кол-во воды: " + this._waterAmount + " | Кол-во зёрен: " + this._grains;
};

var coffeeMachine = new CoffeeMachine(10000);
var btnStart = document.querySelector('#start');
var btnStop = document.querySelector('#stop');
var btnAddWater = document.querySelector('#addWater');
var btnAddGrains = document.querySelector('#addGrains');
var inputGrains = document.querySelector('#grains');
var inputAmount = document.querySelector('#amount');

btnStart.addEventListener('click', function () {
    coffeeMachine.launch();
});

btnStop.addEventListener('click', function () {
    coffeeMachine.stop();
});

btnAddWater.addEventListener('click', function () {
    coffeeMachine.addWater(inputAmount.value);
    inputAmount.value = '';
});

btnAddGrains.addEventListener('click', function () {
    coffeeMachine.addGrains(inputGrains.value);
    inputGrains.value = '';
});


