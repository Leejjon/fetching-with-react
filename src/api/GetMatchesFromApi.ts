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

class MatchesResponse {
    matches: Array<Match>

    constructor(matches: Array<Match>) {
        this.matches = matches;
    }
}

export async function getMatchesFromApi(competitions: Array<number>): Promise<Array<Match>> {
    const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
            'X-Auth-Token': footballDataKey
        }
    }
    let promises = competitions.map((competition: number) => {
        return fetch(`http://localhost:3000/v4/competitions/${competition}/matches`,
            fetchOptions
        );
    });

    let resolvedPromises = await Promise.all(promises);
    let resolvedJson = await Promise.all(resolvedPromises.filter(r => r.status === 200).map(r => r.json()));

    return resolvedJson
        .map((json) => {
            let matchesResponse: MatchesResponse = plainToClass(MatchesResponse, json as Object);
            return matchesResponse.matches;
        })
        .flatMap(matches => matches)
        .sort(function(x: Match, y: Match) {
            return new Date(x.utcDate).getTime() - new Date(y.utcDate).getTime()
        });
}
