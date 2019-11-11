<template>
  <div class="okr_main">
    <el-row class="panel">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>OKR</span>
          <el-button @click="m_add_o" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">目标</el-button>
          <el-button @click="m_add_kr" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">关键结果</el-button>
        </div>
        <div v-for="(o, k) in okr.o " :key="'o' + k" class="text item">
          <InputText @delete="m_delete(okr.o, o, k)" @up="m_up(okr.o, o, k)" @down="m_down(okr.o, o, k)" :row="o"></InputText>
        </div>
        <div v-for="(o, k) in okr.kr " :key="'kr' + k" class="text item">
          <InputText @delete="m_delete(okr.kr, o, k)" @up="m_up(okr.kr, o, k)" @down="m_down(okr.kr, o, k)" :row="o"></InputText>
        </div>
      </el-card>
    </el-row>
    <el-row class="panel">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>FOCUS</span>
          <el-button @click="m_add_foucus('p1')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">P1</el-button>
          <el-button @click="m_add_foucus('p2')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">P2</el-button>
          <el-button @click="m_add_foucus('p3')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">P3</el-button>
        </div>
        <div v-for="(o, k) in okr.foucus " :key="k" class="text item">
          <InputText @delete="m_delete(okr.foucus, o, k)" @up="m_up(okr.foucus, o, k)" @down="m_down(okr.foucus, o, k)" :row="o"></InputText>
        </div>
      </el-card>
    </el-row>
    <el-row class="panel">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>FUTRUE</span>
          <el-button @click="m_add_future" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">计划</el-button>
        </div>
        <div v-for="(o,k) in okr.future " :key="k" class="text item">
          <InputText @delete="m_delete(okr.future, o, k)" @up="m_up(okr.future, o, k)" @down="m_down(okr.future, o, k)" :row="o"></InputText>
        </div>
      </el-card>
    </el-row>
    <el-row class="panel">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>STATUS</span>
          <el-button @click="m_add_state('red')" style="float: right; padding: 3px 0;margin-left: 10px; color: red" type="text">红</el-button>
          <el-button @click="m_add_state('orange')" style="float: right; padding: 3px 0;margin-left: 10px; color: orange" type="text">橙</el-button>
          <el-button @click="m_add_state('yellow')" style="float: right; padding: 3px 0;margin-left: 10px; color: yellow" type="text">黄</el-button>
          <el-button @click="m_add_state('green')" style="float: right; padding: 3px 0;margin-left: 10px; color: green" type="text">绿</el-button>
        </div>
        <div v-for="(o, k) in okr.state" :key="k" class="text item">
          <InputText @delete="m_delete(okr.state, o, k)" @up="m_up(okr.state, o, k)" @down="m_down(okr.state, o, k)" :row="o"></InputText>
        </div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import InputText from './InputText'
export default {
  components: {
    InputText
  },
  props: {
    okr: {
      type: Object,
      default: function() {
        return {
          o: [{text: '目标:目标1'}],
          kr: [{text: '关键结果:结果1'}, {text: '关键结果:结果2'}],
          state: [{text: '状态1', type: 'green'}, {text: '状态2', type: 'yellow'}],
          foucus: [{text: 'p1:任务1'}, {text: 'p2:任务2'}],
          future: [{text: '未来计划1'}, {text: '未来计划2'}],
        }
      }
    }
  },
  methods: {
    m_add_o() {
      this.okr.o.push({text: '目标:', edit: true})
    },
    m_add_state(color) {
      this.okr.state.push({text: '状态', type: color, edit: true})
    },
    m_add_foucus(type) {
      this.okr.foucus.push({text: type + ':', edit: true})
    },
    m_add_kr() {
      this.okr.kr.push({text: '关键结果:', edit: true})
    },
    m_add_future() {
      this.okr.future.push({text: '计划', edit: true})
    },
    m_delete(arr, o, k){
      arr.splice(k,1)
    },
    m_up(arr, o, k) {
      console.log(arr, o, k)
      if (k === 0) { return this.$message.warning('到顶了') }
      arr.splice(k - 1, 0, o)
      arr.splice(k + 1, 1)
    },
    m_down(arr, o, k) {
      if (k === arr.length - 1) { return this.$message.warning('到底了') }
      arr.splice(k + 2, 0, o)
      arr.splice(k, 1)
    }
  }
}
</script>

<style scoped>
  .text.item {
    padding: 4px;
  }
  .panel {
    padding: 5px;
  }
</style>
<style>
  .okr_main .el-card__header {
    background: #4dc86f
  }
</style>