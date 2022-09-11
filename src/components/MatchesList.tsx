import {CompetitionProps} from "../App";
import {useEffect} from "react";
import {getMatchesFromApi, Match, MatchesResponse} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";
import {useQuery} from "@tanstack/react-query";



function MatchesList({competitions}: CompetitionProps) {
    const { isLoading, error, data, isFetching} = useQuery(["matches"], async () => {
        return await getMatchesFromApi(competitions);
    });
    // useEffect(() => {
    //     console.log("Fetching");
    //     getMatchesFromApi(competitions).then(matches => setMatches(matches));
    // }, [competitions, setMatches]);
    if (isLoading || isFetching) {
        return (<div>Loading</div>);
    } else {
        return (
            <List>
                {data?.map((match) => {
                   return (
                       <ListItem key={match.id}>{match.homeTeam.shortName} - {match.awayTeam.shortName}</ListItem>
                   );
                })}
            </List>
        );
    }
}

export default MatchesList;
