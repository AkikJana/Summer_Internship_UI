import axios from 'axios';
import React, {Component} from 'react';
import DisplaySearchTable from './DisplaySearchTable';
let counter=0;
function createData(acct_doc_header_id,company_id,document_number,document_number_norm,business_code,create_year,document_line_number,doctype,customer_number,customer_number_norm,fk_customer_map_id,customer_name,division,document_create_date,document_create_date_norm,posting_date,posting_date_norm,posting_id,due_date,due_date_norm,order_date,order_date_norm,invoice_id,invoice_id_norm,baseline_create_date,invoice_date_norm,total_open_amount,total_open_amount_norm,cust_payment_terms,business_area,ship_date,ship_to,clearing_date,clearing_date_norm,reason_code,isOpen,discount_due_date_norm,debit_credit_indicator,payment_method,document_creation_date,invoice_amount_doc_currency,document_id,actual_open_amount,paid_amount,dayspast_due,invoice_age,disputed_amount) {
    counter += 1;
    return { id: counter,acct_doc_header_id,company_id,document_number,document_number_norm,business_code,create_year,document_line_number,doctype,customer_number,customer_number_norm,fk_customer_map_id,customer_name,division,document_create_date,document_create_date_norm,posting_date,posting_date_norm,posting_id,due_date,due_date_norm,order_date,order_date_norm,invoice_id,invoice_id_norm,baseline_create_date,invoice_date_norm,total_open_amount,total_open_amount_norm,cust_payment_terms,business_area,ship_date,ship_to,clearing_date,clearing_date_norm,reason_code,isOpen,discount_due_date_norm,debit_credit_indicator,payment_method,document_creation_date,invoice_amount_doc_currency,document_id,actual_open_amount,paid_amount,dayspast_due,invoice_age,disputed_amount };
  }

  function myFunction(row,searchnumber) {
      if (row.customer_number==searchnumber) {
           return createData(row.acct_doc_header_id,row.company_id,row.document_number,row.document_number_norm,row.business_code,row.create_year,row.document_line_number,row.doctype,row.customer_number,row.customer_number_norm,row.fk_customer_map_id,row.customer_name,row.division,row.document_create_date,row.document_create_date_norm,row.posting_date,row.posting_date_norm,row.posting_id,row.due_date,row.due_date_norm,row.order_date,row.order_date_norm,row.invoice_id,row.invoice_id_norm,row.baseline_create_date,row.invoice_date_norm,row.total_open_amount,row.total_open_amount_norm,row.cust_payment_terms,row.business_area,row.ship_date,row.ship_to,row.clearing_date,row.clearing_date_norm,row.reason_code,row.isOpen,row.discount_due_date_norm,row.debit_credit_indicator,row.payment_method,row.document_creation_date,row.invoice_amount_doc_currency,row.document_id,row.actual_open_amount,row.paid_amount,row.dayspast_due,row.invoice_age,row.disputed_amount)
      }
  }

class SearchTable extends React.Component {
   
        
      state = {
        viewableEls:[],
        constantEls:[],
        data:[],
        filterStr:0,
      };
    
  
   /*componentWillReceiveProps (nextProps) {
      const { elements } = this.props;
      const { filterStr } = this.state;
  
      if (elements !== nextProps.elements) {
        this.setState({
          viewableEls: this.getViewableEls(nextProps.elements, filterStr)
        })
      }
    }*/
    
    async componentDidMount() {
        //fetch('http://localhost:8080/1705205/PopulateTable')
        //.then(response => response.json())
        //.then(data => this.setState({data}));
    
    axios.get("http://localhost:8080/1705205/PopulateTable",{ headers: {'Content-Type': 'application/json'}})
        .then(response => {
            //const tmp=response.data;
            this.setState({viewableEls:response.data});
            this.setState({constantEls:response.data});
            console.log(this.state.constantEls)
          })
          .catch(error => console.log(error));
        //this.state.jsondata.setState(this.state.responsejson.data)
      //console.log(this.state.jsondata)
     
      }

      getRows=()=>{
        if(this.state.viewableEls){
          return this.state.viewableEls.map(row=>{
           return createData(row.acct_doc_header_id,row.company_id,row.document_number,row.document_number_norm,row.business_code,row.create_year,row.document_line_number,row.doctype,row.customer_number,row.customer_number_norm,row.fk_customer_map_id,row.customer_name,row.division,row.document_create_date,row.document_create_date_norm,row.posting_date,row.posting_date_norm,row.posting_id,row.due_date,row.due_date_norm,row.order_date,row.order_date_norm,row.invoice_id,row.invoice_id_norm,row.baseline_create_date,row.invoice_date_norm,row.total_open_amount,row.total_open_amount_norm,row.cust_payment_terms,row.business_area,row.ship_date,row.ship_to,row.clearing_date,row.clearing_date_norm,row.reason_code,row.isOpen,row.discount_due_date_norm,row.debit_credit_indicator,row.payment_method,row.document_creation_date,row.invoice_amount_doc_currency,row.document_id,row.actual_open_amount,row.paid_amount,row.dayspast_due,row.invoice_age,row.disputed_amount)
        });
    }
      }
    getViewableEls =(searchnumber)=> {
        console.log(typeof(this.state.constantEls[0]))
        var t=parseInt(searchnumber)
        console.log(t)
        var tmp=[]
        if(this.state.constantEls){
    console.log(this.state.constantEls.map(el => {if(el.customer_number==t) tmp.push(el)}));
    console.log(tmp)
            return tmp;
      //var i=0;
      
      /*return this.state.constantEls.filter(function(hero) {
        return hero[i++].customer_number == this.state.filterStr;
    });*/
        }
    }
   
  
    handleFilterChange = e => {
      //const { elements } = this.state.constantEls;
  
      this.setState({
        filterStr: e.target.value})
      this.setState({viewableEls: this.getViewableEls(e.target.value)})
    }
    render () {
        var tmp=this.getRows();
        if(tmp){this.state.data.push(...tmp);}
    //this.state.data.push(...tmp);
    console.log(tmp)
    console.log(this.state.data);
      //const { viewableEls } = this.state;
        if(this.state.viewableEls){
      return (
        <div>
          <input
          autoid="search-text-field"
            type="text"
            value={ this.state.filterStr }
            onChange={ this.handleFilterChange } />
          
            { this.state.viewableEls.map(e => console.log(e)) }
            <DisplaySearchTable posts={this.state.viewableEls}/>
          
        </div>
      );
        }
        
            return(null);
        
    }
  }

  export default SearchTable;