import {allCompetitions, CompetitionProps} from "../App";
import {useEffect, useState} from "react";
import {getMatchesFromApi, Match} from "../api/GetMatchesFromApi";
import {List} from "@mui/material";
import {
    QueryKey,
    useQueries, useQueryClient,
    UseQueryOptions, UseQueryResult
} from "@tanstack/react-query";
import DisplayMatch from "./DisplayMatch";


function MatchesList({competitions, setCompetitions}: CompetitionProps) {
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
                retry: false
            };
        })
    });

    const [matches, setMatches] = useState<Array<Match>>([]);
    const isLoading: boolean = userQueries.every(query => query.isSuccess);

    useEffect(() => {
        if (isLoading) {
            let newMatches = userQueries.map((queryResult) => {
                const {data} = queryResult;
                return data as Match[];
            }).flatMap(matches => matches).sort(function (x: Match, y: Match) {
                return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
            });
            setMatches(newMatches);
        }
    }, [isLoading]);

    useEffect(() => {
        for (let competition of allCompetitions) {
            if (!competitions.includes(competition)) {
                queryClient.resetQueries(['competition', competition], {exact: true});
            } else {

            }
        }
    }, [competitions]);

    if (matches.length === 0) {
        return (<div>No matches</div>);
    } else {
        return (
            <>
                <h1>{userQueries.length}</h1>
                <List>
                    {matches.map((match) => {
                        return (
                            <DisplayMatch key={"match-" + match.id} match={match}/>
                        );
                    })}
                </List>
            </>
        );
    }
}


export default MatchesList;
