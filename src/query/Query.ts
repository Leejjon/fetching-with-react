import {getMatchesFromApi, Match} from "../api/GetMatchesFromApi";
import {QueryClient} from "@tanstack/react-query";
import {allCompetitions} from "../App";

export const matchesQuery = () => (
    {
        queryKey: [2003],
        queryFn: async () => { return await getMatchesFromApi(allCompetitions)},
    }
);

export const reactQueryLoader = async (queryClient: QueryClient): Promise<Array<Match>> => {
    return await queryClient.ensureQueryData(matchesQuery());
};
