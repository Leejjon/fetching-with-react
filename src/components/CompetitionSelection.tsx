import React from "react";
import {allCompetitions, CompetitionProps} from "../App";
import {Checkbox, FormControlLabel, List, ListItem} from "@mui/material";

function CompetitionSelection({competitions, setCompetitions}: CompetitionProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, competition: number) => {
        if (!event.target.checked) {
            setCompetitions(competitions.filter((competitionIterator) => competitionIterator !== competition));
        } else {
            const newCompetitionsList: Array<number> = Object.assign([], competitions);
            newCompetitionsList.push(competition);
            setCompetitions(newCompetitionsList);
        }
    }

    return (
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
    );
}

export default CompetitionSelection;
