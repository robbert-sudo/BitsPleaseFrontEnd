import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import MenuButton from "../../../components/MenuButton";
import './GamePageButtonContainer.css';

function GamePageButtonsContainer() {
    const history = useHistory()
    const {user} = useContext(AuthContext);



    // menuknoppen die onder het topMenu "hangen" bij alle games paginas
    return(

    <div className="gamepage-button__container">

        <MenuButton className="gamepage-button"
                    clickAction={() => history.push("/gamesbyname")} text="Zoek in alle games" />
        <MenuButton className="gamepage-button"
                    clickAction={() => history.push("/gamesbysystem")} text="Zoek op systeem" />
        <MenuButton className="gamepage-button"
                    clickAction={() => history.push(`mygames/${user.user_id}`)} text="Mijn geuploade games" />
        <MenuButton className="gamepagebutton"
                    clickAction={() => history.push("/uploadgame")} text="Game Uploaden" />
    </div>
    );
}

export default GamePageButtonsContainer;