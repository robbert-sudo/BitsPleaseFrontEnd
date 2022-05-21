import React, {useState} from "react";
import axios from "axios";
import GameSummary from "../components/GameSummary";

function GamesByName() {
    const [searchName, toggleSearchName] = useState("");
    const [gamesData, setGamesData] = useState([]);


    const source = axios.CancelToken.source();


    async function fetchGameByNameContain(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const result = await axios.get(`http://localhost:8080/games?name=${searchName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cancelToken: source.token,
            });
            setGamesData(result.data);
            // console.log(gamesData);
            console.log(result.data);

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div>
            <div className="bars">
                <form
                    onSubmit={fetchGameByNameContain}>
                    <input className="searchbar"
                           type="text"
                           onChange={(e) => toggleSearchName(e.target.value)}
                           placeholder="zoek game op naam"
                    />
                    <button className="searchbutton"
                            type="submit">
                        nu zoeken
                    </button>
                </form>

            {gamesData && gamesData.map((item) => <GameSummary game={item} key={item.id}/>)}
            </div>
        </div>
    );
}

export default GamesByName;