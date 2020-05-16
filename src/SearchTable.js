import { Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React,{useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects(props) {

  const { setSearchString, selectedCategory,resetField,setResetField ,showLoader,mode} = props;
  const classes = useStyles();
  const [searchTimeout, setSearchTimeout] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const [typedString, setTypedString] = React.useState('');


  useEffect(() => {
    if (resetField) {
      setTypedString("");
      setResetField(false)
    }
  }, [resetField]);

  useEffect(() => {
    setloader(showLoader)
  }, [showLoader]);


  const handleChange = (e) => {

        const value = e.target.value.trim();

        setloader(true)
        setTypedString(value);
      
        console.log("start here",value);
        if(searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => {
            console.log("start search",value);
            setSearchString(value);
            setloader(false)
        }, 2000));
  }


  return (
    <Grid container direction={"row"} md={12} lg={12} >
    <Grid item md={8} lg={8} > 
      <FormControl className={classes.margin}>
        <BootstrapInput
          id="demo-customized-textbox"
          style={{
            width: "90%" ,color:( mode ? "white" : ''),
          backgroundColor:(mode ? "#616161" : 'white')
        }}
          value={typedString}
          onChange={handleChange } 
          placeholder={"Search by " + selectedCategory}
        /> 
      </FormControl>
      </Grid>
      {loader ? <Grid item md={3} lg={3} ><CircularProgress   /> </Grid> : null}
    </Grid>
  );
}
