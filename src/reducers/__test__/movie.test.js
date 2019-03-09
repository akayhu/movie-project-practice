import Immutable from 'immutable';
import reducer from 'reducers/movie';
import { CHANGE_TEST_STATUS } from 'actions/movie';


describe('進行測試', () => {

  it('測試 testData 為 true 狀態', () => {
    const action = {
      type: CHANGE_TEST_STATUS,
      status: true
    };
    expect(reducer(undefined, action)).toEqual(
			Immutable.fromJS({
				movieData: {
          latestData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
          hotData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
          freeData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
        },
        testData: {
          content: true
        }
			})
		);
  });

  it('測試 testData 為 false 狀態', () => {
    const action = {
      type: CHANGE_TEST_STATUS,
      status: false
    };
    expect(reducer(undefined, action)).toEqual(
			Immutable.fromJS({
				movieData: {
          latestData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
          hotData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
          freeData: {
            dataList: [],
            hasNext: false,
            offset: 0,
            total: 0
          },
        },
        testData: {
          content: false
        }
			})
		);
  });

})