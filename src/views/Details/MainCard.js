import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import '../style.css';
import MyButton from './MyButton'
import SideStats from './SideStats'
import EnhancedTable from '../Dashboard/EnhancedTable'
 class MainCard extends Component {
   render(){
  return (
    <Card className="dCard">
      <center>
      <CardContent>
        <Grid sm={12} xs={12} container direction="row" justify="center" alignItems="center">
            
            <Grid sm={1} xs={2} container direction="row" justify="flex-start" alignItems="flex-start">
                
            </Grid>
            
            <Grid sm={1} xs={2} container direction="row" justify="flex-start" alignItems="flex-start">
                
            </Grid>

            <Grid sm={9} xs={8} container direction="row" justify="center" alignItems="center">
                <Grid sm={8} xs={8} container direction="row" justify="center" alignItems="center">
                </Grid>
                <Grid sm={0} xs={2} container direction="row" justify="center" alignItems="center">
                   
                </Grid>
                <Grid sm={2} xs={2} container direction="row" justify="center" alignItems="center">
                    
                    <SideStats autoprop="customer-number" top={this.props.id} bottom="Customer Number"  className="hideOnSmall" />
                </Grid>
            </Grid>

        </Grid>
        <Grid sm={12} xs={12}>
        <EnhancedTable id={this.props.id}></EnhancedTable>
        </Grid>
        </CardContent>
      </center>
    </Card>
  );
   }
}
export default MainCard;