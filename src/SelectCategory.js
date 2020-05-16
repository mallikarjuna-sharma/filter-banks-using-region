import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import stringConstants from "./stringConstants.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

export default function SelectCategory(props) {

const {setSelectedCategory,mode} = props

  const classes = useStyles();
  const [Category,  setCategory] = React.useState("");

  const handleChange = (event) => {
     setCategory(event.target.value);
    setSelectedCategory(event.target.value)
  };


  return (
    <FormControl id="selectcity" className={classes.formControl}>
      <InputLabel htmlFor="grouped-native-select">Category</InputLabel>
      <NativeSelect
        value={Category}
        onChange={handleChange}
        inputProps={{
          name: "Category",
          id: "Category-native-helper",
        }}
      >
        {stringConstants.TABLE_HEADER.map((values, index) => {
          return <option value={values} key={index} >{values}</option>;
        })}
      </NativeSelect>
    </FormControl>
  );
}
