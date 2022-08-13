import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import './GamesLandingPage.css';
import {AuthContext} from "../../context/AuthContext";

import GamePageButtonsContainer from "./gamepagecomponents/GamePageButtonsContainer";

function GamesLandingPage() {

    const {user} = useContext(AuthContext);
    const history = useHistory();





    return (
        <>
      <GamePageButtonsContainer />

        </>
    );
}

export default GamesLandingPage;