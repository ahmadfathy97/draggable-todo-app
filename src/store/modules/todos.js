const state = ()=> ({
  todos: JSON.parse(window.localStorage.getItem('todos')) || [],
  targetTodoId: null
});

const getters = {
  inprocess: state => state.todos.length ? state.todos.filter(todo=> todo.type === 'inprocess') : [],
  unfinished: state => state.todos.length ? state.todos.filter(todo=> todo.type === 'unfinished') : [],
  finished: state => state.todos.length ? state.todos.filter(todo=> todo.type === 'finished') : [],
  getTargetTodoId: state => state.targetTodoId,
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
    let todos = this.state.todos.todos.map(todo => todo.id == draggedTodo.id ? {id: todo.id, todo: todo.todo, type: draggedTodo.type} : todo);
    window.localStorage.setItem('todos', JSON.stringify(todos));
    commit('updateType', draggedTodo);
  },
  setTargetodoId({commit}, id){
    commit('setID', id);
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
  },
  setID: (state, id) => {state.targetTodoId = id}
};

export default {
  state,
  getters,
  actions,
  mutations
};
