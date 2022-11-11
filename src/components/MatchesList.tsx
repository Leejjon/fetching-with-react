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

    if (userQueries.every(query => query.isSuccess)) {
        const matches = userQueries.map((queryResult) => {
            const {data} = queryResult;
            return data as Match[];
        }).flatMap(matches => matches).sort(function (x: Match, y: Match) {
            return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
        });
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

    // const [matches, setMatches] = useState<Array<Match>>([]);
    // const doneLoading: boolean = userQueries.every(query => query.isSuccess);
    // const [reloading, setReloading] = useState(false);
    //
    // useEffect(() => {
    //     for (let competition of allCompetitions) {
    //         if (!competitions.includes(competition)) {
    //             console.log("Resetting competition");
    //             queryClient.resetQueries(['competition', competition], {exact: true});
    //             setReloading(true);
    //         }
    //     }
    // }, [competitions]);
    //
    // useEffect(() => {
    //     console.log("doneLoading: " + doneLoading)
    // }, [doneLoading]);
    //
    // useEffect(() => {
    //     if (doneLoading && !reloading) {
    //         const newMatches = userQueries.map((queryResult) => {
    //             const {data} = queryResult;
    //             return data as Match[];
    //         }).flatMap(matches => matches).sort(function (x: Match, y: Match) {
    //             return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
    //         });
    //         setMatches(newMatches);
    //     }
    // }, [doneLoading, reloading]);
    //
    // if (matches.length === 0) {
    //     return (<div>No matches</div>);
    // } else {
    //     return (
    //         <>
    //             <h1>{matches.length}</h1>
    //             <List>
    //                 {matches.map((match) => {
    //                     return (
    //                         <DisplayMatch key={"match-" + match.id} match={match}/>
    //                     );
    //                 })}
    //             </List>
    //         </>
    //     );
    // }
}


export default MatchesList;
