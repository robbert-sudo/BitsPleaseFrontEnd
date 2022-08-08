import React, {useContext} from "react";
import {Switch, Route, Redirect} from 'react-router';

import TopMenu from './components/TopMenu';
import Profile from "./pages/profilepage/Profile";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import './App.css';
import {AuthContext} from "./context/AuthContext";
import Games from "./pages/gamepage/Games";
import UploadGame from "./pages/gamepage/UploadGame";
import CheckOut from "./pages/CheckOut";
import GamesLandingPage from "./pages/gamepage/GamesLandingPage";
import GamesByName from "./pages/gamepage/GamesByName";
import FullGame from "./pages/gamepage/FullGame";
import AdminPage from "./pages/adminpage/AdminPage";
import RatingPage from "./pages/RatingPage";
import AdminPageUsers from "./pages/adminpage/AdminPageUsers";
import EditProfile from "./pages/EditProfile";
import AdminPageDeletedUsers from "./pages/adminpage/AdminPageDeletedUsers";
import GamesBySystem from "./pages/gamepage/GamesBySystem";
import MyGames from "./pages/gamepage/MyGames";
import ProfileEdit from "./pages/profilepage/ProfileEdit";

function App() {
    const {isAuth} = useContext(AuthContext);

    const {admin} = useContext(AuthContext);

    console.log(admin);


    return (
        <>
            <TopMenu/>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/profile">
                        {isAuth ? <Profile/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/profile/edit">
                        {isAuth ? <ProfileEdit/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/signin">
                        <SignIn/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp/>
                    </Route>
                    <Route exact path="/games">
                        {isAuth ? <Games/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/uploadgame">
                        {isAuth ? <UploadGame/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/checkout">
                        <CheckOut/>
                    </Route>
                    <Route exact path="/gameslandingpage">
                        {isAuth ? <GamesLandingPage/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/mygames/:uploader">
                        {isAuth ? <MyGames/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/gamesbyname">
                        {isAuth ? <GamesByName/> : <Redirect to="/"/>}
                    </Route>
                    <Route path="/fullgamepage/:gameId">
                        {isAuth ? <FullGame/> : <Redirect to="/"/>}
                    </Route>
                    <Route exact path="/adminpage"
                           render={() => (admin ? <AdminPage/> : <Redirect to={""}/>)}
                    >
                    </Route>
                    <Route exact path="/adminpage/users"
                           render={() => (admin ? <AdminPageUsers/> : <Redirect to={""}/>)}
                    >
                    </Route>
                    <Route exact path="/adminpage/deletedusers"
                           render={() => (admin ? <AdminPageDeletedUsers/> : <Redirect to={""}/>)}
                    >
                    </Route>
                    <Route path="/rating/:uploaderId">
                        <RatingPage/>
                    </Route>
                    <Route exact path="/deleteprofile">
                        <EditProfile/>
                    </Route>
                    <Route exact path="/gamesbysystem">
                        {isAuth ? <GamesBySystem/> : <Redirect to="/"/>}
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;