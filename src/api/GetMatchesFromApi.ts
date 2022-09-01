
export interface Match {

}

export async function getMatchesFromApi() {
    let response = await fetch("https://api.football-data.org/v4/matches");
    if (response.status === 200) {

    } else {
        return [];
    }
}
