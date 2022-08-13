import React from "react";
import {useHistory} from "react-router-dom";
import MenuButton from "../../components/MenuButton";
import './AdminPage.css';

// voor elke rol toegankelijk is niet de bedoeling

function AdminPage() {
    const history = useHistory();




    return (
        <>
            <MenuButton clickAction={() => history.push("/adminpage/users")} text="Bekijk alle gebruikers" />

            {/*<button*/}
            {/*    onClick={()=> history.push("/adminpage/users")}*/}

            {/*>*/}
            {/*    Bekijk alle gebruikers*/}
            {/*</button>*/}

            <MenuButton clickAction={() => history.push("/adminpage/deletedusers")} text="Verwijder gebruiker" />


            {/*<button*/}
            {/*    onClick={()=> history.push("/adminpage/deletedusers")}*/}
            {/*>*/}
            {/*    Verwijder gebruiker*/}
            {/*</button>*/}
        </>

    );
}

export default AdminPage;