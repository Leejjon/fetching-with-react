import React from "react";
import {List, ListItem, Typography} from "@mui/material";
import {Match} from "../api/GetMatchesFromApi";
import { useLoaderData } from 'react-router-dom';

function MatchesList() {
    const matches: Array<Match> = useLoaderData() as Array<Match>;
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
