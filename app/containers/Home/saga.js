import { takeEvery, put } from 'redux-saga/effects';
import request from 'utils/request';
import { updateTableSuccess, updateTableError } from './actions';
import { UPDATE_TABLE } from './constants';

// Individual exports for testing
function* updatePages({ page, rowPerPage }) {
  try {
    const rawRes = yield request(
      `/stores?_embed=pies&_start=${page * rowPerPage}&_limit=${rowPerPage}`,
      { method: 'GET' },
      'https://pie.now.sh',
    );
    const rawResult = yield rawRes.json();
    const totalCount = rawRes.headers.get('X-Total-Count');
    const result = rawResult.map(store => {
      const pieOfDay = store.pies.filter(pie => pie.isPieOfTheDay === true)[0];
      return {
        address: store.address,
        storeName: store.displayName,
        rating: store.rating,
        contactNumber: store.mobile,
        nameOfPie: pieOfDay ? pieOfDay.displayName : 'n/a',
        priceAsInt: pieOfDay ? pieOfDay.price : 0,
        price: pieOfDay ? pieOfDay.priceString : '0',
        quantity: pieOfDay ? pieOfDay.quantity : '0',
      };
    });
    yield put(
      updateTableSuccess({
        result,
        page: 1,
        totalCount: parseInt(totalCount, 10),
      }),
    );
  } catch (e) {
    yield put(updateTableError(e));
  }
}

// Root watcher
export default function* homeSaga() {
  yield takeEvery(UPDATE_TABLE, updatePages);
}
