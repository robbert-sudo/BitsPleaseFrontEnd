import React, {useEffect, useState} from "react";
import axios from "axios";
import './AdminPageDeletedUsers.css'

function AdminPageDeletedUsers() {

    const [userData, toggleUserData] = useState([]);
    const [deleted, toggleDeleted] = useState(false);

    useEffect(()=> {

        async function fetchDeletedUsers() {
            toggleDeleted(false);
            const source = axios.CancelToken.source();
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get('http://localhost:8080/admin/deletedusers', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });

                console.log(result.data);
                toggleUserData(result.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchDeletedUsers();
    },[deleted]);


    async function handleDelete(username) {
        const source = axios.CancelToken.source();
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:8080/admin/delete/${username}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                cancelToken: source.token,
            });

            toggleDeleted(true);
        } catch (e) {
            console.error(e);
        }

    }




    const mapUserData = userData && userData.map((user, pos) =>
    <article className="deletedusers" key={pos}>
        <p>name: {user.username}</p>
        <p>user_id: {user.user_id}</p>
        <p>enabled: { (user.enabled) ? "true" : "false" }</p>
        <button
            type="button"
            className="deletebutton"
            onClick={()=> handleDelete(user.username)}
        >
            verwijder deze gebruiker
        </button>
    </article>
    )

    return (
        <>
            <header className="disabled accounts">
                disabled accounts
            </header>
            {mapUserData}
        </>
    );

}

export default AdminPageDeletedUsers;