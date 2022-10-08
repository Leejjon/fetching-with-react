import React, {useState} from 'react';
import './App.css';
import CompetitionSelection from "./components/CompetitionSelection";
import {Match} from "./api/GetMatchesFromApi";
import MatchesList from "./components/MatchesList";
import {Typography} from "@mui/material";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export interface CompetitionProps {
    competitions: Array<number>;
    setCompetitions: (competitions: Array<number>) => void;
}

export const allCompetitions = [2003, 2021];

const matchesQueryClient = new QueryClient();

function App() {
    const [eredivisie, setEredivisie] = useState(true);
    const [competitions, setCompetitions] = useState<Array<number>>(allCompetitions);
    return (
        <div className="App">
            <QueryClientProvider client={matchesQueryClient}>
                <Typography variant="body1" align="left">Competitions</Typography>
                <CompetitionSelection competitions={competitions} setCompetitions={setCompetitions} />
                <Typography variant="body1" align="left">Matches</Typography>
                <MatchesList competitions={competitions} setCompetitions={setCompetitions}/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
