<template>
  <div>
    <svg class="icon" :width="width" :height="height" v-on="$listeners">
      <use :xlink:href="'#' + name" />
    </svg>
  </div>
</template>

<script lang="ts">
const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}
export default {
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: "1em",
    },
    height: {
      type: [Number, String],
      default: "1em",
    },
  },
  name: "Icon",
};
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
