<template>
  <div class="add-todo">
    <input placeholder="Add todo" type="text" v-model="newTodo" @keyup="addNewTodo($event)">
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Add-todo',
  data(){
    return{
      newTodo: ''
    }
  },
  methods:{
    ...mapActions(["addTodo"]),
    addNewTodo(e){
      if(this.newTodo.trim().length > 0){
        if(e.keyCode === 13){
          this.addTodo({todo: this.newTodo, id: Math.random(), type: 'unfinished'});
          this.newTodo = '';
        }
      }
    }
  }
}
</script>


<style scoped>
.add-todo{
  margin: 8px 4px;
}
.add-todo input{
  width: calc(100% - 2px);
  outline: none;
  border: 0;
  border-bottom: 2px solid #ff9ba3;
  /* background: rgba(255,255,255,.7); */
  background: transparent;
  display: block;
  padding: 5px 0 5px 10px ;
  font-size: 18px;
  position: relative;
  bottom: 0
}
</style>
