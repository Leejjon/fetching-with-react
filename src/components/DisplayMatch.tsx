import {Match} from "../api/GetMatchesFromApi";
import {ListItem} from "@mui/material";

export interface MatchProps {
    match: Match;
}

function DisplayMatch({match}: MatchProps) {
    return (
        <ListItem>{match.homeTeam.shortName} - {match.awayTeam.shortName}</ListItem>
    );
}

export default DisplayMatch;
