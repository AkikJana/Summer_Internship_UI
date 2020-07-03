import React, { Component } from 'react';
import '../style.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Search from '../Dashboard/Search'
import SearchBar from 'material-ui-search-bar'
class MiddleCard extends Component {

    render(props) {
        return (
            <Card className="sideCard">
                <p class="Cardhead">
                Hello World
                </p>
            </Card>
          );
    }
}
export default MiddleCard