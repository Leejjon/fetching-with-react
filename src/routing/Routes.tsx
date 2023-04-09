import React from "react";
import Home from "../views/Home";
import CompetitionSelection from "../views/CompetitionSelection";
import MatchesList from "../views/MatchesList";
import MatchesList2 from "../views/MatchesList2";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";
import {allCompetitions} from "../App";

export enum RouteEnum {
    HOME,
    COMPETITIONS,
    MATCHESLIST1,
    MATCHESLIST2
}

export interface RouteInformation {
    key: RouteEnum,
    title: string,
    view: JSX.Element,
    loader: () => Promise<any> | null
}

interface GenericRouteInformationPair {
    [key: string]: RouteInformation
}

export interface SingleRouteInformationPair {
    key: string,
    value: RouteInformation
}

export const routes: GenericRouteInformationPair = {
    "/": {key: RouteEnum.HOME, title: "Home", view: <Home/>, loader: () => { return null }},
    "/competitions": {key: RouteEnum.COMPETITIONS, title: "Competitions", view: <CompetitionSelection/>, loader: () => { return null }},
    "/matches": {key: RouteEnum.MATCHESLIST1, title: "Matches 1", view: <MatchesList/>, loader: () => { return getMatchesFromApi(allCompetitions) }},
    "/matches2": {key: RouteEnum.MATCHESLIST2, title: "Matches 2", view: <MatchesList2/>, loader: () => { return getMatchesFromApi(allCompetitions) }},
}

export function getRouteInformation(routeEnum: RouteEnum): SingleRouteInformationPair {
    for (const [key, value] of Object.entries(routes)) {
        if (value.key === routeEnum) {
            return {key, value} as SingleRouteInformationPair;
        }
    }
    throw Error("Not possible but the typescript compiler is dumb");
}


