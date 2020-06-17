<template>
  <div>
    <Layout classPrefix="layout">
      {{ recordList }}
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Types :type.sync="record.type" />
      <Notes @update:value="onUpdateNotes" />
      <Tags :labels.sync="tags" @update:value="onUpdateSelectedLabels" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Wallet/NumberPad.vue";
import Notes from "@/components/Wallet/Notes.vue";
import Tags from "@/components/Wallet/Tags.vue";
import Types from "@/components/Wallet/Types.vue";
import { Component, Watch } from "vue-property-decorator";

const recordList: Record[] = JSON.parse(
  window.localStorage.getItem("recordList") || "[]"
);

type Record = {
  selectedLabels: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
};

@Component({
  components: { NumberPad, Notes, Tags, Types },
})
export default class Wallet extends Vue {
  tags = ["衣", "食", "住", "行", "玩"];
  recordList: Record[] = recordList;
  record: Record = { selectedLabels: [], notes: "", type: "-", amount: 0 };

  onUpdateSelectedLabels(labels: string[]) {
    this.record.selectedLabels = labels;
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }
  saveRecord() {
    const recordCopy: Record = JSON.parse(JSON.stringify(this.record));
    recordCopy.createdAt = new Date();
    this.recordList.push(recordCopy);
  }

  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
