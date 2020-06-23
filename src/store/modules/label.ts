type Label = {
  id: string;
  name: string;
};
type State = {
  labels: Label[];
  label: Label;
};
const localStorageKey = "labelList";
export const state = {
  labels: [],
  label: {},
};
export const mutations = {
  ADD_LABEL(state: State, label: Label) {
    state.labels.push(label);
  },
  SET_LABEL(state: State, label: Label) {
    state.label = label;
  },
  SET_LABELS(state: State, labels: Label[]) {
    state.labels = labels;
  },
  SAVE_LABELS(state: State) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(state.labels));
  },
};
export const actions = {};
export const getters = {
  getLabelById: (state: State) => (id: string) =>
    state.labels.find(label => label.id === id),
};
