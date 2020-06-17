<template>
  <div class="todos">
    <h2>{{todosTitle}}</h2>
    <div class="todos-container" :class="todosTitle" data-type="type">
      <AddTodo v-if="todosTitle === 'unfinished'" />
      <draggable class="list-group" group="todos" ghost-class="ghost" @add="end">
        <div v-for="todo in todos" :key="todo.id" >
          <Todo :todo="todo" @targetId="changeTargetId"/>
        </div>
      </draggable>
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
  data(){
    return{
      targetId: null
    }
  },
  computed:{
    targetElementId(){
      return this.targetId
    }
  },
  methods:{
    ...mapActions(["dragEnd"]),
    end(){
      console.log(this.targetElementId, this.targetId);
      let updatedType = {type:this.type , id: this.targetElementId }
      console.log(updatedType);
      this.dragEnd(updatedType)
    },
    changeTargetId(id){
      console.log(id);
      this.targetId = id;
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
