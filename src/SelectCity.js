import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import Cities from "./cities.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 50,
  },
}));

export default function SelectCity(props) {
  const classes = useStyles();

  const { setSelectedCity } = props;

  return (
    <FormControl id="selectcity" className={classes.formControl}>
      <InputLabel htmlFor="grouped-native-select">Select a City</InputLabel>
      <Select
        native
        defaultValue=""
        id="grouped-native-select"
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {Cities.map((city) => {
          return (
            <option value={city.name}>{city.name}</option>
          );
        })}
      </Select>
    </FormControl>
  );
}
