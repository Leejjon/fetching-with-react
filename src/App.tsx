import React, {useReducer, useState} from 'react';
import './App.css';
import CompetitionSelection from "./components/CompetitionSelection";
import {Match} from "./api/GetMatchesFromApi";
import MatchesList from "./components/MatchesList";
import {Typography} from "@mui/material";

export interface CompetitionProps {
    competitionsState: CompetitionsState;
    dispatch: (action: CompetitionsUpdateAction) => void;
}

export interface MatchesProps {
    matches: Array<Match>;
    setMatches: (matches: Array<Match>) => void;
}

export enum CompetitionsUpdateActionType {
    ADD,
    REMOVE,
}

interface CompetitionsUpdateAction {
    type: CompetitionsUpdateActionType;
    competition: number;
}

export interface CompetitionsState {
    competitions: Array<number>;
}

export const allCompetitions = [2003, 2021];

function App() {

    function competitionReducer(state: CompetitionsState, action: CompetitionsUpdateAction) {
        const {type, competition} = action;
        switch (type) {
            // TODO: Reducer is broken.
            case CompetitionsUpdateActionType.ADD:
                // TODO: Could add validation to prevent double competitions in the array. But one would have to hack using developer tools to screw this up.
                state.competitions.push(competition);
                return {
                    competitions: state.competitions
                } as CompetitionsState;
            case CompetitionsUpdateActionType.REMOVE:
                return {
                    competitions: state.competitions.filter((competitionIterator) => competitionIterator !== competition)
                } as CompetitionsState
            default:
                return state;
        }
    }

    const [competitionsState, dispatch] = useReducer(competitionReducer, {competitions: allCompetitions} as CompetitionsState);
    const [matches, setMatches] = useState<Array<Match>>([]);

    return (
        <div className="App">
            <Typography variant="body1" align="left">Competitions {competitionsState.competitions.length}</Typography>
            <CompetitionSelection competitionsState={competitionsState} dispatch={dispatch} />
            <Typography variant="body1" align="left">Matches</Typography>
            <MatchesList matches={matches} setMatches={setMatches} competitionsState={competitionsState} dispatch={dispatch}/>
        </div>
    );
}

export default App;
