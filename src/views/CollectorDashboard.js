import React, { Component } from 'react';
import theme, { pxToVh } from '../utils/theme';
import { withStyles } from '@material-ui/core/styles';
import { callDummyAPI } from '../services/services';
import Paper from "@material-ui/core/Paper";
import HeaderCard from "./Dashboard/HeaderCard"
import Grid from '@material-ui/core/Grid';
import ProfessorBtn from "./Dashboard/ProfessorBtn"
import TopNav from "./Dashboard/TopNav"
import CountryBox from "./Dashboard/CountryBox"
import Table from "./EnhancedTable"
import Search from "./Search"
import SearchTable from "./SearchTable"
import './style.css';
//import VirtTable from "./ReactVirtualizedTable"
//import Table from "./Table"
import axios from 'axios';

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
class CollectorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      response: 0,
      redirect: false,
      loading: false,
      responsejson:0,
      
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleGetStarted = (e) => {
    callDummyAPI(this.state.name).then((response) => {
      // });
      this.setState({
        response: response.data.name,
        redirect: true,
        loading: false,
      });
    });
  };

  async componentDidMount() {
    //fetch('http://localhost:8080/1705205/PopulateTable')
    //.then(response => response.json())
    //.then(data => this.setState({data}));

    this.state.responsejson =
    await axios.get("http://localhost:8080/1705205/PopulateTable",
      { headers: {'Content-Type': 'application/json'}}
    )
    //this.state.jsondata.setState(this.state.responsejson.data)
  //console.log(this.state.jsondata)
  console.log(this.state.responsejson.data)
  console.log(typeof(this.state.responsejson.data[0].business_code))
  }
  
  render() {
    console.log('theme', theme);
    const { classes, user } = this.props;
    return (
      <div className={classes.mainBackground}>
        <div className="scollable">
        <Grid container spacing={3} alignItems="center">

        
            <Grid item xs={12} sm={12}> <TopNav></TopNav> </Grid>

            <Grid item xs={12} sm={3}> <HeaderCard autoprop="total-customers-text-collector" str1="Total Customers" str2="51" elements={this.state.responsejson.data} /> </Grid>
            <Grid item xs={12} sm={3}> <HeaderCard autoprop="total-open-ar-text-collector" str1="Total Open AR" str2="$43M" elements={this.state.responsejson.data} /> </Grid>
            <Grid item xs={12} sm={3}> <HeaderCard autoprop="average-days-delay-text-collector" str1="Average Days Delay" str2="3 Days" elements={this.state.responsejson.data} /> </Grid>
            <Grid item xs={12} sm={3}> <HeaderCard autoprop="total-open-invoice-text-collector" str1="Total Open Invoices" str2="27698" elements={this.state.responsejson.data} /> </Grid>

            <Grid item xs={12} sm={4}>
                <Grid item xs={12} sm={12}> 
                <CountryBox data={this.state.responsejson.data}/>
                </Grid>
                <Grid item xs={12} sm={12}> 
                <SearchTable elements={this.state.responsejson.data} />
                
                </Grid>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Table/>
              
            </Grid>
        
        </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(CollectorDashboard);