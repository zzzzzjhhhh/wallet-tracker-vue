<template>
  <Layout>
    <div class="nav-bar">
      <Icon class="left-icon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
    </div>
    <BaseForm
      :value="label.name"
      @update:value="updateLabel"
      fieldName="标签名"
      placeholder="在这里输入标签名"
      inputClass="-fill-white"
    />
    <div class="btn-wrapper">
      <BaseButton @click="removeLabel">删除标签</BaseButton>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout.vue";
import BaseForm from "@/components/BaseForm.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "EditLabe",
  components: { Layout, BaseForm, BaseButton },

  data() {
    return {
      label: {
        type: Object,
        default: { id: "", name: "" },
      },
    };
  },
  methods: {
    updateLabel(name) {
      this.label.name = name;
      const id = this.label.id;
      const labels = this.$store.state.label.labels;
      const newLabel = labels.find(label => label.id === id);
      newLabel.name = name;
      this.$store.commit("SAVE_LABELS");
    },
    removeLabel() {
      const id = this.label.id;
      const labels = this.$store.state.label.labels;
      const newLabels = labels.filter(label => label.id !== id);
      this.$store.commit("SET_LABELS", newLabels);
      this.$store.commit("SAVE_LABELS");
      this.$router.back();
    },
    goBack() {
      this.$router.back();
    },
  },
  created() {
    const id = this.$route.params.id;
    const labels = JSON.parse(window.localStorage.getItem("labelList") || "[]");
    const label = labels.find(label => label.id.toString() === id);
    if (label) {
      this.label = label;
    } else {
      this.$router.replace("/404");
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  text-align: center;
  padding: 12px 16px;
  background: white;
  position: relative;
  margin-bottom: 8px;
  > .left-icon {
    position: absolute;
  }
}
.btn-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44 - 16px;
}
</style>
