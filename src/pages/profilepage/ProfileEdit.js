import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";

function ProfileEdit() {

    const [loading, toggleLoading] = useState(false);
    const history = useHistory();


    const source = axios.CancelToken.source();
    const [email, setEmail] = useState("");
    const [profileData, setProfileData] = useState({
        username: null,
        email: null,
    });

    useEffect(() => {
        const source = axios.CancelToken.source();

        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const decoded = jwt_decode(token);
                const username = decoded.sub;
                const result = await axios.get(`http://localhost:8080/user/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });
                setProfileData({
                    user_id: result.data.user_id,
                    username: result.data.username,
                    email: result.data.email,
                    password: result.data.password,
                })
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();

        return function cleanup() {
            source.cancel();
        }
    }, [])


    async function handleEditSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.patch(`http://localhost:8080/user/2`, {
                "email": email,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                cancelToken: source.token,

            });


            history.push(`/profile`);
            // logout();

        } catch (e) {
            console.error(e);
        }
        toggleLoading(false);
    }


    return (
        <>
            <h1>profiel wijzigen</h1>
            <form className="profileEdit"
                  onSubmit={handleEditSubmit}>

                <p>Invoervelden</p>
                          <input className="reginput"
                       type="text"
                       name="email"
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder={profileData.email}
                />

                <button
                    type="submit"
                >
                    wijzig je profiel
                </button>
                {loading ? <h1>bezig met laden</h1> : <> </>}
            </form>

        </>
    )


}

export default ProfileEdit;