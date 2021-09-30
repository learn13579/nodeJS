const fs = require('fs');
const path = require('path');

console.log(__dirname);
console.log(__filename);

fs.mkdir (path.join(__dirname,'men'), {recursive: true}, (err)=>{
    if (err) {
        console.log(err);
    }
} );

fs.mkdir (path.join(__dirname,'women'), {recursive: true}, (err)=>{
    if (err) {
        console.log(err);
    }
} );

const users = [
    {name: 'Olya',   gender: 'female', age: 29},
    {name: 'Tonya',  gender: 'female', age: 19},
    {name: 'Solya',  gender: 'female', age: 23},
    {name: 'Kolya',  gender: 'male',   age: 18},
    {name: 'Ivan',   gender: 'male',   age: 33},
    {name: 'Jenya',  gender: 'male',   age: 45},
    {name: 'Max',    gender: 'male', age: 17},
    {name: 'Nadya',  gender: 'female', age: 12},
    {name: 'Oleg',   gender: 'male',   age: 37},
    {name: 'Mariya', gender: 'female', age: 28},
];

const men = path.join(__dirname, 'users', 'men');
const women = path.join(__dirname, 'users', 'women');

for (const user of users) {
    if (user.gender==="male"){
        fs.writeFile(path.join(__dirname,'men',`${user.name}.txt`), `${user.name}, ${user.gender} ${user.age}`, (err)=>{
            if (err){
                console.log(err);
            }
        })
    }
     if (user.gender==="female"){
        fs.writeFile(path.join(__dirname,'women',`${user.name}.txt`), `${user.name}, ${user.gender} ${user.age}`, (err)=>{
            if (err){
                console.log(err);
            }
        })
    }
}
