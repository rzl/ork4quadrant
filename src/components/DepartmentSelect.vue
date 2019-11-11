<template>
  <div class="content">
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios
  }
}
</script>

<style scoped>

</style>
