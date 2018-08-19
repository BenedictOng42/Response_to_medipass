import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { camel2title } from 'utils/helper';
import uuid from 'uuid';
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 0,
      rowsPerPage: 5,
      sorting: 'none',
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.onRowsPerPageChange = this.onRowsPerPageChange.bind(this);
    this.renderTableCells = this.renderTableCells.bind(this);
    this.determineFooter = this.determineFooter.bind(this);
  }

  onChangePage(event, page) {
    this.setState({ pageNumber: page });
    this.props.onPageChange(page, this.state.rowsPerPage);
  }

  onRowsPerPageChange(event) {
    this.setState({ rowsPerPage: event.target.value, pageNumber: 0 });
    this.props.onPageChange(0, event.target.value);
  }

  renderTableCells() {
    const { items, headers } = this.props;
    let tableCells = items;
    if (this.state.sorting === 'piePrice') {
      tableCells = tableCells.sort((a, b) => a.price > b.price);
    }
    if (this.state.sorting === 'nameOfPie') {
      tableCells = tableCells.sort((a, b) => a.nameOfPie > b.nameOfPie);
    }
    return tableCells.map(row => (
      <TableRow key={uuid()}>
        {headers.map(item => <TableCell key={uuid()}>{row[item]}</TableCell>)}
      </TableRow>
    ));
  }

  determineFooter() {
    const { loading, error, classes, totalCount } = this.props;
    const { rowsPerPage, pageNumber } = this.state;
    if (loading && !error) {
      return (
        <CircularProgress
          className={classes.progress}
          size={40}
          style={{
            marginTop: '0.7rem',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        />
      );
    }
    if (!loading && error) {
      return (
        <Button
          variant="contained"
          component="span"
          className={classes.button}
          style={{ marginRight: '1rem', marginBottom: '2rem' }}
          onClick={() =>
            this.props.onPageChange(
              this.state.pageNumber,
              this.state.rowsPerPage,
            )
          }
        >
          Error: {error}. Retry?
        </Button>
      );
    }
    return (
      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={pageNumber}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={this.onChangePage}
        onChangeRowsPerPage={this.onRowsPerPageChange}
      />
    );
  }
  render() {
    const { classes, headers } = this.props;

    const headerCells = headers.map(head => (
      <TableCell key={head}>{camel2title(head)}</TableCell>
    ));

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>{headerCells}</TableRow>
          </TableHead>
          <TableBody>{this.renderTableCells()}</TableBody>
        </Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '8rem',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {this.determineFooter()}
          <div>
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              style={{ marginRight: '1rem' }}
              onClick={() => this.setState({ sorting: 'nameOfPie' })}
            >
              Sort by Pie Name
            </Button>
            <Button
              variant="contained"
              component="span"
              className={classes.button}
              style={{ marginRight: '1rem' }}
              onClick={() => this.setState({ sorting: 'piePrice' })}
            >
              Sort by Pie Price
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  headers: PropTypes.array.isRequired,
  totalCount: PropTypes.number,
  onPageChange: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default withStyles(styles)(SimpleTable);
