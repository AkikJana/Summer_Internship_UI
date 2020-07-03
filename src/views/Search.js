import axios from 'axios';
import React, {Component} from 'react';
//import {Button} from 'react-bootstrap';
//import Results from './Results';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      term: '',
    };

    this.submit = this.submit.bind(this);
    this.changeTerm = this.changeTerm.bind(this);
  }

  changeTerm(event) {
    this.setState({term: event.target.value});
  }

   submit(event) {
    console.log(this.state.term)
    console.log(this.state.results)
    //+ encodeURI(this.state.term)
    let url = "http://localhost:8080/1705205/Search_Query?CustomerIdentifier="+ encodeURI(this.state.term);
   //this.state.results=
     axios.get(url)
      .then(response => {
        //const tmp=response.data;
        this.setState({results:response.data});
        console.log(response.data)
      })
      .catch(error => console.log(error));
      //console.log(this.state.results.data)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input onChange={this.changeTerm}/>
          <button  type="submit">Find</button>
        </form>
        <ul>
          {this.state.results.map(tmp => <li>{tmp.acct_doc_header_id}</li>)}
        </ul>
        {console.log(this.state.results.data)}
      </div>
    );
  }
}
//<Results data={this.state.results}/> bsStyle="primary"
export default Search;