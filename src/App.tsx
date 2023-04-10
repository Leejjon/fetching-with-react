import React, {useState} from 'react';
import './App.css';
import {getMatchesFromApi, Match} from "./api/GetMatchesFromApi";
import {NavLink, Outlet} from "react-router-dom";
import {routes, SingleRouteInformationPair} from "./routing/Routes";
import {QueryClient} from "@tanstack/react-query";

export interface CompetitionProps {
    competitions: Array<number>;
    setCompetitions: (competitions: Array<number>) => void;
}

export interface MatchesProps {
    matches: Array<Match>;
    setMatches: (matches: Array<Match>) => void;
}

export const allCompetitions = [2003, 2021];


function App() {
    const [competitions, setCompetitions] = useState<Array<number>>(allCompetitions);

    return (
        <div className="App">
            <nav>
                {Object.entries(routes).map((route) => {
                    const [key, value] = route;
                    return (<NavLink key={key} to={key} className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                    }>{value.title}</NavLink>);
                })}
            </nav>
            {/*https://stackoverflow.com/questions/70027979/passing-props-to-outlet-when-nestining-routes-in-react-router-v6*/}
            <Outlet />
        </div>
    );
}

export default App;
