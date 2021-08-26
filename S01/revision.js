const firstName = 'André';
console.log(firstName);

let age = 33;
age++;

console.log(age);

const test = 1 + true;
const test2 = 125 + '9';
console.log(test);
console.log(test2);

console.log(('b' + 'a' + + 'a' + 'a'));

function displayUser(firstName, age) {
    console.log(`Bonjour je m'appelle ${firstName} et j'ai ${age} ans`);
    
}

displayUser('André', 33);

const fruits = ['Kiwi', 'Banane', 'Fraise', 'Pamplemousse', 'Mangue'];

for(let fruit of fruits) {
    console.log(fruit);
}

fruits.push('Pomme');
console.log('=====');
fruits.forEach(f => console.log(f));

const sum = (a,b) => a+b;

const result = sum(12,8);
console.log(result);

const filtre = fruits.filter(f => f.length > 6);
console.log(filtre)


const numbers =  [10, 20, 30, 40];
const MULTIPLIER = 3;

const products = numbers.map(n => n * MULTIPLIER).filter(n => n > 75).map(n => n + 9);

console.log(products);
console.log(numbers);

const spiderman = {
    hero:'Spider-Man',
    alterEgo:'Peter Parker',
    movies:[{title:'Spider-Man'},{title:'Spider-Man 2'},{title:'Spider-Man 3'}]
};

const ironman = {
    hero:'Iron-Man',
    alterEgo:'Tony Stark',
    movies:[{title:'Iron-Man'},{title:'Iron-Man 2'},{title:'Iron-Man 3'}]
};

class Avenger {
    constructor(hero, alterEgo, movies){
        this.hero = hero;
        this.alterEgo = alterEgo;
        this.movies = movies;
    }
    
    test(){
        
    }
};

const oneAvenger = new Avenger('Hulk', 'Bruce Baner', [{title:'Hulk'},{title:'Ultimate Hulk'}])
console.log(oneAvenger.hero);

console.log(spiderman.hero);