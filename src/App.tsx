import React, {useState} from 'react';
import './App.css';
import CompetitionSelection from "./components/CompetitionSelection";
import {Match} from "./api/GetMatchesFromApi";
import MatchesList from "./components/MatchesList";
import {Typography} from "@mui/material";

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
            <Typography variant="body1" align="left">Competitions</Typography>
            <CompetitionSelection competitions={competitions} setCompetitions={setCompetitions} />
            <Typography variant="body1" align="left">Matches</Typography>
            <MatchesList matches={matches} setMatches={setMatches} competitions={competitions} setCompetitions={setCompetitions}/>
        </div>
    );
}

export default App;
