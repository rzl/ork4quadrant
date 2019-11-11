<template>
  <div>
    <template v-if="canEdit">
      <div v-show="!isEdit">
        <span :style="{'color': row.type}"  @click="m_edit" >
          {{ row.text }} 
        </span>
        <el-button @click="$emit('delete')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">删除</el-button>
        <el-button @click="$emit('up')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">↑</el-button>
        <el-button @click="$emit('down')" style="float: right; padding: 3px 0;margin-left: 10px;" type="text">↓</el-button>
        <el-dropdown @command="m_handleCommand" style="float: right; padding: 3px 0;margin-left: 10px;" v-if="row.type !== undefined">
          <span class="el-dropdown-link">
            状态<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="red" style="color: red">红</el-dropdown-item>
            <el-dropdown-item command="orange" style="color: orange">橙</el-dropdown-item>
            <el-dropdown-item command="yellow" style="color: yellow">黄</el-dropdown-item>
            <el-dropdown-item command="green" style="color: green">绿</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-input ref="input" :autofocus="true" @blur="m_blur" v-show="isEdit" v-model="row.text" placeholder="请输入内容"></el-input>
      </div>
    </template>
    <div v-else>{{ row.text }}</div>

  </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      default: function() {
        return {
          text: ''
        }
      }
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  mounted() {
    if (this.edit) { this.m_edit() }
    if (this.row.edit) {
      this.m_edit()
      this.$delete(this.row, 'edit')
    }
  },
  methods: {
    m_edit() {
      this.isEdit = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    m_blur() {
      this.isEdit = false
      if (this.row.text === '') {
        this.row.text = '请输入内容'
      }
    },
    m_handleCommand(color) {
      this.row.type = color
    }
  }
}
</script>