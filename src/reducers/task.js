import { fromJS } from 'immutable';
import { ARCHIVE_TASK, PIN_TASK } from 'actions/movie';

const initState = fromJS({
  tasks: [
    { id: '1', title: 'Something', state: 'TASK_INBOX' },
    { id: '2', title: 'Something more', state: 'TASK_INBOX' },
    { id: '3', title: 'Something else', state: 'TASK_INBOX' },
    { id: '4', title: 'Something again', state: 'TASK_INBOX' },
  ]
});

const taskStateReducer = taskState => {
  return (state, action) => {
    console.log('state', state);
    return {
      ...state,
      tasks: state.tasks.map(
        task => (task.id === action.id ? { ...task, state: taskState } : task)
      ),
    };
  };
}

const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

export default taskReducer;