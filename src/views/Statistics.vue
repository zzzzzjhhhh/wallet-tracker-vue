<template>
  <div>
    <Layout>
      <Tabs classPrefix="type" :dataSource="types" :value.sync="type" />
      <Tabs classPrefix="period" :dataSource="periods" :value.sync="period" />

      <ol>
        <li v-for="(group, index) in classifiedRecords" :key="index">
          <h3 class="title">{{ dateConvert(group.date) }}</h3>
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
import dayjs from "dayjs";

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
  get classifiedRecords() {
    type Group = {
      date: string;
      records: RecordItem[];
    };

    const { records } = this;
    if (!records.length) return [];
    const recordsCopy = JSON.parse(JSON.stringify(records));
    const sortedRecords = recordsCopy.sort(
      (a: RecordItem, b: RecordItem) =>
        dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    const result: Group[] = [
      {
        date: dayjs(sortedRecords[0].createdAt).format("YYYY-MM-DD"),
        records: [sortedRecords[0]],
      },
    ];
    for (let i = 1; i < sortedRecords.length; i++) {
      const cur = sortedRecords[i];
      const last = result[result.length - 1];
      if (dayjs(cur.createdAt).format("YYYY-MM-DD") === last.date) {
        last.records.push(cur);
      } else {
        result.push({
          date: dayjs(cur.createdAt).format("YYYY-MM-DD"),
          records: [cur],
        });
      }
    }
    return result;
  }
  beforeCreate() {
    const records = JSON.parse(
      window.localStorage.getItem("recordList") || "[]"
    );
    this.$store.commit("SET_RECORDS", records);
  }
  labelString(labels: string[]) {
    return labels.length === 0 ? "无" : labels.join(",");
  }
  dateConvert(dateStr: string) {
    const date = dayjs(dateStr);
    const now = dayjs();
    const isToday = date.isSame(now, "day");
    const isYestoday = date.isSame(now.subtract(1, "day"), "day");
    const isBeforeYestoday = date.isSame(now.subtract(2, "day"), "day");
    if (isToday) return "今天";
    if (isYestoday) return "昨天";
    if (isBeforeYestoday) return "前天";
    if (date.isSame(now, "year")) return date.format("M月D日");
    return date.format("YYYY年M月D日");
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
