<template>
  <div id="app">
    <!--  登录页  -->
    <template v-if="!isLogin">
      <div class="loginWrapper">
        <el-card class="loginCard">
          登录页面
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名" style="margin-top: 25px">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
          <div class="validateCode">验证码显示块</div>
          <el-row>
            <el-button round type="primary">注册</el-button>
            <el-button round type="success" @click="loginBtn">登录</el-button>
          </el-row>
        </el-card>
      </div>
    </template>
    <!--  系统首页   -->
    <template v-else-if="isLogin">
      <div class="indexWrapper">
        Index page
        <el-button @click="logoutBtn">退出登录</el-button>
      </div>
    </template>
    <!--<el-button @click="FetchTest">Fetch request</el-button>
    <el-button @click="AxiosTest">Axios request</el-button>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // 是否登录状态
      isLogin: false,
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  created () {
    console.log(this.isLogin)
  },
  methods: {
    loginBtn () {
      this.isLogin = true
    },
    logoutBtn () {
      this.isLogin = false
    }
    /* FetchTest () {
      this.$fetch({
        url: '/api/s?wd=好玩&pn=70&oq=好玩&ie=utf-8&usm=1&rsv_pq=eb42c8e40000898e&rsv_t=0f11KvFYYzLxo9ixfH3TVLi5S9Mx9QH84PME77AZ7aEgJDH8HtlBa9GaDrA',
        method: 'get'
      }).then((res) => {
        console.log('Successfully before........')
        if (res.code === 200) {
          console.log('Successfully!!!!!!!!!!!!!!!!!')
        }
      })
    },
    AxiosTest () {
      this.$fetch({
        url: '/zhihu/question/423915705/answer/1574497398',
        method: 'get'
      }).then((res) => {
        console.log('Successfully before........')
        console.log(res)
        if (res.code === 200) {
          console.log('Successfully!!!!!!!!!!!!!!!!!')
        }
      })
    } */
  }
}
</script>

<style>
  .indexWrapper{
    width: 100%;
    height: 100vh;
  }
  .validateCode{
    width: 80%;
    height: 60px;
    line-height: 60px;
    margin: 5px auto;
    background: hotpink;
  }
  .loginCard{
    width: 520px;
    height: 378px;
    margin: 200px auto;
    /*padding: 30px;*/
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -16px;
}
</style>
