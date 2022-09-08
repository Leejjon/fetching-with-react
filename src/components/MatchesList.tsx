import {CompetitionProps, MatchesProps} from "../App";
import {useEffect} from "react";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";

function MatchesList({matches, setMatches, competitionsState}: MatchesProps & CompetitionProps) {

    useEffect(() => {
        getMatchesFromApi(competitionsState.competitions).then(newMatches => {
            setMatches(newMatches);
        });
    }, [competitionsState, setMatches]);

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
