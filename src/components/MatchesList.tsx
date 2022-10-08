import {allCompetitions, CompetitionProps} from "../App";
import {useEffect} from "react";
import {getMatchesFromApi, Match, MatchesResponse} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const eredivisie = 2003;
const premierleague = 2021;

function MatchesList({competitions}: CompetitionProps) {
    const queryResult = useQuery([2003], async () => {
        return await getMatchesFromApi(2003);
    }, {
        enabled: competitions.includes(eredivisie)
    });

    const queryClient = useQueryClient();

    const { isLoading, error, data, isFetching} = queryResult;

    useEffect(() => {
        for (let competition of allCompetitions) {
            if (!competitions.includes(competition)) {
                queryClient.resetQueries([competition], {exact: true});
            } else {
                // Refetching is not needed.
                // queryResult.refetch({
                //     exact: true
                // });
            }
        }
    }, [competitions]);

    if (isLoading || isFetching) {
        return (<div>No matches</div>);
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
