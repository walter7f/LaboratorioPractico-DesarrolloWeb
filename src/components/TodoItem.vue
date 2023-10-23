<!-- TodoItem.vue -->
<template>
    <li>
      <span @click="toggleCompletion" :class="{ completed: todo.completed }">{{ todo.text }}</span>
      <button @click="removeTodo">Eliminar</button>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object,
      removeTodo: Function,
      toggleCompletion: Function
    },
    methods: {
      removeTodo() {
        // Llamar a la función de eliminar pasando el todo como argumento
        this.$emit("remove-todo", this.todo);
      }
    }
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>
  