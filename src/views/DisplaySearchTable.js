import React from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {Link} from 'react-router-dom'
import axios from 'axios';

let counter = 0;
function createData(acct_doc_header_id,company_id,document_number,document_number_norm,business_code,create_year,document_line_number,doctype,customer_number,customer_number_norm,fk_customer_map_id,customer_name,division,document_create_date,document_create_date_norm,posting_date,posting_date_norm,posting_id,due_date,due_date_norm,order_date,order_date_norm,invoice_id,invoice_id_norm,baseline_create_date,invoice_date_norm,total_open_amount,total_open_amount_norm,cust_payment_terms,business_area,ship_date,ship_to,clearing_date,clearing_date_norm,reason_code,isOpen,discount_due_date_norm,debit_credit_indicator,payment_method,document_creation_date,invoice_amount_doc_currency,document_id,actual_open_amount,paid_amount,dayspast_due,invoice_age,disputed_amount) {
  counter += 1;
  return { id: counter,acct_doc_header_id,company_id,document_number,document_number_norm,business_code,create_year,document_line_number,doctype,customer_number,customer_number_norm,fk_customer_map_id,customer_name,division,document_create_date,document_create_date_norm,posting_date,posting_date_norm,posting_id,due_date,due_date_norm,order_date,order_date_norm,invoice_id,invoice_id_norm,baseline_create_date,invoice_date_norm,total_open_amount,total_open_amount_norm,cust_payment_terms,business_area,ship_date,ship_to,clearing_date,clearing_date_norm,reason_code,isOpen,discount_due_date_norm,debit_credit_indicator,payment_method,document_creation_date,invoice_amount_doc_currency,document_id,actual_open_amount,paid_amount,dayspast_due,invoice_age,disputed_amount };
}
/*row.company_id,row.acct_doc_header_id,row.document_number,row.business_code,row.doctype,row.customer_number,row.fk_customer_map_id,row.customer_name,row.document_create_date,row.baseline_create_date,row.invoice_date,row.invoice_id,row.total_open_amount,row.cust_payment_terms,row.clearing_date,row.isOpen,row.ship_date,row.paid_amount,row.dayspast_due,row.document_id,row.document_create_date,row.actual_open_amount,row.invoice_age,row.invoice_amount_doc_currency)*/
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
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'acct_doc_header_id', numeric: true, disablePadding: true, label: 'Account header doc' },
  { id: 'company_id', numeric: true, disablePadding: false, label: 'COMPANY id' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'Document No' },
  { id: 'business_code', numeric: false, disablePadding: false, label: 'Business Code' },
  { id: 'doctype' ,numeric: false, disablePadding: false, label: 'Document Type' },
  { id: 'customer_number', numeric: true, disablePadding: false, label: 'Customer No.' },
  { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'Customer Map id' },
  { id: 'customer_name',text:true, disablePadding: false, label: 'Customer Name' },
  { id: 'document_create_date', Date:true, disablePadding: false, label: 'Doc Create Date' },
  { id: 'baseline_create_date', Date:true, disablePadding: false, label: 'Basline Create Date' },
  { id: 'invoice_date', Date:true, disablePadding: false, label: 'Invoice Date' },
  { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice id' },
  { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Payment Terms' },
  { id: 'clearing_date', Date:true, disablePadding: false, label: 'Clear Date' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoice' },
  { id: 'ship_date',Date:true , disablePadding: false, label: 'Shipping Date' },
  { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment amount' },
  { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days Past DueDate' },
  { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc. ID' },
  { id: 'document_create_date',Date:true, disablePadding: false, label: 'Doc. Create Date' },
  { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
  { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
  { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
  { id: '',  disablePadding: false, label: 'Pred. type' },
  { id: '',  disablePadding: false, label: 'Pred. amount' },
];

class DisplaySearchTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead >
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

DisplaySearchTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },

});

let DisplaySearchTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            INVOICE TABLE
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

DisplaySearchTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

DisplaySearchTableToolbar = withStyles(toolbarStyles)(DisplaySearchTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
  },
  table: {
    minWidth: 1020,
  
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  
});

class DisplaySearchTable extends React.Component {
    constructor(props){
        super(props);
  this.state = {
    order: 'asc',
    orderBy: 'Payment amount',
    selected: [],
    data: [],
    posts:[],
    page: 0,
    rowsPerPage: 1,
  };
  this.setState({posts:this.props.posts})
    }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

 /* componentDidMount() {
		axios
			.get('http://localhost:8080/1705205/PopulateTable')
			.then(response => {
				console.log(response)
        this.setState({posts: response.data })
        //this.posts:this.getRows(posts),
			})
			.catch(error => {
        console.log(error)
        //this.setState({errorMsg: 'Error retrieving data'})
			})
	}*/
  getRows=()=>{
    var tmp=[];
      return this.props.posts.map(row=>{
       return createData(row.acct_doc_header_id,row.company_id,row.document_number,row.document_number_norm,row.business_code,row.create_year,row.document_line_number,row.doctype,row.customer_number,row.customer_number_norm,row.fk_customer_map_id,row.customer_name,row.division,row.document_create_date,row.document_create_date_norm,row.posting_date,row.posting_date_norm,row.posting_id,row.due_date,row.due_date_norm,row.order_date,row.order_date_norm,row.invoice_id,row.invoice_id_norm,row.baseline_create_date,row.invoice_date_norm,row.total_open_amount,row.total_open_amount_norm,row.cust_payment_terms,row.business_area,row.ship_date,row.ship_to,row.clearing_date,row.clearing_date_norm,row.reason_code,row.isOpen,row.discount_due_date_norm,row.debit_credit_indicator,row.payment_method,row.document_creation_date,row.invoice_amount_doc_currency,row.document_id,row.actual_open_amount,row.paid_amount,row.dayspast_due,row.invoice_age,row.disputed_amount)
    });
    return tmp;
  }
  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    var tmp=this.getRows();
    console.log(tmp);
    console.log(data);
    this.state.data.length=0;
    //this.setState({data:[]});
    data.push(...tmp);
    //this.setState({data:this.getRows()});
    

    return (
      <Paper className={classes.root} >
        <DisplaySearchTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle" stickyHeader="true" >
            <DisplaySearchTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody >
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                      <Link to={`/customer-dashboard/${n.customer_number}`}>
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell align="right">{n.company_id}</TableCell>
                      <TableCell align="right">{n.acct_doc_header_id}</TableCell>
                      <TableCell align="right">{n.document_number}</TableCell>
                      <TableCell align="right">{n.doctype}</TableCell>
                      <TableCell align="right">{n.business_code}</TableCell>
                      <TableCell align="right">{n.customer_number}</TableCell>
 <TableCell align="right">{n.fk_customer_map_id}</TableCell>
 <TableCell align="right">{n.customer_name}</TableCell>
 <TableCell align="right">{n.document_create_date}</TableCell>
 <TableCell align="right">{n.baseline_create_date}</TableCell>
 <TableCell align="right">{n.invoice_date}</TableCell>
 <TableCell align="right">{n.invoice_id}</TableCell>
 <TableCell align="right">{n.total_open_amount}</TableCell>
 <TableCell align="right">{n.cust_payment_terms}</TableCell>
 <TableCell align="right">{n.clearing_date}</TableCell>
 <TableCell align="right">{n.isOpen}</TableCell>
 <TableCell align="right">{n.ship_date}</TableCell>
 <TableCell align="right">{n.paid_amount}</TableCell>
 <TableCell align="right">{n.dayspast_due}</TableCell>
 <TableCell align="right">{n.document_id}</TableCell>
 <TableCell align="right">{n.document_create_date}</TableCell>
 <TableCell align="right">{n.actual_open_amount}</TableCell>
 <TableCell align="right">{n.invoice_age}</TableCell>
 <TableCell align="right">{n.invoice_amount_doc_currency}</TableCell>
 <TableCell align="right">{}</TableCell>
 <TableCell align="right">{}</TableCell>
                    </TableRow>
                    </Link>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow  style={{ height: 3 * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
        
          rowsPerPageOptions={[5,10,25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

DisplaySearchTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplaySearchTable);
