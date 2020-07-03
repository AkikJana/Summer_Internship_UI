import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../style.css';
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
export default function SideStats(props) {

  return (
    <div autoid={props.autoprop}>
    <Typography variant="h4" component="h2" align="center" className="Cardtext barTxt">
        {props.top}
    </Typography>
    <Typography variant="subtitle1" gutterBottom align="center" className="Cardhead">
        {props.bottom}
    </Typography>
    </div>
  );
}
