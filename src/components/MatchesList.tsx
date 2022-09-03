import {CompetitionProps, MatchesProps} from "../App";
import {useEffect} from "react";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";

function MatchesList({matches, setMatches, competitions}: MatchesProps & CompetitionProps) {

    useEffect(() => {
        console.log("Fetching");
        getMatchesFromApi(competitions).then(matches => setMatches(matches));
    }, [competitions, setMatches]);

    return (
        <List>
            {matches.map((match) => {
               return (
                   <ListItem key={match.id}>{match.homeTeam.shortName} - {match.awayTeam.shortName}</ListItem>
               );
            })}
        </List>
    );
}

export default MatchesList;
