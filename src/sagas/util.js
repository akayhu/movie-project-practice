import { RSAA } from 'redux-api-middleware';
import { put, take, fork, call, race } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * 發送 API，加上 timeout 機制
 * @param {*} action
 * @param {*} payload
 */
export function* requestAPI(actionCreator, payload, timeoutSec = 5000) {

  // 抓取action type
  const waitActionTypes = actionCreator(payload)[RSAA].types.splice(1, 2);

  // 執行function
  yield put(actionCreator(payload));
  
  // 設兩個值，一個為正常發api回傳的值，另一個值為如果發送等待時間
  // yield race 為同時發送action，先回來的就把其餘action捨棄掉
	const { res, timeout } = yield race({
		res: take(waitActionTypes),
		timeout: delay(timeoutSec),
  });

  // 如果timeout先回來表示等太久(預設5秒)，視為api掛掉
	if (timeout) {
		console.error(res);
		throw Error('[requestAPI] execute API timeout.');
  }

	if (res.error || !res.payload) {
		console.error(res);
		throw Error('[requestAPI] execute API error.');
  }

	return res;
}