import {useEffect} from "react";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";
import {useCompetitionsAndMatchesContext} from "../App";

function MatchesList() {
    const {competitions, matches, setMatches} = useCompetitionsAndMatchesContext();

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
