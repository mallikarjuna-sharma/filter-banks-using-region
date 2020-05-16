import { Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import React from 'react';
import PaperComponent from './PaperComponent.js';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';

const drawerWidth = "10%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },

  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar:  theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function App(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mode, setMode] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}  ><Button style={{height:"100%",width:"100%",padding:"10%"}} onClick={e => { const change = mode;setMode(!change) }}>{mode ? <NightsStayIcon/> : <WbSunnyIcon/> }</Button></div>
      <Divider />
      <Grid item>
      <List style={{minWidth: "20px"}}>
        {['Inbox'].map((text, index) => (
          <ListItem button key={text} style={{minWidth: "20px"}}>
            <ListItemIcon style={{minWidth: "20px"}}>{ <AccountBalanceIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      </Grid >
      <Divider />
      <List>
        
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
     
      <CssBaseline />

      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar/>  
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
           
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{ width:"100%",height:"100%",backgroundColor:(mode?"#616161":"white") }} >
        <div className={classes.toolbar}  />
       <Grid container>
         <PaperComponent mode={mode}/>
        </Grid>

      </main>
     
    </div>
  );
}



export default App;