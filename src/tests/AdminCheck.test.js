const {adminCheck}  = require("../pages/AdminCheck");
// import {adminCheck} from "../pages/AdminCheck";
 test("adminCheck geeft true terug", ()=> {

    //arrange



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


    // act
    const admin = adminCheck(user);

    //assert
    expect(admin).toBe(true);

});

test("adminCheck geeft false terug", ()=> {
    //arrange
    const user =
    {
        "user_id": 2,
        "username": "user",
        "enabled": true,
        "email": "user@useless.com",
        "authorities": [
        {
            "user_id": 2,
            "authority": "ROLE_USER",
            "username": "user"
        }
    ]
    }

    //act
    const admin = adminCheck(user);

    //assert
    expect(admin).toBe(false);

})