const fs = require("fs-extra");

const readData = (filePath) => {
    return fs.readJsonSync(filePath, { throws: false }) || [];
};

const writeData = (filePath, data) => {
    fs.writeJsonSync(filePath, data, { spaces: 2 });
};

module.exports = {
    readData,
    writeData
};