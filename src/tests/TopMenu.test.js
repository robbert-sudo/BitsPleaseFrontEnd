import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext";



test("kijk of localstorage leeg is na uitloggen voorbereiding",
    () => {
        localStorage.setItem('token', "fakeToken");
        expect(localStorage.getItem('token')).toBe("fakeToken");
    }
);


// const {logout} = useContext(AuthContext);
test("kijk of localstorage leeg is na uitloggen",
    () => {
        const {logout} = useContext(AuthContext);
        localStorage.setItem('token', "fakeToken");
        logout();
        expect(localStorage.getItem('token')).toBe(null);
    }
);
