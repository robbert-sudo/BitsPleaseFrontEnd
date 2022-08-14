import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {Card} from "reactstrap";
import MenuButton from "../../components/MenuButton";


function Profile() {
    const history = useHistory();
    const {user} = useContext(AuthContext);

    const [admini, toggleAdmini] = useState(false);
    const [profileData, setProfileData] = useState({
        username: null,
        email: null,
        authorities: [],
        user_id: null,
    });

    function adminCheck() {
        if (user) {
            for (let i = 0; i < user.authorities.length; i++) {
                if (user.authorities && user.authorities[i].authority === 'ROLE_ADMIN') {
                    toggleAdmini(true);
                }
            }
        } else {
            toggleAdmini(false);
        }
    }


    useEffect(() => {
        adminCheck();

        const source = axios.CancelToken.source();

        //haal de pagina content op in de mounting-cycle
        async function fetchProfileData() {
            // haal de token uit de local storage om in het GET-request te bewijzen dat we geauthoriseert zijn
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
                    username: result.data.username,
                    email: result.data.email,
                    authorities: result.data.authorities,
                    user_id: result.data.user_id,
                });
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfileData();


        return function cleanup() {
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const authorityList = profileData.authorities && profileData.authorities.map((item, pos) => {
        return (
            <div key={pos}>
                <h1>{item.authority}</h1>
            </div>
        );
    })


    return (
        <>
            <section className="profile-page">
                <h1>Profielpagina</h1>
                <Card className="profile-card">
                    <h2>Gegevens</h2>
                    <p><strong>Gebruikersnaam:</strong> {profileData.username} </p>
                    <p><strong>User_id: </strong> {profileData.user_id} </p>
                    <p><strong>Email: </strong> {profileData.email}</p>
                    <p><strong>Authorities: </strong></p>
                    {authorityList}
                </Card>
                <nav>Terug naar de <Link to="/">Homepagina</Link></nav>

                <MenuButton className="button" clickAction={() => history.push("profile/edit")}
                            text="mijn profiel aanpassen"/>
            </section>

            {!admini ? <>

                <MenuButton className="button" clickAction={() => history.push("deleteprofile")}
                            text="Mijn profiel verwijderen" />

            </> : <> </>}
        </>
    );


}

export default Profile;