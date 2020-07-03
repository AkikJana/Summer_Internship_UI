import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../style.css';
import CardContent from "@material-ui/core/CardContent";
export default function MyButton(props) {

  return (
    <button variant="outlined" size="large" className="detailBtn">
          {props.name}
    </button>
  );
}
