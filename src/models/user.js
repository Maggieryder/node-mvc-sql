const fs = require('fs');
const path = require('path');

const usersFile = path.join(path.dirname(process.mainModule.filename), '..', 'data', 'users.json');

const getUsersFromFile = (cb) => { 
    fs.readFile(usersFile, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class User {
    constructor(u) {
        this.username = u;
    }

    save() {
        getUsersFromFile(users => {
            users.push(this);
            fs.writeFile(usersFile, JSON.stringify(users), err => {
                console.log('error:', err)
            });
        })
    }

    static fetchAll(cb) {
        getUsersFromFile(cb);
    }
}