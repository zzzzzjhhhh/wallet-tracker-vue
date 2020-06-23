<template>
  <div>
    <Layout classPrefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord" />
      <Tabs :value.sync="record.type" :dataSource="types" />
      <div class="note">
        <BaseForm
          fieldName="备注"
          placeholder="在这里输入备注"
          @update:value="onUpdateNotes"
        />
      </div>
      <Tags :selectedLabels.sync="record.selectedLabels" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Wallet/NumberPad.vue";
import BaseForm from "@/components/BaseForm.vue";
import Tags from "@/components/Wallet/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import types from "@/constants/types";

type RecordItem = {
  id: string;
  selectedLabels: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
};

@Component({
  components: { NumberPad, BaseForm, Tags, Tabs },
})
export default class Wallet extends Vue {
  record: RecordItem = this.createFreshRecordObject();
  types = types;

  createFreshRecordObject() {
    const id = Math.floor(Math.random() * 10000000).toString();
    return {
      id: id,
      selectedLabels: [],
      notes: "",
      type: "-",
      amount: 0,
    };
  }
  onUpdateNotes(notes: string) {
    this.record.notes = notes;
  }
  saveRecord() {
    this.record.createdAt = new Date().toISOString();
    this.$store.commit("ADD_RECORD", this.record);
    this.$store.commit("SAVE_RECORDS");
    this.record = this.createFreshRecordObject();
  }

  onUpdateType(type: string) {
    this.record.type = type;
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.note {
  padding: 12px 0;
}
</style>
