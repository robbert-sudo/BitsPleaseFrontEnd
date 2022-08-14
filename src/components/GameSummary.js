import React from "react";
import './GameSummary.css'
import {useHistory} from "react-router-dom";

function GameSummary({game}, key) {

    const history = useHistory();

    function goToFullGame() {
        history.push(`/fullgamepage/${game.id}`);
    }


    return (
            <article className="game-list"
                 onClick={goToFullGame}
                 key={key}
            >

                <figure className="imageContainer">
                    {game.image && <img className="gamePic" src={game.image} alt="gamepicture"/>}
                </figure>

                <ul className="gameStats">
                    <ol>{game.name}</ol>
                    <ol>{game.system}</ol>
                </ul>
                <div className="price">
                    <h1>&euro;{(game.price).toFixed(2)}</h1>
                </div>
            </article>
    );
}

export default GameSummary;