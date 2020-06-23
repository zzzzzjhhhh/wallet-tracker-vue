type Record = {
  id: string;
  selectedLabels: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type State = {
  records: Record[];
  record: Record;
};
const localStorageKey = "recordList";

export const state = {
  records: [],
  record: {},
};
export const mutations = {
  ADD_RECORD(state: State, record: Record) {
    state.records.push(record);
  },
  SET_RECORD(state: State, record: Record) {
    state.record = record;
  },
  SET_RECORDS(state: State, records: Record[]) {
    state.records = records;
  },
  SAVE_RECORDS(state: State) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state.records));
  },
};
export const actions = {};
