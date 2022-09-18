import {footballDataKey} from "../secrets/Key";
import {plainToClass} from "class-transformer";

export interface Team {
    id: number,
    name: string,
    shortName: string
}

export interface Match {
    id: number,
    homeTeam: Team,
    awayTeam: Team,
    utcDate: string
}

export class MatchesResponse {
    matches: Array<Match>

    constructor(matches: Array<Match>) {
        this.matches = matches;
    }
}

export async function getMatchesFromApi(competition: number): Promise<Array<Match>> {
    // const fetchOptions: RequestInit = {
    //     method: 'GET',
    //     headers: {
    //         'X-Auth-Token': footballDataKey
    //     }
    // }
    // const response = await fetch(`http://localhost:3000/v4/competitions/${competition}/matches`, fetchOptions);
    //
    // if (response.status === 200) {
    //     const json = response.json();
    //     let matchesResponse: MatchesResponse = plainToClass(MatchesResponse, json as Object);
    //     return matchesResponse.matches.sort(function(x: Match, y: Match) {
    //         return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
    //     });
    // } else {
    //     return [];
    // }
    console.log("Fetching again: " + new Date().getTime());
    await new Promise(f => setTimeout(f, 1000));
    return [];
}
