import React, {useEffect, useState} from "react";
import './FullGame.css';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import GamePageButtonsContainer from "./gamepagecomponents/GamePageButtonsContainer";
import {Card} from "reactstrap";


function FullGame() {



    const history = useHistory()
    const {gameId} = useParams();
    const [gameData, setGameData] = useState();
    const [userAverage, toggleUserAverage] = useState();

    useEffect(() => {

        const source = axios.CancelToken.source();


        async function fetchGameDataById() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(`http://localhost:8080/games/id/${gameId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });

                setGameData(result.data);
                console.log(result.data);

            } catch (e) {
                console.error(e);
            }

        }

        fetchGameDataById();

    }, [gameId])


    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchUploaderRating(gameData) {
            const token = localStorage.getItem('token');
            if (gameData) {
                try {
                    const average = await axios.get(`http://localhost:8080/sellerratings/getaverage/${gameData.uploader}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        cancelToken: source.token,
                    });

                    const averageWithTwoDecimals = (average.data).toFixed(1);
                    toggleUserAverage(averageWithTwoDecimals);
                    console.log(average.data);


                } catch (e) {
                    console.error(e);
                }
            }
        }

        fetchUploaderRating(gameData);
    }, [gameData])





    function goToRating() {
        history.push(`/rating/${gameData.uploader}`);
    }



    return (

        <>
            <GamePageButtonsContainer/>
            {gameData &&
            <Card className="fullgame"
            >
                <figure className="container">
                    {gameData.image && <img className="fullgamepic" src={gameData.image} alt="gamepicture"/>}
                </figure>
                <section className="gameinfo">
                    <h1>{gameData.name}</h1>
                    <p>Id: {gameData.id}</p>
                    <p>System: {gameData.system}</p>
                    <p>Developer: {gameData.developer}</p>
                    <p className="price">prijs: &euro; {(gameData.price).toFixed(2)}</p>
                </section>
                <section className="sellerinfo">
                    <p>Uploader: {gameData.uploader_name}</p>

                    <p>gemiddelde rating van deze gebruiker</p>
                    <p>{userAverage}/10</p>
                    <button className="votebutton"
                            onClick={goToRating}
                    >
                        stem op deze gebruiker</button>
                </section>
            </Card>}
        </>
    );
}

export default FullGame;