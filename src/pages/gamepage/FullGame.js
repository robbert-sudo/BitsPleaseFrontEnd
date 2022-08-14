import React, {useEffect, useState} from "react";
import './FullGame.css';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";


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
            {gameData &&
            <div className="fullgame"
            >
                <div className="im">
                    {gameData.image && <img className="fullgamepic" src={gameData.image} alt="gamepicture"/>}
                </div>
                <div className="gameinfo">
                    <h1>{gameData.name}</h1>
                    <h5>Id: {gameData.id}</h5>
                    <h5>System: {gameData.system}</h5>
                    <h5>Developer: {gameData.developer}</h5>
                </div>
                <div className="sellerinfo">
                    <h5>Uploader: {gameData.uploader_name}</h5>
                    <h1>&euro; {(gameData.price).toFixed(2)}</h1>
                    <h6>gemiddelde rating van deze gebruiker</h6>
                    <h2>{userAverage}/10</h2>
                    <button className="votebutton"
                            onClick={goToRating}
                    >
                        stem op deze gebruiker</button>
                </div>
            </div>}
        </>
    );
}

export default FullGame;