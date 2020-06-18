<template>
  <div class="todos">
    <h2 @click="clicked()">{{todosTitle}}</h2>
    <div class="todos-container" :class="todosTitle" data-type="type">
      <AddTodo v-if="todosTitle === 'unfinished'" />
      <draggable class="list-group" group="todos" ghost-class="ghost" @add="end">
        <div v-for="todo in todos" :key="todo.id" >
          <Todo :todo="todo" />
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Todo from './Todo.vue';
import AddTodo from './AddTodo.vue';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'Todos',
  props:["todos", "todosTitle", "type"],
  components: {
    Todo,
    draggable,
    AddTodo
  },
  computed: mapGetters(["getTargetTodoId"]),
  methods:{
    ...mapActions(["dragEnd"]),
    end(){
      let updatedType = {type:this.type , id: this.getTargetTodoId }
      this.dragEnd(updatedType)
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
