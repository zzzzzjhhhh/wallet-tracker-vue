<template>
  <div class="tabs">
    <div
      v-for="item in dataSource"
      :key="item.value"
      class="tabs-item"
      :class="{
        selected: item.value === value,
        [classPrefix + '-tabs-item']: classPrefix,
      }"
      @click="select(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type dataItem = {
  text: string;
  value: string;
};
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: dataItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;

  select(item: dataItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  &-item {
    width: 50%;
    text-align: center;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
