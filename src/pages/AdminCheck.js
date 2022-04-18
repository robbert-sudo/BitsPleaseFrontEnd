import React from "react";


const user = {
    "user_id": 1,
    "username": "admin",
    "enabled": true,
    "email": "admin@yoohoo.com",
    "authorities": [
        {
            "user_id": 1,
            "authority": "ROLE_USER",
            "username": "admin"
        },
        {
            "user_id": 1,
            "authority": "ROLE_ADMIN",
            "username": "admin"
        }
    ]
};

function adminCheck(user) {


    let admin = false;

    if (user) {
        for (let i = 0; i < user.authorities.length; i++) {
            if (user.authorities && user.authorities[i].authority === 'ROLE_ADMIN') {
                admin = true;
            }
        }
    } else {
        admin = false;
    }
    return admin;

}

module.exports = {
    adminCheck: adminCheck
}

export default adminCheck;