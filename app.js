const fs = require('fs');
const path = require('path');

const pathMen = path.join(__dirname, 'men');
const pathWomen = path.join(__dirname, 'women');

const sortGenders = (pathToDir, gender, newPathToDir) => {
    fs.readdir(pathToDir, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(pathToDir, file), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                let genderGo = JSON.parse(data.toString()).gender;

                if (genderGo === gender) {
                    fs.rename(path.join(pathToDir, file), path.join(newPathToDir, file), (err) => {
                        console.log(err);
                    });
                }
            });
        });
    });
}

sortGenders('women', "male", pathMen);
sortGenders('men', "female", pathWomen);
