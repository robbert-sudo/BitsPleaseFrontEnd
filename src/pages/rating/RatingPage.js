import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function RatingPage() {

    const {uploaderId} = useParams();
    const [toBeRated, toggleToBeRated] = useState(null);
    const [rating, toggleRating] = useState(8);
    const [voted, toggleVoted] = useState(false);
    const source = axios.CancelToken.source();



    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchName() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(`http://localhost:8080/user/id/${uploaderId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });
                toggleToBeRated(result.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchName();
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    async function handleRatingSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:8080/sellerratings', {
                "ratedUserId": uploaderId,
                "rating": rating,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                cancelToken: source.token,
            });
            toggleVoted(true);
        } catch (e) {
            console.error(e);
        }


    }

    return (
        <>
            {voted ?
                <h1>BEDANKT VOOR UW STEM</h1>
                :
                <div>
                    <h1>Rating</h1>
                    {toBeRated && <h1>username: {toBeRated.ratedUsername}</h1>}
                    <h1>{uploaderId}</h1>
                    {toBeRated && <form className="rating"
                                        onSubmit={handleRatingSubmit}
                    >
                        <h2>geef {toBeRated.ratedUsername} een cijfer</h2>
                        <select name="ratingcijfer"
                                defaultValue="8"
                                onChange={(e) => toggleRating(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <button
                            type="submit"
                        >
                            rating verzenden
                        </button>
                    </form>
                    }
                </div>
            }
        </>
    );
}

export default RatingPage;