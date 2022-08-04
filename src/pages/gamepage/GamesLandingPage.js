import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import './GamesLandingPage.css';
import {AuthContext} from "../../context/AuthContext";

function GamesLandingPage() {

    const {user} = useContext(AuthContext);
    const history = useHistory()


    return (
        <>
            <button
                type="button"
                onClick={() => history.push("/games")}
            >
                bekijk alle games
            </button>
            <button className="uploadbutton"
                    type="button"
                    onClick={() => history.push("/uploadgame")}
            >
                Game uploaden
            </button>


            <button className="searchbutton"
                    type="button"
                    onClick={() => history.push("/gamesbyname")}>
                zoek game op naam
            </button>
            <button className="button"
                    type="button"
                    onClick={()=> history.push("gamesbysystem")}>
                zoek game op systeem
            </button>

            <button className="searchbutton"
                    type="button"
                    onClick={() => history.push(`mygames/${user.user_id}`)}>
                mijn geuploade games
            </button>

        </>
    );
}

export default GamesLandingPage;