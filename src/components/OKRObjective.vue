<template>
  <div class="okr_object_main" style="padding: 5px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>OKR</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 2" :key="o" class="text item">
        {{'目标 ' + o }}
      </div>
    </el-card>
  </div>
</template>
<script>
export default {

}
</script>

<style>
  .okr_object_main .el-card__header {
    background: #4dc86f
  }
</style>