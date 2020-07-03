import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import '../style.css';

export default function SimpleCard(props) {
 /* const distinctComp;
  const display=props.str2;
  if(props.str2=="2091"){
    distinctComp=[...new Set(props.elements.map(x => ))]
  }*/
  return (
    <Card className="smallCard">
      <center>
      <Grid alignItems="center" container direction="row" justify="center">
      <CardContent autoid={props.autoprop}>
        <Grid sm={12} xs={12}>
          <Typography variant="h5" component="h2" align="center" className="Cardhead">
            {props.str1}
          </Typography>
        </Grid>
        <Grid sm={12} xs={12}>
          <Typography variant="h3" component="h2" align="center" className="Cardtext">
            {props.str2}
          </Typography>
        </Grid>
        </CardContent>
      </Grid>
      </center>
    </Card>
  );
}