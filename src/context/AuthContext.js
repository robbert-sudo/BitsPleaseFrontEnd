import React, {createContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        admin: false,
        status: 'pending',
    });

    const history = useHistory();

    //mounting effect
    useEffect(() => {
        // haal jwt op uit de local storage
        const token = localStorage.getItem('token');
        //console.log('authcontexts useeffect');

        //als er een token is, wordt gebruikers data opgehaald
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
            // adminCheck();
        } else {
            //als er geen token is doen we niks, en zetten we status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: null,
                admin: false,
                status: 'done',
            });

        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    function login(JWT) {
        //zet token in de local storage
        localStorage.setItem('token', JWT);

        // decode de token zodat we de id(username) van de gebruiker hebben en data kunnen ophalen voor de context
        const decoded = jwt_decode(JWT);
        console.log(decoded);
        console.log(decoded.sub);

        // op basis van die informatie kunnen we de gebruikersgegevens ophalen via een GET-request



        // gebruikersdata in de state plaatsen

        //geef de ID, token en redirect-link mee aan de fetchData functie decoded.sub=username
        fetchUserData(decoded.sub, JWT, `/profile`); //decoded.payload.sub payload ertussenuit gehaald.


        // link de gebruiker door naar de profielpagina
        // history.push('/profile');

    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            admin: false,
            status: 'done',
        });

        console.log("Gebruiker is uitgelogd.");
        history.push("/");
    }

    //checkt of user admin-rechten heeft. dit wordt meegegeven aan de context data
    function adminCheck(result) {
        let admin = false;
        if (result) {
            for (let i = 0; i < result.data.authorities.length; i++) {
                if (result.data.authorities && result.data.authorities[i].authority === 'ROLE_ADMIN' ) {
                    admin = true;
                }
            }
        } else {
            admin = false;
        }
        return admin;
    }


    // omdat fetchUserData in login- en mounting effect wordt gebruikt, is hij hier gedeclareert
    async function fetchUserData(id, token, redirectUrl) {
        let admin = false;


        try {
            // haal gebruikersData op met de token en id(username) van de gebruiker
            const result = await axios.get(`http://localhost:8080/user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            console.log(result.data);
            console.log(result.data.username);
            console.log(result.data.authorities);
            //check of de gebruiker admin rechten heeft en sla dit op als boolean in let admin
           admin = adminCheck(result);




            // zet de gegevens in de state
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    user_id: result.data.user_id,
                    username: result.data.username,
                    enabled: result.data.enabled,
                    authorities: result.data.authorities
                },
                admin: admin,
                status: 'done',
            });



            // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we daar naartoe
            // als we de history.push in de login-functie zouden zetten, linken we door voor de gebruiker is opgehaald!
            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            // ging er iets mis? Dan plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                admin: false,
                status: 'done',

            });
        }
    }



    const contextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        admin: isAuth.admin,
        login: login,
        logout: logout,

    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
