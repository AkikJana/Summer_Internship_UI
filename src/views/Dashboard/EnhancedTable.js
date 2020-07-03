import React from "react";
import SideStats from '../Details/SideStats';
import {CSVLink, CSVDownload} from 'react-csv';
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import { GetAllDetails } from "../../services/services";
import Button from '@material-ui/core/Button';
import axios from 'axios';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {

  },
  {
    id: "acct_doc_header_id",
    numeric: true,
    disablePadding: false,
    label: "Account doc header Id",
  },
  {
    id: "company_id",
    numeric: true,
    disablePadding: false,
    label: "Company Id",
  },
  {
    id: "document_number",
    numeric: true,
    disablePadding: false,
    label: "Document number",
  },
  {
    id: "document_number_norm",
    numeric: true,
    disablePadding: false,
    label: "Document number norm",
  },
  {
    id: "business_code",
    numeric: false,
    disablePadding: true,
    label: "Business code",
  },
  {
    id: "create_year",
    numeric: false,
    disablePadding: true,
    label: "Create year",
  },
  {
    id: "document_line_number",
    numeric: true,
    disablePadding: false,
    label: "Document line number",
  },
  { id: "doctype", numeric: false, disablePadding: true, label: "Doctype" },
  {
    id: "customer_number",
    numeric: true,
    disablePadding: false,
    label: "Customer number",
  },
  {
    id: "customer_number_norm",
    numeric: true,
    disablePadding: false,
    label: "Customer number norm",
  },
  {
    id: "fk_customer_map_id",
    numeric: true,
    disablePadding: false,
    label: "Fk customer map id",
  },
  {
    id: "customer_name",
    numeric: false,
    disablePadding: true,
    label: "Customer name",
  },
  { id: "division", numeric: false, disablePadding: true, label: "Division" },
  {
    id: "document_create_date",
    numeric: false,
    disablePadding: true,
    label: "Document Create date",
  },
  {
    id: "document_create_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Document create date norm",
  },
  {
    id: "posting_date",
    numeric: false,
    disablePadding: true,
    label: "Posting date",
  },
  {
    id: "posting_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Posting date norm",
  },
  {
    id: "posting_id",
    numeric: false,
    disablePadding: true,
    label: "Posting id",
  },
  { id: "due_date", numeric: false, disablePadding: true, label: "Due date" },
  {
    id: "due_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Due date norm",
  },
  {
    id: "order_date",
    numeric: false,
    disablePadding: true,
    label: "Order date",
  },
  {
    id: "order_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Order date norm",
  },
  {
    id: "invoice_id",
    numeric: true,
    disablePadding: false,
    label: "Invoice id",
  },
  {
    id: "invoice_id_norm",
    numeric: true,
    disablePadding: false,
    label: "Invoice id norm",
  },
  {
    id: "baseline_create_date",
    numeric: false,
    disablePadding: true,
    label: "Baseline create date",
  },
  {
    id: "invoice_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Invoice date norm",
  },
  {
    id: "total_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Total open amount",
  },
  {
    id: "total_open_amount_norm",
    numeric: true,
    disablePadding: false,
    label: "Total open amount norm",
  },
  {
    id: "cust_payment_terms",
    numeric: true,
    disablePadding: false,
    label: "Cust payment terms",
  },
  {
    id: "business_area",
    numeric: false,
    disablePadding: true,
    label: "Business area",
  },
  { id: "ship_date", numeric: false, disablePadding: true, label: "Ship date" },
  { id: "ship_to", numeric: false, disablePadding: true, label: "Ship to" },
  {
    id: "clearing_date",
    numeric: false,
    disablePadding: true,
    label: "Clearing date",
  },
  {
    id: "clearing_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Clearing date norm",
  },
  {
    id: "reason_code",
    numeric: false,
    disablePadding: true,
    label: "Reason code",
  },
  { id: "isOpen", numeric: true, disablePadding: false, label: "IsOpen" },
  {
    id: "discount_due_date_norm",
    numeric: false,
    disablePadding: true,
    label: "Discount due date norm",
  },
  {
    id: "debit_credit_indicator",
    numeric: false,
    disablePadding: true,
    label: "Debit credit indicator",
  },
  {
    id: "payment_method",
    numeric: false,
    disablePadding: true,
    label: "Payment method",
  },
  {
    id: "document_creation_date",
    numeric: false,
    disablePadding: true,
    label: "Document creation date",
  },
  {
    id: "invoice_amount_doc_currency",
    numeric: true,
    disablePadding: false,
    label: "Invoice amount doc currency",
  },
  {
    id: "document_id",
    numeric: true,
    disablePadding: false,
    label: "Document id",
  },
  {
    id: "actual_open_amount",
    numeric: true,
    disablePadding: false,
    label: "Actual open amount",
  },
  {
    id: "paid_amount",
    numeric: true,
    disablePadding: false,
    label: "Paid amount",
  },
  {
    id: "dayspast_due",
    numeric: true,
    disablePadding: false,
    label: "Dayspast due",
  },
  {
    id: "invoice_age",
    numeric: true,
    disablePadding: false,
    label: "Invoice age",
  },
  {
    id: "disputed_amount",
    numeric: true,
    disablePadding: false,
    label: "Disputed amount",
  },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow style={{backgroundColor:'#252c48', color: 'white',}}>
          <TableCell padding="checkbox">
            <Checkbox style={{backgroundColor:'#252c48', color: 'white',}}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            (row) => (
              <TableCell style={{backgroundColor:'#252c48', color: 'white',}}
                key={row.acct_doc_header_id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip 
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel style={{backgroundColor:'#252c48', color: 'white',}}
                    active={orderBy === row.acct_doc_header_id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const headStyles = (theme) => ({
  root: {
    color: "FFFFFF",
  }
})

EnhancedTableHead = withStyles(headStyles)(EnhancedTableHead);


// toolbar
const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "dark"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});



let EnhancedTableToolbar = (props) => {
  const { numSelected, classes, selected ,handleSubmitForm,handleChangeInput,handleChangeShipTo,csvData} = props;
  console.log(selected)
  var tmp=0;
  var name="";
  if (csvData.length>0) {
    name=csvData[0].customer_name;
  }
  
  csvData.map((n) => tmp=tmp+n.actual_open_amount);
  console.log(tmp);
  return (
    <Toolbar style={{backgroundColor:'#252c48', color: 'white',}}
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title} style={{backgroundColor:'#252c48', color: 'white',}}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle" color="inherit">
            Invoices
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <SideStats autoprop="total-open-amount-customer" top={tmp} bottom="Total Open Amount" />
      <SideStats autoprop="total-open-invoices-customer" top={csvData.length} bottom="Total Open Invoices" />
      <SideStats autoprop="customer-name" top={name} bottom="Customer Name" />
      <div color='#FFFFFF'>
        <Button autoid="export-button">
      <CSVLink data={csvData} filename="1705205_exportedData" >Download me</CSVLink>
      </Button>
      </div>
      <div className={classes.actions}>
        {numSelected == 1 ? (
          <div>
          
          <form onSubmit={handleSubmitForm}>
        <label>
          OPEN AMOUNT:
          <input autoid="open-amount-input" type="number"  onChange={handleChangeInput} />
        </label>
        <label>
          SHIP TO:
          <input autoid="doctype-input" type="text"  onChange={handleChangeShipTo} />
        </label>
        <input autoid="modify-save-button" type="submit" value="Submit" />
      </form>
          </div>
        ) : (
          <Tooltip title="Predict" style={{backgroundColor:'#252c48', color: 'white',}}>
            <IconButton aria-label="Predict">
              <Typography color="inherit"></Typography>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// styles
const styles = () => ({
  root: {
    width: "100%",
    // marginTop: theme.spacing.unit * 1,
    background: "#252c48",
    margin: 10,
    color: "FFFFFF",
  },
  table: {
    minWidth: 1020,
    color: "#eb7204",
  },
  TableCell: {
    color: "#eb7204",
    background: "#FFFFFF",
  },
  tableWrapper: {
    overflowX: "auto",
    color: "primary",
  },
});

class EnhancedTable extends React.Component {
  constructor(props){
    super(props)
  this.state = {
    order: "asc",
    orderBy: "customer_number",
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    openAmount:0,
    shipTo:""
  };
  }
  async componentDidMount() {
    //console.log(this.props.match.params.id)
   //var temp=this.props.customer_number;
   //console.log(temp);
    let url = "http://localhost:8080/1705205/Search_Query?CustomerIdentifier="+this.props.id;
    //console.log()
   //this.state.results=
     axios.get(url)
      .then(response => {
        //const tmp=response.data;
        this.setState({data:response.data});
        console.log(response.data)
      })
      .catch(error => console.log(error));
      //console.log(this.state.results.data)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleChangeInput=(event)=> {
    console.log(event.target.value);
    this.setState({openAmount: event.target.value});
  }
  handleChangeShipTo=(event)=> {
    this.setState({shipTo: event.target.value});
  }
  handleSubmitForm=(event)=> {
    alert('A change was submitted: ' + this.state.value+this.state.shipTo);
    //event.preventDefault();
    var tmp=this.state.selected[0];
    let url = "http://localhost:8080/1705205/ModifyData?OpenAmount="+this.state.openAmount+"&ShipTo="+this.state.shipTo+"&AccDocHeaderId="+tmp;
    console.log(url);
   //this.state.results=
     axios.get(url)
      .then(response => {
        //const tmp=response.data;
        //this.setState({data:response.data});
        console.log(response)
      })
      .catch(error => console.log(error));
  }

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div><EnhancedTableToolbar numSelected={selected.length} selected={this.state.selected} handleChangeInput={this.handleChangeInput} handleSubmitForm={this.handleSubmitForm} handleChangeShipTo={this.handleChangeShipTo} csvData={this.state.data}/></div>
        
        <div className={classes.tableWrapper}>
          <Table autoid="invoice-table-customer" className={classes.table} aria-labelledby="tableTitle" style={{backgroundColor:'#252c48', color: 'white',}}>
            <EnhancedTableHead style={{backgroundColor:'#252c48', color: 'white',}}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody className="table">
              
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.acct_doc_header_id);
                  return (
                    <TableRow style={{backgroundColor:'#252c48', color: 'white',}}
                      hover
                      onClick={(event) =>
                        this.handleClick(event, n.acct_doc_header_id)
                      }
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell align="left">{n.acct_doc_header_id}</TableCell>
                      <TableCell align="left"> {n.company_id}</TableCell>
                      <TableCell align="left"> {n.document_number}</TableCell>
                      <TableCell align="left">
                        {n.document_number_norm}
                      </TableCell>
                      <TableCell align="left"> {n.business_code}</TableCell>
                      <TableCell align="left"> {n.create_year}</TableCell>
                      <TableCell align="left">
                        {n.document_line_number}
                      </TableCell>
                      <TableCell align="left"> {n.doctype}</TableCell>
                      <TableCell align="left"> {n.customer_number}</TableCell>
                      <TableCell align="left">
                        {n.customer_number_norm}
                      </TableCell>
                      <TableCell align="left">{n.fk_customer_map_id}</TableCell>
                      <TableCell align="left"> {n.customer_name}</TableCell>
                      <TableCell align="left"> {n.division}</TableCell>
                      <TableCell align="left">
                        {n.document_create_date}
                      </TableCell>
                      <TableCell align="left">
                        {n.document_create_date_norm}
                      </TableCell>
                      <TableCell align="left"> {n.posting_date}</TableCell>
                      <TableCell align="left"> {n.posting_date_norm}</TableCell>
                      <TableCell align="left"> {n.posting_id}</TableCell>
                      <TableCell align="left"> {n.due_date}</TableCell>
                      <TableCell align="left"> {n.due_date_norm}</TableCell>
                      <TableCell align="left"> {n.order_date}</TableCell>
                      <TableCell align="left"> {n.order_date_norm}</TableCell>
                      <TableCell align="left"> {n.invoice_id}</TableCell>
                      <TableCell align="left"> {n.invoice_id_norm}</TableCell>
                      <TableCell align="left">
                        {n.baseline_create_date}
                      </TableCell>
                      <TableCell align="left"> {n.invoice_date_norm}</TableCell>
                      <TableCell align="left"> {n.total_open_amount}</TableCell>
                      <TableCell align="left">
                        {n.total_open_amount_norm}
                      </TableCell>
                      <TableCell align="left">{n.cust_payment_terms}</TableCell>
                      <TableCell align="left"> {n.business_area}</TableCell>
                      <TableCell align="left"> {n.ship_date}</TableCell>
                      <TableCell align="left"> {n.ship_to}</TableCell>
                      <TableCell align="left"> {n.clearing_date}</TableCell>
                      <TableCell align="left">{n.clearing_date_norm}</TableCell>
                      <TableCell align="left"> {n.reason_code}</TableCell>
                      <TableCell align="left"> {n.isOpen}</TableCell>
                      <TableCell align="left">
                        {n.discount_due_date_norm}
                      </TableCell>
                      <TableCell align="left">
                        {n.debit_credit_indicator}
                      </TableCell>
                      <TableCell align="left"> {n.payment_method}</TableCell>
                      <TableCell align="left">
                        {n.document_creation_date}
                      </TableCell>
                      <TableCell align="left">
                        {n.invoice_amount_doc_currency}
                      </TableCell>
                      <TableCell align="left"> {n.document_id}</TableCell>
                      <TableCell align="left">{n.actual_open_amount}</TableCell>
                      <TableCell align="left"> {n.paid_amount}</TableCell>
                      <TableCell align="left"> {n.dayspast_due}</TableCell>
                      <TableCell align="left"> {n.invoice_age}</TableCell>
                      <TableCell align="left"> {n.disputed_amount}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination 
          autoid="invoice-table-pagination-customer"
          style={{backgroundColor:'#252c48', color: 'white',}}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          autoid="pagination-button-previous-customer"
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          style={{backgroundColor:'#252c48', color: 'white',}}
          autoid="pagination-button-next-customer"
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          style={{backgroundColor:'#252c48', color: 'white',}}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  backgroundColor:'#252c48', 
  color: 'white',
};

export default withStyles(styles)(EnhancedTable);