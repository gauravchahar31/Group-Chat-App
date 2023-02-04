import express from 'express';
import path from 'path';

declare module 'express' {
  interface Request {
    user?: any;
  }
}

const homePage = (req: express.Request, res: express.Response) => {
    try{
        if(req.user){
            res.send('Home Page');
            res.status(200).sendFile(path.join(__dirname, '../views/home/homePage.html'));
        }
        else{
            res.redirect('/login');
        }
    }
    catch(err){
    console.log(err);
    res.status(500).send('Internal Server Error');
    }
}

const loginPage = async (req: express.Request, res: express.Response) => {
    try{ 
       if(req.user){
           res.redirect('/');
       }
       res.status(200).sendFile(path.join(__dirname, '../views/login/loginPage.html'));
    }
    catch(err){
       console.log(err);
       res.status(500).send('Internal Server Error');
    }
}

const signupPage = async (req: express.Request, res: express.Response) => {
    try{ 
        if(req.user){
            res.redirect('/');
        }
        res.status(200).sendFile(path.join(__dirname, '../views/signup/signupPage.html'));
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const forgotPassword = async (req: express.Request, res: express.Response) => {
    try{
        if(req.user){
            res.redirect('/');
        }
        else{
            res.status(200).sendFile(path.join(__dirname, '../views/passwordHandlers/forgotPassword.html'));
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json(null);
    }
}
 
const logout = (req: express.Request, res: express.Response) => {
    try{
        res.clearCookie('user');
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

export {
    homePage,
    loginPage,
    signupPage,
    forgotPassword,
    logout
}