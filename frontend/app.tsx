import React from 'react'
import {Link, Route, Switch} from "react-router-dom";

export const App: React.FC = () => {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/second">Second</Link>
            <Switch>
                <Route path="/" exact>Home</Route>
                <Route path="/second">Second</Route>
            </Switch>
        </>
    )
}