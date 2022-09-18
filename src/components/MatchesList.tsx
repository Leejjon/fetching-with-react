import {allCompetitions, CompetitionProps} from "../App";
import {useEffect, useState} from "react";
import {getMatchesFromApi, Match} from "../api/GetMatchesFromApi";
import {List} from "@mui/material";
import {
    QueryKey,
    useQueries,
    UseQueryOptions, UseQueryResult
} from "@tanstack/react-query";
import DisplayMatch from "./DisplayMatch";


function MatchesList({competitions}: CompetitionProps) {
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
    const [list, setList] = useState<Array<string>>([]);
    // const isLoading: boolean = userQueries.some(result => result.isLoading);

    useEffect(() => {
        userQueries.forEach((queryResult) => {
                const {isLoading, isFetching, data} = queryResult;
                if (!isLoading && !isFetching) {
                    const thisMatches = data as Match[];
                    const sortedMatches: Match[] = thisMatches
                        .flatMap(matches => matches)
                        .sort(function (x: Match, y: Match) {
                            return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
                        });
                    setMatches(matches.concat(sortedMatches));
                }
            }
        );
    }, [setMatches]);

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


export default MatchesList;
