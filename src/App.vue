<template>
  <div id="app">
    <el-button @click="AxiosTest">好的</el-button>
    <el-button @click="originTest">原生请求</el-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    AxiosTest () {
      this.$fetch({
        url: '/getMe',
        method: 'get',
        params: {
          // user: 'user',
          // name: 'name'
        }
      }).then((res) => {
        if (res.code === 200) {
          console.log('Successfully!!!!!!!!!!!!!!!!!')
        }
      })
    },
    originTest () {
      this.$axios.post('/postMe').then((res) => {
        console.log('Post....', res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
