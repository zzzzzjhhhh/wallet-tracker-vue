<template>
  <div>
    <label class="notes" :class="inputClass">
      <span class="name">{{ fieldName }}</span>
      <input
        :value="value"
        @input="onValueChange($event.target.value)"
        :placeholder="placeholder"
        type="text"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() inputClass?: string;
  @Prop({ default: "" }) readonly value!: string;

  onValueChange(val: string) {
    this.$emit("update:value", val);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  display: block;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
.notes.-fill-white {
  background: white;
}
</style>
