<template>
  <div class="hello">
    <HelloChild @getParent="getChildData" name="父组件向子组件传参..." />
    <br />
    <br />
    <div style="text-align:left"> {{ info }}</div>
  </div>
</template>

<script>
import HelloChild from '@/components/HelloChild'
export default {
  name: 'HelloWorld',
  data () {
    return {
      info: ''
    }
  },
  methods: {
    getChildData(msg) {
      this.info = msg;
    }
  },
  components: {
    HelloChild
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
