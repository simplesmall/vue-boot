<template>
  <div id="app">
    <!--  登录页  -->
    <template v-if="!isLogin">
      <div class="loginWrapper">
        <div class="systemLogo">
          这是一个精心绘制的系统
        </div>
        <el-card class="loginCard">
          登录页面
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="用户名" style="margin-top: 25px">
            <el-input v-model="formLabelAlign.userName" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="formLabelAlign.validateCode" placeholder="请输入验证码" clearable></el-input>
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
        <!-- 头部和下面内容的上下布局  -->
        <div class="indexLayout">
          <div class="headerBar"><HeaderBar></HeaderBar></div>
          <!-- 左侧边栏和右边主页内容左右布局 -->
          <div class="mainContent">
            <div class="leftSideBar"><LeftSideBar></LeftSideBar></div>
            <div class="indexContent">
              <el-card class="contentCard">
                数据内容都放这显示
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </template>
    <!--<el-button @click="FetchTest">Fetch request</el-button>
    <el-button @click="AxiosTest">Axios request</el-button>-->
    <router-view/>
  </div>
</template>

<script>
import LeftSideBar from './components/common/LeftSideBar'
import HeaderBar from './components/common/HeaderBar'
export default {
  name: 'App',
  data () {
    return {
      // 是否登录状态
      isLogin: this.$store.getters.isLoginGetter,
      labelPosition: 'left',
      formLabelAlign: {
        userName: '',
        password: '',
        validateCode: ''
      }
    }
  },
  created () {
    console.log(this.isLogin)
  },
  methods: {
    // 登录部分函数
    // 点击登录
    loginBtn () {
      this.$message({
        type: 'success',
        message: '登录成功！',
        duration: 1000
      })
      this.$store.dispatch('isLoginAct', true)
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
  },
  components: {
    LeftSideBar,
    HeaderBar
  },
  watch: {
    '$store.state.isLogin': function (val) {
      this.isLogin = val
    }
  }
}
</script>

<style>
  .contentCard{
    width: 100%;
    height: 100%;
  }
  .leftSideBar{
    width: 200px;
    height: calc(100% - 100px);
  }

  .headerBar{
    height: 100px;
    width: 100%;
    /*background: green;*/
  }

  .indexContent{
    width: calc(100% - 210px);
    height: calc(100% - 7px);
    margin: 5px;
    /*padding: 5px;*/
    /*background: red;*/
  }
  .mainContent{
    width: 100%;
    height: calc(100% - 100px);
    display: flex;
    flex-direction: row;
    /*background: yellow;*/
    justify-content: space-evenly;
  }
  .indexLayout{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /*background: purple;*/
  }
  .indexWrapper{
    width: 100%;
    height: 100vh;
    background: #ebebeb;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  /*登录页样式*/
  .systemLogo{
    padding-top: 100px;
    height:110px;width: 100%;font-size: 60px;
    color: #909292;z-index: 1;
    text-shadow: -1px -1px 1px #000, 1px 1px 1px #fff;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  .validateCode{
    width: 80%;
    height: 60px;
    line-height: 60px;
    margin: 5px auto;
    border-radius: 5px;
    background: #909292;
  }
  .loginCard{
    width: 520px;
    height: 378px;
    margin: 100px auto 100px auto;
    /*padding: 30px;*/
  }
  .loginWrapper{
    width: 100%;
    height: 100vh;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: -8px;
  background: #4e5359 url('https://app.yunxin.163.com/webdemo/im/images/bg_page.png') no-repeat no-repeat 0 0;
  background-size: cover;
  /*background-position: 50% 50%;*/
  /*margin-top: -16px;*/
}
</style>
