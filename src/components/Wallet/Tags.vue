<template>
  <div class="tags">
    <div class="newTag">
      <button @click="addLabel">新增标签</button>
    </div>
    <div class="current">
      <div
        v-for="label in labels"
        :key="label.id"
        @click="toggle(label.name)"
        :class="{ selected: selectedLabels.indexOf(label.name) >= 0 }"
      >
        {{ label.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() selectedLabels!: string[];
  get labels() {
    return this.$store.state.label.labels;
  }

  beforeCreate() {
    const labels = JSON.parse(window.localStorage.getItem("labelList") || "[]");
    this.$store.commit("SET_LABELS", labels);
  }

  toggle(label: string) {
    const index = this.selectedLabels.indexOf(label);
    if (index >= 0) {
      this.selectedLabels.splice(index, 1);
    } else {
      this.selectedLabels.push(label);
    }
    this.$emit("update:value", this.selectedLabels);
  }
  createFreshLabelObject() {
    const id = Math.floor(Math.random() * 10000000).toString();
    return {
      id: id,
      name: "",
    };
  }
  addLabel() {
    const name = window.prompt("请输入标签");
    const labelNames = this.labels.map(
      (label: { id: string; name: string }) => label.name
    );
    if (name) {
      if (labelNames.indexOf(name) >= 0) {
        window.alert("标签名重复, 请重新添加");
      } else {
        window.alert("添加成功");
        const label = this.createFreshLabelObject();
        label.name = name;
        this.$store.commit("ADD_LABEL", label);
        this.$store.commit("SAVE_LABELS");
      }
    } else if (name === "") {
      window.alert("标签名不能为空");
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
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
