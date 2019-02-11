import { fromJS } from 'immutable';
import { UPDATE_TEST, CLEAR_TEST } from '../actions/test';

const initState = fromJS({
	test: {
		hasData: false,
		rawData: null,
	}
});


const TestReducer = (state = initState, action) => {
	switch (action.type) {
		case UPDATE_TEST:
			return state.update('hasData', value => true).update('rawData', value => '666');
    case CLEAR_TEST:
      return state.update('hasData', value => false).update('rawData', value => null);
		default:
			return state;
	}
};

export default TestReducer;