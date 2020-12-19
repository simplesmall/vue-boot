<template>
  <div class="headerBar">
    头部放置系统图标，设置等
    <router-link to="/demo">
      <a href="/demo">数据测试</a>
    </router-link>
    <el-button @click="logout">退出登录</el-button>
    <el-button @click="drawer = true" type="warning" style="margin-left: 16px;">
      点我打开
    </el-button>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <SysSettingIndex></SysSettingIndex>
    </el-drawer>

  </div>
</template>

<script>
/**
   * Created by 简小
   * Created on lucky 2020/12/19  20:51
   */
import SysSettingIndex from '../../views/SysSetting/SysSettingIndex'

export default {
  name: 'HeaderBar',
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$message({
        type: 'info',
        message: '退出登录',
        duration: 2000
      })
      this.$store.dispatch('isLoginAct', false)
      this.$router.push('/')
    }
  },
  components: {
    SysSettingIndex
  }
}
</script>

<style scoped>
  .headerBar {
    width: 100%;
    height: 100px;
    background: lightskyblue;
  }
</style>
