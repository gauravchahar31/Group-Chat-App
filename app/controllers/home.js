"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.forgotPassword = exports.signupPage = exports.loginPage = exports.homePage = void 0;
const path_1 = __importDefault(require("path"));
const homePage = (req, res) => {
    try {
        if (req.user) {
            res.send('Home Page');
            res.status(200).sendFile(path_1.default.join(__dirname, '../views/home/homePage.html'));
        }
        else {
            res.redirect('/login');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
exports.homePage = homePage;
const loginPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            res.redirect('/');
        }
        res.status(200).sendFile(path_1.default.join(__dirname, '../views/login/loginPage.html'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});
exports.loginPage = loginPage;
const signupPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            res.redirect('/');
        }
        res.status(200).sendFile(path_1.default.join(__dirname, '../views/signup/signupPage.html'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});
exports.signupPage = signupPage;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            res.redirect('/');
        }
        else {
            res.status(200).sendFile(path_1.default.join(__dirname, '../views/passwordHandlers/forgotPassword.html'));
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(null);
    }
});
exports.forgotPassword = forgotPassword;
const logout = (req, res) => {
    try {
        res.clearCookie('user');
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};
exports.logout = logout;
