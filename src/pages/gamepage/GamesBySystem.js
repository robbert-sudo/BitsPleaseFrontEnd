import React, {useState} from "react";
import axios from "axios";
import GameSummary from "../../components/GameSummary";
import GamePageButtonsContainer from "./gamepagecomponents/GamePageButtonsContainer";

function GamesBySystem() {
    const [systemName, setSystemName] = useState(null);
    const [gameName, setGameName] = useState("");
    const [gamesData, setGamesData] = useState([]);

    const source = axios.CancelToken.source();

    async function fetchGameBySystem(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const result = await axios.get(`http://localhost:8080/games/systemandname/${systemName}?name=${gameName}`, {
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
            <GamePageButtonsContainer />
            <div className="bars">
                <select name="system"
                        onChange={(e) => setSystemName(e.target.value)}
                        >
                    <option>kies systeem</option>
                    <option value="gameboy">gameboy</option>
                    <option value="nes">nes</option>
                    <option value="snes">snes</option>
                    <option value="megadrive">megadrive</option>
                    <option value="dreamcast">dreamcast</option>
                    <option value="gamecube">gamecube</option>
                    <option value="gameboyadvance">gameboy advance</option>
                </select>
        <form
            onSubmit={fetchGameBySystem}>
            <input className="searchbar"
                   type="text"
                   onChange={(e) => setGameName(e.target.value)}
                   placeholder="zoek game op systeem"
            />
            <button className="searchbutton"
                    type="submit">
                nu zoeken
            </button>
        </form>
        </div>
            {gamesData && gamesData.map((item) => <GameSummary game={item} key={item.id}/>)}
        </>
    );
}

export default GamesBySystem;