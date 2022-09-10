import React, {createContext, useContext, useState} from 'react';
import './App.css';
import CompetitionSelection from "./components/CompetitionSelection";
import {Match} from "./api/GetMatchesFromApi";
import MatchesList from "./components/MatchesList";
import {Typography} from "@mui/material";

export interface CompetitionsAndMatchesContextType {
    competitions: Array<number>;
    setCompetitions: (competitions: Array<number>) => void;
    matches: Array<Match>;
    setMatches: (matches: Array<Match>) => void;
}
export const allCompetitions = [2003, 2021];

export const CompetitionsAndMatchesContext = createContext<CompetitionsAndMatchesContextType>({
    competitions: allCompetitions,
    setCompetitions: (competitions: Array<number>) => {},
    matches: [],
    setMatches: (matches: Array<Match>) => {}
});

export const useCompetitionsAndMatchesContext = () => useContext(CompetitionsAndMatchesContext);

function App() {
    const [competitions, setCompetitions] = useState<Array<number>>(allCompetitions);
    const [matches, setMatches] = useState<Array<Match>>([]);
    return (
        <div className="App">
            <CompetitionsAndMatchesContext.Provider value={{ competitions, setCompetitions, matches, setMatches}}>
                <Typography variant="body1" align="left">Competitions</Typography>
                <CompetitionSelection />
                <Typography variant="body1" align="left">Matches</Typography>
                <MatchesList />
            </CompetitionsAndMatchesContext.Provider>
        </div>
    );
}

export default App;
