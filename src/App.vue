<template>
  <div id="app">
    <h1>TODO LIST</h1>
    <div class="todos-lists">
      <Todos :todos="unfinished" todosTitle="unfinished" type="unfinished" />
      <Todos :todos="inprocess" todosTitle="in-process" type="inprocess" />
      <Todos :todos="finished" todosTitle="finished" type="finished" />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Todos from './components/Todos.vue'
export default {
  name: 'App',
  components: {
    Todos
  },
  computed: {
    ...mapGetters(["unfinished", "finished", "inprocess"])
  }
}
</script>


<style>
body{
  background: #333
}
h1{
  text-align: center;
  color: #eee;
}
.todos-lists{
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
