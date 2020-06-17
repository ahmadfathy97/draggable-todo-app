<template>
  <div class="todo" :id="todo.id" @mouseenter="hovered()">
    <div>
      <input
        @blur="edited($event)"
        :value="todo.todo"
        disabled
        ref="todoName"
      />
      <span @click="makeItEdatable($event)">Edit</span>
      <span title="double click to Delete" @click="remove(todo.id)">X</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'Todo',
  props:["todo"],
  methods: {
    ...mapActions(["removeTodo", "editTodo"]),
    remove(id){
      console.log(id);
      this.removeTodo(id)
    },
    makeItEdatable(e){
      this.$refs.todoName.disabled = false;
      this.$refs.todoName.style.border = "2px dashed #0080aa"

    },
    edited(e){
      let newVal = e.target.value.trim().length > 0 ?  e.target.value : this.todo.todo;
      let newTodo = {id: this.todo.id, todo: newVal};
      this.editTodo(newTodo);
      e.target.disabled = true;
      e.target.style.border = "none";
    },
    hovered(){
      this.$emit('targetId', this.todo.id);
    }
  }
}
</script>


<style scoped>
.todo{
  background: #fff;
  padding: 5px;
  margin: 2px;
  font-size: 22px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: grab;
}
.todo div{
  display: flex;
  justify-content: space-between;
}
.todo div input{
  outline: none;
  border: 0;
  width: 90%;
  padding: 2px;
  font-size: 18px;
  word-wrap:break-word;
  word-break: break-all;
  overflow: hidden;
  cursor: grab;

}
.todo div span{
  display: inline-flex;
  align-items: center;
  color: #0080aa;
  padding: 5px;
  font-size: 16px;
}
.todo div span:last-child{
  color: #ff9ba3;
  font-weight: bold;
  font-family: cursive;
}
.todo div span:last-child:hover{
  color: #aa9ba3;
  cursor: pointer;
}
</style>
