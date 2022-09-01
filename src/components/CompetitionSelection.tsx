import React, {useEffect, useState} from "react";
import {getMatchesFromApi} from "../api/GetMatchesFromApi";


function CompetitionSelection() {
    const [competitions, setCompetitions] = useState<Array<string>>([]);

    useEffect(() => {
        getMatchesFromApi();
    }, [competitions]);

    return (
        <div>Hoi</div>
    );
}

export default CompetitionSelection;
