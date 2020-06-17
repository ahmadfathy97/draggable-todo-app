const state = ()=> ({
  todos: JSON.parse(window.localStorage.getItem('todos')) || []
});

const getters = {
  inprocess: state => state.todos.filter(todo=> todo.type === 'inprocess'),
  unfinished: state => state.todos.filter(todo=> todo.type === 'unfinished'),
  finished: state => state.todos.filter(todo=> todo.type === 'finished')
};

const actions = {
  addTodo({commit}, todo){
    // the first 'todos' is the module name :)
    let todos = [todo, ...this.state.todos.todos];
    window.localStorage.setItem('todos', JSON.stringify(todos))
    commit('add', todo);
  },
  removeTodo({commit}, id){
    let todos = this.state.todos.todos.filter( todo => todo.id != id);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    commit('remove', id);
  },
  editTodo({commit}, newTodo){
    let todos = this.state.todos.todos.map(todo=> todo.id === newTodo.id ? {id: todo.id, todo:newTodo.todo, type: todo.type} : todo);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    commit('edit', newTodo);
  },
  dragEnd({commit}, draggedTodo){
    console.log(draggedTodo, 555555555);
    let todos = this.state.todos.todos.map(todo => todo.id == draggedTodo.id ? {id: todo.id, todo: todo.todo, type: draggedTodo.type} : todo);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    commit('updateType', draggedTodo);
  }
};

const mutations = {
  add: (state, todo) => state.todos = [todo, ...state.todos],
  remove: (state, id) => {
    state.todos = state.todos.filter(todo=> todo.id !== id)
  },
  edit: (state, newTodo) => {
    state.todos = state.todos.map(todo => todo.id === newTodo.id ? {id: todo.id, todo:newTodo.todo, type: todo.type} : todo);
  },
  updateType: (state, draggedTodo) => {
    state.todos = state.todos.map(todo => todo.id == draggedTodo.id ? {id: todo.id, todo: todo.todo, type: draggedTodo.type} : todo);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};

//
// todos: [
//   {
//     id: 1,
//     todo: "test1",
//     type: "finished"
//   },
//   {
//     id: 2,
//     todo: "test2",
//     type: "finished"
//   },
//   {
//     id: 3,
//     todo: "test3",
//     type: "inprocess"
//   },
//   {
//     id: 4,
//     todo: "test4",
//     type: "inprocess"
//   },
//   {
//     id: 5,
//     todo: "test5",
//     type: "inprocess"
//   },
//   {
//     id: 6,
//     todo: "test6",
//     type: "inprocess"
//   },
//   {
//     id: 7,
//     todo: "test7",
//     type: "unfinished"
//   },
//   {
//     id: 8,
//     todo: "test8",
//     type: "unfinished"
//   }
// ]
