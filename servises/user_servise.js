const path = require('path');
const fs = require('fs/promises');

const userFile = path.join(process.cwd(), 'dataBase', 'user.json');

exports.read = async () => {
    let data = await fs.readFile(userFile, 'utf-8');
    return JSON.parse(data);
}

exports.write = async (data) => {
    await fs.writeFile(userFile, JSON.stringify(data));
}
