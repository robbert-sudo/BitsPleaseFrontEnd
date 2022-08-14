import React, {useEffect, useState} from "react";
import axios from "axios";
import GamesApi from "../../api's/GamesApi";
import GameSummary from "../../components/GameSummary";
import GamePageButtonsContainer from "./gamepagecomponents/GamePageButtonsContainer";
import "./GamesByName.css";
import SearchBarWithButton from "../../components/SearchBarWithButton";


function GamesByName() {
    const [searchName, toggleSearchName] = useState("");
    const [gamesData, setGamesData] = useState([]);

    const source = axios.CancelToken.source();


    //haalt alle games uit database op, alleen tijdens eerste render
    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchGamesData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(GamesApi, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });
                setGamesData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchGamesData();
    }, [])


    //zoekopdracht naar games waarvan de zoekopdracht in de naam voorkomt.
    async function fetchGameByNameContain(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const result = await axios.get(GamesApi + `?name=${searchName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cancelToken: source.token,
            });
            setGamesData(result.data);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>

            <GamePageButtonsContainer/>

            <div className="searchbar-container">
                <SearchBarWithButton onsubmitAction={fetchGameByNameContain} onChangeAction={(e) => toggleSearchName(e.target.value)} placeHolderText="zoek game op naam"/>
            </div>
            {gamesData && gamesData.map((item) => <GameSummary game={item} key={item.id}/>)}
        </>
    );
}

export default GamesByName;