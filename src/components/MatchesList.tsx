import {allCompetitions, CompetitionProps} from "../App";
import {useEffect, useState} from "react";
import {getMatchesFromApi, Match, MatchesResponse} from "../api/GetMatchesFromApi";
import {List, ListItem} from "@mui/material";
import {
    useQueries,
    UseQueryOptions, UseQueryResult
} from "@tanstack/react-query";
import DisplayMatch from "./DisplayMatch";


function MatchesList({competitions}: CompetitionProps) {
    const userQueries: UseQueryResult<Match[], unknown>[] = useQueries({
        queries: allCompetitions.map<UseQueryOptions<Match[]>>((competition: number) => {
            return {
                queryKey: ['competition', competition],
                queryFn: () => getMatchesFromApi(competition),
            };
        })
    });

    const [matches, setMatches] = useState<Array<Match>>([]);
    const [list, setList] = useState<Array<string>>([]);
    // const isLoading: boolean = userQueries.some(result => result.isLoading);

    // useEffect(() => {
    //     userQueries.forEach((queryResult) => {
    //             const {isLoading, isFetching, data} = queryResult;
    //             console.log(`Hoi ${isLoading} ${isFetching}`);
    //             // if (!isLoading && !isFetching) {
    //             //     const thisMatches = data as Match[];
    //             //     const sortedMatches: Match[] = thisMatches
    //             //         .flatMap(matches => matches)
    //             //         .sort(function (x: Match, y: Match) {
    //             //             return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
    //             //         });
    //             //     setMatches(matches.concat(sortedMatches));
    //             // }
    //         }
    //     );
    // }, []);

    return (
        <>
            <h1>Hoi  {userQueries.length} {JSON.stringify(list)}</h1>
            <button>Click me</button>
            {/*<List>*/}
            {/*{matches.map((match) => {*/}
            {/*   return (*/}
            {/*       <DisplayMatch match={match}/>*/}
            {/*   );*/}
            {/*})}*/}
            {/*</List>*/}
        </>
    );
}

    // userQueries.forEach((queryResult) => {
    //         const {isLoading, isFetching, data} = queryResult;
    //         if (!isLoading && !isFetching) {
    //             const thisMatches = data as Match[];
    //             const sortedMatches: Match[] = thisMatches
    //                 .flatMap(matches => matches)
    //                 .sort(function (x: Match, y: Match) {
    //                     return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
    //                 });
    //             setMatches(matches.concat(sortedMatches));
    //         }
    //     }
    // );

export default MatchesList;
