<template>
  <div>
    <Layout>
      <div class="labels">
        <router-link
          class="label"
          v-for="label in labels"
          :key="label.id"
          :to="`/labels/edit/${label.id}`"
        >
          <span>{{ label.name }}</span>
          <Icon class="icon" name="right" color="#666" />
        </router-link>
      </div>
      <div class="btn-wrapper">
        <BaseButton @click="addLabel">新建标签</BaseButton>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({ components: { BaseButton } })
export default class Labels extends Vue {
  get labels() {
    return this.$store.state.label.labels;
  }
  beforeCreate() {
    const labels = JSON.parse(window.localStorage.getItem("labelList") || "[]");
    this.$store.commit("SET_LABELS", labels);
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
.labels {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .label {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .icon {
      color: #666;
      padding-right: 16px;
    }
  }
}
.btn-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44 - 16px;
}
</style>
