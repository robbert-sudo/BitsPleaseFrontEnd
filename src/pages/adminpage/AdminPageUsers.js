import React, {useEffect, useState} from "react";
import axios from "axios";
import './AdminPageUsers.css';

function AdminPageUsers() {
    const [userData, setUserData] = useState();

    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchUserData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(`http://localhost:8080/users`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });
                setUserData(result.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchUserData();
    }, [])


    return (
        <>
            {userData && userData.map((userData, pos) =>
                <article key={pos}>
                    <p>user_id: {userData.user_id}</p>
                    <p>username: {userData.username}</p>
                </article>
            )}
        </>
    );


}

export default AdminPageUsers;