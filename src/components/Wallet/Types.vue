<template>
  <div class="types">
    <div class="selected">支出</div>
    <div>收入</div>
  </div>
</template>

<script lang="ts">
export default { name: "Types" };
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  > div {
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
