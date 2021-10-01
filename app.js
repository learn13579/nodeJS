// - у вас є масив юзрів (до 10), з такими полями наприклад - const users = [
//     { name: 'olya', gender: 'female', age: 20 }
//         ...
// ], вам потрібно написати метод який створює файлики - де назва файлику - це імя вашого юзера (наприклад - Olya.txt),
// вміст це сам ваш юзер - { name: 'olya', gender: 'female', age: 20 }
// перед тим створити 4 папки (програмно) - наприклад - manOlder20, manYounger20, womanOlder20, womanYounger20
// і розподілити ваших юзерів саме по відповідних папках

const fs = require('fs');
const path = require('path');

const users = [
    {name: 'Olya', gender: 'female', age: 29},
    {name: 'Tonya', gender: 'female', age: 19},
    {name: 'Solya', gender: 'female', age: 23},
    {name: 'Kolya', gender: 'male', age: 18},
    {name: 'Ivan', gender: 'male', age: 33},
    {name: 'Jenya', gender: 'male', age: 45},
    {name: 'Max', gender: 'male', age: 17},
    {name: 'Nadya', gender: 'female', age: 12},
    {name: 'Oleg', gender: 'male', age: 37},
    {name: 'Mariya', gender: 'female', age: 28},
];

const manOlder20 = path.join(__dirname, 'users', 'manOlder20');
const manYounger20 = path.join(__dirname, 'users', 'manYounger20');
const womanOlder20 = path.join(__dirname, 'users', 'womanOlder20');
const womanYounger20 = path.join(__dirname, 'users', 'womanYounger20');


fs.mkdir(path.join(__dirname, 'manOlder20'), {recursive: true}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    fs.mkdir(path.join(__dirname, 'manYounger20'), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        fs.mkdir(path.join(__dirname, 'womanOlder20'), {recursive: true}, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.mkdir(path.join(__dirname, 'womanYounger20'), {recursive: true}, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
});

for (const user of users) {
    if (user.age > 20 && user.gender === "male") {
        fs.writeFile(path.join(__dirname, 'manOlder20', `${user.name}.txt`), `${user.name}, ${user.gender}, ${user.age}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
    if (user.age < 20 && user.gender === "male") {
        fs.writeFile(path.join(__dirname, 'manYounger20', `${user.name}.txt`), `${user.name}, ${user.gender}, ${user.age}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
    if (user.age > 20 && user.gender === "female") {
        fs.writeFile(path.join(__dirname, 'womanOlder20', `${user.name}.txt`), `${user.name}, ${user.gender}, ${user.age}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }

    if (user.age < 20 && user.gender === "female") {
        fs.writeFile(path.join(__dirname, 'womanYounger20', `${user.name}.txt`), `${user.name}, ${user.gender}, ${user.age}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    }
}


