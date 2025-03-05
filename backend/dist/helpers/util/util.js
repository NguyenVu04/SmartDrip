"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswordHelper = exports.hashPasswordHelper = void 0;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPasswordHelper = async (plainPassword) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds);
    }
    catch (error) {
        console.log(error);
    }
};
exports.hashPasswordHelper = hashPasswordHelper;
const comparePasswordHelper = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
    catch (error) {
        console.log(error);
    }
};
exports.comparePasswordHelper = comparePasswordHelper;
//# sourceMappingURL=util.js.map