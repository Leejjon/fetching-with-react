import React from "react";
import {allCompetitions, CompetitionProps, CompetitionsUpdateActionType} from "../App";
import {Checkbox, FormControlLabel, List, ListItem} from "@mui/material";

function CompetitionSelection({competitionsState, dispatch}: CompetitionProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, competition: number) => {
        if (event.target.checked) {
            dispatch({type: CompetitionsUpdateActionType.ADD, competition});
        } else {
            dispatch({type: CompetitionsUpdateActionType.REMOVE, competition});
        }
    }

    return (
        <List>
            {allCompetitions.map((competition: number) => {
                return (
                    <ListItem key={competition}>
                        <FormControlLabel control={
                            <Checkbox checked={competitionsState.competitions.includes(competition)}
                                      onChange={(event) => handleChange(event, competition)} />
                        } label={competition} />
                    </ListItem>
                )
            })}
        </List>
    );
}

export default CompetitionSelection;
