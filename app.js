const fs = require('fs');
const path = require('path');

const men = path.join(__dirname, 'users', 'men');
const women = path.join(__dirname, 'users', 'women');

console.log(__dirname);

fs.mkdir(path.join(__dirname, 'men'), {recursive: true}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    fs.mkdir(path.join(__dirname, 'women'), {recursive: true}, (err) => {
        if (err) {
            console.log(err);
        }
        sortMen(men);
        sortWomen(women);
    });
});

const sortGenders = (pathToDir) => {
  fs.readdir (pathToDir, (err, files)  => {
      if (err) {
          console.log(err);
          return;
      }
      fs.readFile(pathToDir, (err, files) => {
          if (err) {
              console.log(err);
          }
      })

      let genderGo = data.toString();

      if (genderGo.gender === male) {
          fs.rename(path.join(pathToDir, file), path.join(newPathToDir, file), (err) => {
              console.log(err);
          })
      }

  })

}

// for (const user of users) {
//     if (user.gender === "male") {
//         fs.writeFile(path.join(__dirname, 'men', `${user.name}.txt`), `${user.name}, ${user.gender} ${user.age}`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         })
//     } else if (user.gender === "female") {
//         fs.writeFile(path.join(__dirname, 'women', `${user.name}.txt`), `${user.name}, ${user.gender} ${user.age}`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         })
//     }
// }
