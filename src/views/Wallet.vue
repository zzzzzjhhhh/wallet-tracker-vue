<template>
  <div>
    <Layout classPrefix="layout">
      <NumberPad />
      <Types />
      <Notes />
      <Tags />
    </Layout>
  </div>
</template>

<script lang="ts">
import NumberPad from "@/components/Wallet/NumberPad.vue";
import Notes from "@/components/Wallet/Notes.vue";
import Tags from "@/components/Wallet/Tags.vue";
import Types from "@/components/Wallet/Types.vue";

export default {
  name: "Wallet",
  components: { NumberPad, Notes, Tags, Types },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
