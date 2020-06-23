<template>
  <div>
    <button class="btn" v-on="$listeners"><slot /></button>
  </div>
</template>

<script>
export default { name: "BaseButton" };
</script>

<style lang="scss" scoped>
.btn {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
</style>
