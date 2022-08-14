import React, {useContext} from 'react';
import logo from '../assets/logo_bits_please.svg'
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import './TopMenu.css'
import SystemButton from "./SystemButton";
import MenuButton from "./MenuButton";

function TopMenu() {
    const history = useHistory();
    const {isAuth, logout, admin} = useContext(AuthContext);



    return (

        <div className="topMenu">
            <Link to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                </span>
            </Link>
            <div className="systemchoises">


                {/*systembutton heeft geen clickAction*/}
                <MenuButton className="system-button" text="GAMEBOY/ADVANCE" />
                {/*<SystemButton text="GAMEBOY/ADVANCE"/>*/}
                <SystemButton text="NES"/>
                <SystemButton text="SNES"/>
                <SystemButton text="GAMECUBE"/>
                <SystemButton text="MEGA DRIVE"/>
                <SystemButton text="DREAMCAST"/>
                <SystemButton text="PSONE"/>

            </div>


            {admin ?
                <MenuButton clickAction={() => history.push("/adminpage")} text="admin page" />
                : <></>}
            {isAuth ?
                <div>
                    <MenuButton clickAction={logout} text="Log uit" />
                    <MenuButton clickAction={()=> history.push("/gamesbyname")} text="Ga naar games" />
                    <MenuButton clickAction={() => history.push("/profile")} text="Mijn profiel" />
                </div>
                :
                <div>
                    <MenuButton clickAction={() => history.push("/signin")} text="Log in" />
                    <MenuButton clickAction={() => history.push("/signup")} text="Registreren" />
                </div>}
        </div>
    );
}

export default TopMenu;