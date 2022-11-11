import {allCompetitions, CompetitionProps} from "../App";
import {useEffect} from "react";
import {getMatchesFromApi, Match} from "../api/GetMatchesFromApi";
import {List} from "@mui/material";
import {
    QueryKey,
    useQueries, useQueryClient,
    UseQueryOptions, UseQueryResult
} from "@tanstack/react-query";
import DisplayMatch from "./DisplayMatch";

function MatchesList({competitions}: CompetitionProps) {
    const queryClient = useQueryClient();
    const userQueries: UseQueryResult<Match[], unknown>[] = useQueries({
        queries: allCompetitions.map<UseQueryOptions<Match[], unknown, unknown, QueryKey>>((competition: number) => {
            return {
                queryKey: ['competition', competition],
                queryFn: async () => await getMatchesFromApi(competition),
                enabled: competitions.includes(competition),
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                cacheTime: 5000,
                staleTime: 4000,
                retry: false,
            };
        })
    });

    useEffect(() => {
            for (let competition of allCompetitions) {
                if (!competitions.includes(competition)) {
                    queryClient.resetQueries(['competition', competition], {exact: true});
                }
            }
        }, [competitions, queryClient]
    );

    const matches = userQueries.map((queryResult) => {
            const {data} = queryResult;
            return data as Match[];
        })
        .filter((data) => data !== undefined)
        .flatMap(matches => matches)
        .sort(function (x: Match, y: Match) {
        return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
    });

    if (userQueries.some(query => query.isSuccess)) {
        return (
            <>
                <h1>{matches.length}</h1>
                <List>
                    {matches.map((match) => {
                        return (
                            <DisplayMatch key={"match-" + match.id} match={match}/>
                        );
                    })}
                </List>
            </>
        );
    } else {
        return (<div>No matches</div>);
    }
}


export default MatchesList;
