<template>
  <div id="home" class="home">
    <div style="overflow:hidden; position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;">
      <el-row style="padding: 10px;position: relative;z-index: 1;">
        <el-button size="mini" @click="dialogVisible = true ">选择</el-button>
        <el-button size="mini" >保存</el-button>
        <el-button size="mini" >发布</el-button>
      </el-row>
      <div style="height: 28px;">
        <div style="width: 50%; display: inline-block;">
          <el-button size="mini" @click="okrHistroy = false" style="width: 100%">当前</el-button>
        </div>
        <div style="width: 50%; display: inline-block;">
          <el-button size="mini" @click="okrHistroy = true" style="width: 100%">历史</el-button>
        </div>
      </div>
      <div style="position: absolute;top: 76px;left: 0px;right: 0px;bottom: 0px;">
        <el-row v-show="!okrHistroy " style="overflow: auto; height: 100%;width: 100%;">
          <OKR4Q></OKR4Q>
        </el-row>
        <div v-show="okrHistroy" style="height: 100%; overflow: auto; height: 100%"> 
          <OKRObjective></OKRObjective>
          <OKRObjective></OKRObjective>
          <OKRObjective></OKRObjective>
          <OKRObjective></OKRObjective>
          <OKRObjective></OKRObjective>
          <OKRObjective></OKRObjective>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="100%"
      top="0"
      >
      <el-select v-model="value" placeholder="OKR类型" style="width: 100%; padding-bottom: 5px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择部门" style="width: 100%; padding-bottom: 5px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div style="width: 100%; padding-bottom: 5px;">
        <el-button style="width: 100%">查看部门ORK</el-button>
      </div>
      <el-select v-model="value" placeholder="请选择人员" style="width: 100%; padding-bottom: 5px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div style="width: 100%; padding-bottom: 5px;">
        <el-button style="width: 100%;">查看人员ORK</el-button>
      </div>
      <div style="width: 100%; padding-bottom: 5px;">
        <el-button style="width: 100%;">我的</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import OKR4Q from '@/components/OKR4Q.vue'
import OKRObjective from '@/components/OKRObjective.vue'

export default {
  name: 'home',
  components: {
    OKR4Q,
    OKRObjective
  },
  data() {
    return {
      okrHistroy: false,
      dialogVisible: false,
      value: '',
      options: [{
          value: '选项1',
          label: '黄金糕'
      }]
    }
  }

}
</script>

<style>
  .home {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .el-tabs__content {
    height: 100%;
  }
  .el-tab-pane {
    height: 100%;
  }
</style>
