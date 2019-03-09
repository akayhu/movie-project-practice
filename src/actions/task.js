export const ARCHIVE_TASK = 'ARCHIVE_TASK';
export const actionTask = (id) => ({
  type: ARCHIVE_TASK,
  id
});

export const PIN_TASK = 'PIN_TASK';
export const pinTask = (id) => ({
  type: PIN_TASK,
  id
});