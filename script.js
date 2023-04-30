
class Horse {
    depositedBy = null
    depositedAmount = 0;
    constructor(horseId) {
        this.horseId = horseId;
        this.marginLeft = 0;
    }
    resetHorse() {
        const horseElement = document.querySelector(`#${this.horseId}`);
        this.marginLeft = 0;
        horseElement.style.marginLeft = `0px`;
        this.depositedBy = null;
        this.depositedAmount = 0;

    }
    moveHorse() {
        const horseElement = document.querySelector(`#${this.horseId}`);
        this.marginLeft += Math.floor(Math.random() * 60);
        horseElement.style.marginLeft = `${this.marginLeft}px`;
    }
    won() {
        if (this.depositedBy) {
            this.depositedBy.amount = this.depositedBy.amount + 2 * this.depositedAmount;
            this.depositedBy.wonTimes = this.depositedBy.wonTimes + 1;
            document.querySelector('.times').innerHTML = this.depositedBy.wonTimes;

        }
    }
}
class MyWallet {
    constructor(amount) {
        this.amount = amount;
        this.wonTimes = 0;
    }

    deposit(amount, horse) {
        console.log(horse)
        this.amount = this.amount - amount;
        horse.depositedBy = this;
        horse.depositedAmount = amount;
        document.querySelector('.money').innerHTML = `${this.amount}$`;
        document.querySelector('.depositedHorse').innerHTML = `${horse.horseId}`;

    }



}

const horse1 = new Horse("horse1");
const horse2 = new Horse("horse2");
const horse3 = new Horse("horse3");

const newWallet = new MyWallet(800);

document.querySelector('.money').innerHTML = `${newWallet.amount}$`;
let intervalId = null;

function resetHorses() {
    horse1.resetHorse()
    horse2.resetHorse()
    horse3.resetHorse()
}
const audio = new Audio('./audio/horse.mp3')
function startRace() {
    audio.play();
    intervalId = setInterval(() => {
        horse1.moveHorse();
        horse2.moveHorse();
        horse3.moveHorse();

        if (horse1.marginLeft >= 930) {
            clearInterval(intervalId);
            horse1.won()
            alert(`Horse ${horse1.horseId} won!`);
            document.querySelector('.money').innerHTML = `${newWallet.amount}$`;
            document.querySelector('.depositedHorse').innerHTML = null;
            resetHorses()

        }
        if (horse2.marginLeft >= 930) {
            clearInterval(intervalId);
            horse2.won()
            alert(`Horse ${horse2.horseId} won!`);
            document.querySelector('.money').innerHTML = `${newWallet.amount}$`;
            document.querySelector('.depositedHorse').innerHTML = null;
            resetHorses()

        }
        if (horse3.marginLeft >= 930) {
            clearInterval(intervalId);
            horse3.won()
            alert(`Horse ${horse3.horseId} won!`);
            document.querySelector('.money').innerHTML = `${newWallet.amount}$`;
            document.querySelector('.depositedHorse').innerHTML = null;
            resetHorses()

        }
    }, 500);

}


const depostiButton = document.querySelector(".deposit");
const startButton = document.querySelector('.startButton');

depostiButton.addEventListener('click', () => {
    const horsesDropdown = document.querySelector('#horsesDropdown').value;
    const moneyAmount = document.querySelector('#amount').value;
    switch (horsesDropdown) {
        case "horse1":
            newWallet.deposit(moneyAmount, horse1);
            break;
        case "horse2":
            newWallet.deposit(moneyAmount, horse2);
            break;
        case "horse3":
            newWallet.deposit(moneyAmount, horse3);
        case "none":
            break;

    }

}

)
startButton.addEventListener('click', startRace);