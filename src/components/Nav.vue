<template>
  <nav>
    <router-link to="/wallet" class="item" active-class="selected">
      <Icon name="money" width="3em" height="3em" />
      记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="labels" width="3em" height="3em" />
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="chart" width="3em" height="3em" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
export default { name: "Nav" };
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  > .item.selected {
    color: $color-highlight;
  }
}
</style>
