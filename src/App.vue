<template>
  <div id="app">
    <el-button @click="FetchTest">Fetch request</el-button>
    <el-button @click="AxiosTest">Axios request</el-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    FetchTest () {
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
      this.$axios.get('/axo').then((res) => {
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
