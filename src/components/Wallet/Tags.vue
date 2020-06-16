<template>
  <div class="tags">
    <div class="newTag">
      <button>新增标签</button>
    </div>
    <div class="current">
      <div>衣</div>
      <div>食</div>
      <div>住</div>
      <div>行</div>
    </div>
  </div>
</template>

<script>
export default { name: "Tags" };
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
      background: #d9d9d9;
      height: 24px;
      padding: 0 16px;
      border-radius: 12px;
      margin-right: 12px;
      line-height: 24px;
      margin-top: 4px;
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
