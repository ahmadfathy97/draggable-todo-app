<template>
  <div class="todos">
    <h2>{{todosTitle}}</h2>
    <div class="todos-container" :class="todosTitle" data-type="type">
      <draggable class="list-group" group="todosTitle" ghost-class="ghost" @end="update($event)">

        <div v-for="todo in todos" :key="todo.id" >
          <Todo :todo="todo" />
        </div>
      </draggable>
      <AddTodo v-if="todosTitle === 'unfinished'" />
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Todo from './Todo.vue';
import AddTodo from './AddTodo.vue';
import {mapActions} from 'vuex';
export default {
  name: 'Todos',
  props:["todos", "todosTitle", "type"],
  components: {
    Todo,
    draggable,
    AddTodo
  },
  methods:{
    ...mapActions(["dragEnd"]),
    update(e){
      console.log(e);
      // this.dragEnd()
    }
  }
}
</script>


<style scoped>
h2{
  font-family:monospace;
  color: #eee;
  text-align: center;
}
.todos{
  width: 32%;
}
.todos-container{
  padding: 20px 5px;
  background: #eee;
  margin: 5px 20px;
  box-shadow: 0 0 5px #222;
  border-radius: 15px;
  min-height: 200px;
}
.unfinished{
  background: #ffdadd
}
.in-process {
  background: #bbecfc
}
.finished{
  background: #c5ffdb

}
@media (max-width: 1000px){
  .todos{
    width: 90%;
  }
}
</style>
