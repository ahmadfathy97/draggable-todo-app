<template>
  <div class="todo" :id="todo.id" @mouseenter="hovered()">
    <div>
      <textarea
        @blur="edited($event)"
        disabled
        ref="todoName"
      >
      {{todo.todo}}
      </textarea>
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
    ...mapActions(["removeTodo", "editTodo", "setTargetodoId"]),
    remove(id){
      this.removeTodo(id)
    },
    makeItEdatable(e){
      this.$refs.todoName.disabled = false;
      this.$refs.todoName.style.border = "1px dashed #0080aa"

    },
    edited(e){
      let newVal = e.target.value.trim().length > 0 ?  e.target.value : this.todo.todo;
      let newTodo = {id: this.todo.id, todo: newVal};
      this.editTodo(newTodo);
      e.target.disabled = true;
      e.target.style.border = "none";
    },
    hovered(){
      this.setTargetodoId(this.todo.id);
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
.todo div textarea{
  outline: none;
  border: 0;
  width: 90%;
  padding: 2px;
  font-size: 18px;
  word-wrap:break-word;
  word-break: break-all;
  overflow: hidden;
  cursor: grab;
  resize: none;
  max-height: 40px;
  overflow-y: auto;
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
