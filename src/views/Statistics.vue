<template>
  <div>
    <Layout>
      <Tabs classPrefix="type" :dataSource="types" :value.sync="type" />
      <Tabs classPrefix="period" :dataSource="periods" :value.sync="period" />

      <ol>
        <li v-for="(group, index) in res" :key="index">
          <h3 class="title">{{ group.title }}</h3>
          <ol>
            <li class="record" v-for="record in group.records" :key="record.id">
              <span>{{ labelString(record.selectedLabels) }}</span>
              <span class="notes">{{ record.notes }}</span>
              <span>¥{{ record.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import types from "@/constants/types";
import periods from "@/constants/periods";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  periods = periods;
  period = "day";
  types = types;
  type = "-";
  get records() {
    return this.$store.state.record.records;
  }
  get res() {
    type hashValue = {
      title: string;
      records: RecordItem[];
    };

    const { records } = this;
    const hash: {
      [key: string]: hashValue;
    } = {};
    for (let i = 0; i < records.length; i++) {
      const [date, time] = records[i].createdAt.split("T");
      hash[date] = hash[date] || { title: date, records: [] };
      hash[date].records.push(records[i]);
    }
    return hash;
  }
  beforeCreate() {
    const records = JSON.parse(
      window.localStorage.getItem("recordList") || "[]"
    );
    this.$store.commit("SET_RECORDS", records);
  }
  labelString(labels: Label[]) {
    return labels.length === 0 ? "无" : labels.join(",");
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .period-tabs-item {
    height: 48px;
  }
}
%record {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %record;
}
.record {
  @extend %record;
  background: white;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>
