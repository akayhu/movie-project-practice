import { fromJS, Record, is } from 'immutable';
import { PROCESSING_START, PROCESSING_END } from 'actions/process';

// [{ level: ...., key: ..... }]
export const createProcess = Record({
	level: 'global',
	key: '',
});

export const initState = fromJS({
	processing: [], // 正在處理中的 process
	history: [], // process 處理紀錄
});

const ProcessReducer = (state = initState, action) => {
	switch (action.type) {
		case PROCESSING_START: {
			const { key, level } = action;
			const model = createProcess({ key, level });
			return state.updateIn(['processing'], processes =>
				processes.filter(process => !is(process, model)).push(model)
			);
		}

		case PROCESSING_END: {
			const { key, level } = action;
			const model = createProcess({ key, level });
			const nextState = state.updateIn(['processing'], processes =>
				processes.filter(process => !is(process, model))
			);
			if (is(nextState, state)) return state;
			return nextState.updateIn(['history'], processes =>
				processes.push(model)
			);
		}

		default:
			return state;
	}
};

export default ProcessReducer;