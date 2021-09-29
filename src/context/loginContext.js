import React, { useState, useEffect } from 'react'
import superagent, { saveCookies } from 'superagent';
import base64 from 'base-64';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';

export const LoginContext = React.createContext();
const API = 'https://ibrahem-todo-server.herokuapp.com';
// 2- create a component that will have the provider
export default function LoginProvider(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    // token will be saved in the cookies after login

    const login = async (username, password) => { // from login form
        // update loggedIn = true
        // go to the backend API by doing POST request and send Basic Auth username and password
        // get a token back from the API response .. add it on the response cookies
        try {
            const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`)
            console.log(response.body);
            validateMyToken(response.body.token);
        } catch (err) {
            console.log(err);
        }
    }
    const signUp = async (username, password, role) => { // from login form
        // update loggedIn = true
        // go to the backend API by doing POST request and send Basic Auth username and password
        // get a token back from the API response .. add it on the response cookies

        try {
            let obj = {
                username: username,
                password: password,
                role: role
            }
            const response = await superagent.post(`${API}/signup`, obj);
            console.log(response.body);
            validateMyToken(response.body.token);
        } catch (err) {
            console.log(err);
        }
    }

    // initial render
    useEffect(() => {
        const myTokenCookie = cookie.load('token'); // read the cookie from browser
        console.log("myTokenCookie: ", myTokenCookie)
        console.log("initial render here !!");
        validateMyToken(myTokenCookie);
    }, []);

    function validateMyToken(token) {
        if (token) {
            const user = jwt.decode(token); // get user object and info
            // NOTE: adding it hardcoded because our API doesnt have it 

            setLoginState(true, user);
            cookie.save('token', token);
            // add the token as a cookie in your API response , add time expiry 
        } else {
            setLoginState(false, {});
        }
    }



    const setLoginState = (isLoggedIn, user) => {
        setLoggedIn(isLoggedIn);
        setUser(user);
    }

    const logout = () => {
        setLoggedIn(false);
        setUser({});
        cookie.remove('token');
    }

    const state = {
        loggedIn: loggedIn,
        login: login,
        logout: logout,
        user: user,
        signUp: signUp
    }


    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}