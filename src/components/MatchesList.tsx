import {CompetitionProps, MatchesProps} from "../App";
import React, {useEffect} from "react";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";
import {List, ListItem, Typography} from "@mui/material";

function MatchesList({matches, setMatches, competitions}: MatchesProps & CompetitionProps) {

    useEffect(() => {
        if (!matches || matches.length === 0) {
            console.log("Fetching");
            getMatchesFromApi(competitions).then(matches => setMatches(matches));
        }
    }, [competitions, matches, setMatches]);
    

    return (
        <>
            <Typography variant="body1" align="left">Matches</Typography>
            <List>
                {matches.map((match) => {
                   return (
                       <ListItem key={match.id}>{match.homeTeam.shortName} - {match.awayTeam.shortName}</ListItem>
                   );
                })}
            </List>
        </>
    );
}

export default MatchesList;
