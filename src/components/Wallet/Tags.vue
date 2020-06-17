<template>
  <div class="tags">
    <div class="newTag">
      <button @click="addLabel">新增标签</button>
    </div>
    <div class="current">
      <div
        v-for="label in labels"
        :key="label"
        @click="toggle(label)"
        :class="{ selected: selectedLabels.indexOf(label) >= 0 }"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop(Array) readonly labels: string[] | undefined;
  selectedLabels: string[] = [];
  toggle(label: string) {
    const index = this.selectedLabels.indexOf(label);
    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    } else {
      this.selectedLabels.push(label);
    }
  }
  addLabel() {
    const name = window.prompt("请输入标签名");
    if (name === "") {
      window.prompt("标签名不能为空");
    } else if (this.labels) {
      this.$emit("update:labels", [...this.labels, name]);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > div {
      $bg: #d9d9d9;
      background: $bg;
      height: 24px;
      padding: 0 16px;
      border-radius: 12px;
      margin-right: 12px;
      line-height: 24px;
      margin-top: 4px;
      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }
  > .newTag {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 3px;
    }
  }
}
</style>
