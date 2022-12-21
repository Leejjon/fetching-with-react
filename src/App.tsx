import React, {useState} from 'react';
import './App.css';
import CompetitionSelection from "./components/CompetitionSelection";
import {Match} from "./api/GetMatchesFromApi";
import MatchesList from "./components/MatchesList";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import MatchesList2 from "./components/MatchesList2";

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
    const [matches, setMatches] = useState<Array<Match>>([]);
    return (
        <div className="App">
            <BrowserRouter>
                <Link to="/">Home</Link>
                <Link to="/competitions">Competitions</Link>
                <Link to="/matches">Matches</Link>
                <Link to="/matches2">Matches2</Link>
                <br />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/competitions" element={<CompetitionSelection competitions={competitions} setCompetitions={setCompetitions} />}/>
                    <Route path="/matches" element={<MatchesList matches={matches} setMatches={setMatches} competitions={competitions} setCompetitions={setCompetitions}/>}/>
                    <Route path="/matches2" element={<MatchesList2 matches={matches} setMatches={setMatches} competitions={competitions} setCompetitions={setCompetitions}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
