type RecordItem = {
  id: string;
  selectedLabels: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};
type Label = {
  id: string;
  name: string;
};
