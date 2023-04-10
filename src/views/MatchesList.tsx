import React from "react";
import {List, ListItem, Typography} from "@mui/material";
import {Match} from "../api/GetMatchesFromApi";
import {useQuery} from "@tanstack/react-query";
import {matchesQuery} from "../query/Query";

function MatchesList() {
    const {data} = useQuery({
        ...matchesQuery(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 5000,
        staleTime: 4000,
        retry: false,
    });
    const matches: Array<Match> = data ?? [];

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
