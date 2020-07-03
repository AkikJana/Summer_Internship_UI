import React, { Component } from 'react';
import ProfessorBtn from './ProfessorBtn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../style.css';

class TopNav extends Component {
    render() {
        return (

            <Grid container spacing={3} >
                <Grid item xs={5} sm={4}> <Typography variant="h5" className="yellowHead" gutterBottom>ABC Company</Typography> </Grid>
                <Grid item xs={2} sm={4}> </Grid>
                <Grid item xs={5} sm={4} container justify="flex-end" > <ProfessorBtn/> </Grid>
                
            </Grid>
        );
    }
}
export default TopNav