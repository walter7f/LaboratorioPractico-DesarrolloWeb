<!-- App.vue -->
<template>
  <div id="app">
    <h1>Lista de Tareas</h1>
    <todo-list />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #2c3e50;
}

h1 {
  color: #42b983;
}
</style>
