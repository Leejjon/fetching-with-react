import React from "react";
import {allCompetitions} from "../App";
import {Checkbox, FormControlLabel, List, ListItem, Typography} from "@mui/material";

function CompetitionSelection(/*{competitions, setCompetitions}: CompetitionProps*/) {

    const competitions = allCompetitions; // Temporary

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, competition: number) => {
        // if (!event.target.checked) {
        //     setCompetitions(competitions.filter((competitionIterator) => competitionIterator !== competition));
        // } else {
        //     const newCompetitionsList: Array<number> = Object.assign([], competitions);
        //     newCompetitionsList.push(competition);
        //     setCompetitions(newCompetitionsList);
        // }
    }

    return (
        <div>
            <Typography variant="body1">Competitions</Typography>
            <List>
                {allCompetitions.map((competition: number) => {
                    return (
                        <ListItem key={competition}>
                            <FormControlLabel control={
                                <Checkbox checked={competitions.includes(competition)}
                                          onChange={(event) => handleChange(event, competition)} />
                            } label={competition} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
}

export default CompetitionSelection;
