import React, { Component } from 'react';
import axios from 'axios';
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { callDummyAPI } from '../services/services';
import Paper from "@material-ui/core/Paper";
import MainCard from "./Details/MainCard"
import Grid from '@material-ui/core/Grid';
import ProfessorBtn from "./Dashboard/ProfessorBtn"
import TopNav from "./Dashboard/TopNav"
import CountryBox from "./Dashboard/CountryBox"
//import SearchCard from "./Dashboard/SearchCard"
//import TableCard from "./Dashboard/TableCard"
//import EnhancedTable from "./Dashboard/EnhancedTable"
import Footer from "../components/Footer";
import Card from '@material-ui/core/Card';
//import Search from './Dashboard/Search'
//import SearchBar from 'material-ui-search-bar'

const styles = (theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  mainBackground: {
    background: theme.palette.primary.main,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
});
class CustomerDetails extends Component {
  
  render() {
    console.log('theme', theme);
    console.log(this.props.match.params.id)
    const { classes, user } = this.props;
    return (
      <div className={classes.mainBackground}>
       <div className="dashboardBody">
        <Grid container spacing={3} container direction="row" justify="center" alignItems="center">      
            <Grid item xs={12} sm={12}> <TopNav></TopNav> </Grid>
            <Grid item xs={12} sm={12}> <MainCard id={this.props.match.params.id} /> </Grid>
            <Grid item xs={12} sm={12}> <Footer></Footer> </Grid>
        </Grid>
      </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CustomerDetails);