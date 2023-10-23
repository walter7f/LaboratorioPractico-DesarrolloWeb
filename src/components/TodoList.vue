<!-- TodoList.vue -->
<template>
    <div>
      <h1>Laboratorio práctico final "Desarrollo Web" UMG</h1>
      <div class="centered-div">
        <ul>
          <li v-for="todo in todos" :key="todo.id" :class="{ 'completed': todo.status === 0 }">
            <span v-if="!todo.editing">
              <span>Articulo: {{ todo.text }}</span>
              <span>Cantidad: {{ todo.cantidad }}</span>
            </span>
            <input v-if="todo.editing" v-model="todoEditText" @keyup.enter="saveUpdate(todo)" />
            <input v-if="todo.editing" v-model.number="todoEditCantidad" @keyup.enter="saveUpdate(todo)" placeholder="Cantidad" />
            <button v-if="!todo.editing" @click="toggleCompletion(todo)"><img src="@/assets/garrapata.png" alt="icon "></button>
            <button v-if="!todo.editing" @click="deleteTodo(todo)"><img src="@/assets/borrar.png" alt="icnon"></button>
            <button v-if="!todo.editing" @click="startEditing(todo)"><img src="@/assets/actualizar.png" alt="icon "></button>
            <button v-if="todo.editing" @click="saveUpdate(todo)"><img src="@/assets/actualizar.png" alt="icon "></button>
          </li>
        </ul>
        <div class="form">
          <input v-model="newTodo" placeholder="Nuevo Articulo" />
          <input v-model.number="newTodoCantidad" placeholder="Cantidad" />
          <button @click="addTodo"><img src="@/assets/agregar-archivo.png" alt="icon"></button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      const todos = ref([]);
      const newTodo = ref("");
      const newTodoCantidad = ref(0);
      const todoEditText = ref("");
      const todoEditCantidad = ref(0);
  
      const fetchTodos = () => {
        axios.get("http://localhost:2000/todos").then((response) => {
          todos.value = response.data.map((todo) => ({ ...todo, editing: false }));
        });
      };
  
      const addTodo = () => {
        if (newTodo.value.trim() === "" || newTodoCantidad.value === 0) return;
  
        axios.post("http://localhost:2000/todos", { text: newTodo.value, cantidad: newTodoCantidad.value }).then(() => {
          fetchTodos();
          newTodo.value = "";
          newTodoCantidad.value = 0;
        });
      };
  
      const deleteTodo = (todo) => {
        axios.delete(`http://localhost:2000/todos/${todo.id}`).then(() => {
          fetchTodos();
        });
      };
  
      const toggleCompletion = (todo) => {
        const newStatus = todo.status === 1 ? 0 : 1;
        if (newStatus === 0) {
        } else {
          todo.editing = false;
        }
        axios.put(`http://localhost:2000/todos/${todo.id}`, { status: newStatus }).then(() => {
          fetchTodos();
        });
      };
  
      const startEditing = (todo) => {
        todo.editing = true;
        todoEditText.value = todo.text;
        todoEditCantidad.value = todo.cantidad;
      };
  
      const saveUpdate = (todo) => {
        axios.put(`http://localhost:2000/todos/update/${todo.id}`, { text: todoEditText.value, cantidad: todoEditCantidad.value }).then(() => {
          todo.text = todoEditText.value;
          todo.cantidad = todoEditCantidad.value;
          todo.editing = false;
          fetchTodos();
        });
      };
  
      onMounted(() => {
        fetchTodos();
      });
  
      return {
        todos,
        newTodo,
        newTodoCantidad,
        todoEditText,
        todoEditCantidad,
        addTodo,
        deleteTodo,
        toggleCompletion,
        startEditing,
        saveUpdate,
      };
    },
  };
  </script>
  <style>

  ul {
    padding: 5rem;
    margin-top: 10px;
    background-color: rgb(8, 33, 72);
    border-radius: 20px;
    height: auto;
    width: 25rem;
  }
  
  li {
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    background-color: #6a044a;
    border-radius: 10px;
  }
  
  button {
    cursor: pointer;
    margin-right: 2px;
    border-radius: 5px;
    width: 2.5rem;
    height: 2rem;
    background-color: rgb(109, 90, 7);
  }
  
  input {
    width: 8rem;
    height: 1.5rem;
    border-radius: 10px;
    margin-right: 60px;

  }
  
  span{
    width: 15rem;
    background-color: #6a044a;
    color: aliceblue;
    text-align: left;
    display:inline-flex;
    flex-direction: column;
  }
  .form{
    background-color: #064848;
    height: 4rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.centered-div {
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Estilos del div que quieres centrar */
}

  .completed {
    text-decoration: line-through double;
    color: #050404;
  }
  h1{
    color: #42b983;
    text-align: center;
    font-size: 50px;
  }
  img {
  width: 24px; /* Tamaño del icono */
  height: 24px;
  margin-right: 8px; /* Márgenes, etc. */
}
  </style>
  