/**
 *
 * Home
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SimpleTable from 'components/SimpleTable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectCurrentPage,
  makeSelectTotalCount,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { updateTable } from './actions';

import reducer from './reducer';
import saga from './saga';

const HEADERS = [
  'nameOfPie',
  'price',
  'quantity',
  'storeName',
  'address',
  'rating',
  'contactNumber',
];

export class Home extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.updateTable(0, 5);
  }

  render() {
    const { currentPage, totalCount, loading, error } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        Pie Of The Day Finder
        <div>
          <SimpleTable
            items={currentPage}
            headers={HEADERS}
            totalCount={totalCount}
            page={1}
            onPageChange={(page, rowPerPage) =>
              this.props.updateTable(page, rowPerPage)
            }
            loading={loading}
            error={error}
          />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  updateTable: PropTypes.func.isRequired,
  currentPage: PropTypes.array,
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  currentPage: makeSelectCurrentPage(),
  totalCount: makeSelectTotalCount(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    updateTable: (...args) => dispatch(updateTable(...args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Home);
