import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

// voor elke role toegankelijk is niet de bedoeling

function AdminPage() {
    const history = useHistory();
    const [isAdmin, toggleIsAdmin] = useState();

    const {user} = useContext(AuthContext);

    // useEffect(()=> {
    //     console.log(user);
    //     console.log(user.authorities.length);
    //
    //     adminCheck();
    //
    //     updatePage();
    //
    // },[])
    //
    //
    // function adminCheck() {
    //     if (user) {
    //         for (let i = 0; i < user.authorities.length; i++) {
    //             if (user.authorities && user.authorities[i].authority === 'ROLE_ADMIN') {
    //                 toggleIsAdmin(true);
    //             }
    //         }
    //     } else {
    //         toggleIsAdmin(false);
    //     }
    //     console.log(isAdmin);
    // }
    //
    //
    //
    //
    // function updatePage() {
    //     console.log(isAdmin);
    //     if (!isAdmin) {
    //         history.push("/");
    //     }
    // }



    return (
        <>
            <button
                onClick={()=> history.push("/adminpage/users")}

            >
                Bekijk alle gebruikers
            </button>
            <button
                onClick={()=> history.push("/adminpage/deletedusers")}
            >
                Verwijder gebruiker
            </button>
        </>

    );
}

export default AdminPage;