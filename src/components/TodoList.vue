<template>
  <div class="flex flex-col gap-6 min-h-[100vh] px-4 py-4 max-w-[800px] mx-auto relative">
    <h1 class="text-2xl font-semibold">TodoList</h1>
    <TodoFilter @toggle="(e: FilterType) => handleFilterToggle(e)"/>
    <div class="flex flex-col gap-2">
      <TodoItem v-for="todo in filteredTodoList"
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo(todo)"
      @delete="handleDeleteToto(todo)"
      />
    </div>
    <TodoInput @add="(e: string) => handleAdd(e)"/>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import TodoItem, { type TodoType } from './TodoItem.vue';
import TodoInput from './TodoInput.vue';
import TodoFilter, { type FilterType } from './TodoFilter.vue';

const todoList = ref<TodoType[]>([]);
const activeFilter = ref<FilterType['id']>(1);

const filteredTodoList = computed(() => {
  if (activeFilter.value === 1) return todoList.value;
  if (activeFilter.value === 2) return todoList.value.filter((t:TodoType) => t.done === false);
  if (activeFilter.value === 3) return todoList.value.filter((t:TodoType) => t.done === true);
})

onBeforeMount(() => {
  todoList.value = getTodoListFromLocalStorage();
})

function toggleTodo (todo: TodoType) {
  todo.done = !todo.done;
  updateTodoListFromLocalStorage();
}

function handleDeleteToto (todo: TodoType) {
  const todoToDeleteIndex = todoList.value.findIndex((t:TodoType) => t.id === todo.id);
  if (todoToDeleteIndex >= 0) todoList.value.splice(todoToDeleteIndex, 1);
  updateTodoListFromLocalStorage();
}

function handleAdd(newTodoText: string) {
  const lastTodoId = todoList.value.length ? todoList.value[todoList.value.length - 1].id : 0;
  const newTodo = {
    text: newTodoText,
    done: false,
    id: lastTodoId + 1,
  }
  todoList.value.push(newTodo);
  updateTodoListFromLocalStorage();
}

function updateTodoListFromLocalStorage () {
  localStorage.setItem('todos',JSON.stringify(todoList.value) )
}

function getTodoListFromLocalStorage () {
  const todosJSON = localStorage.getItem('todos');
  if (!todosJSON) return [];
  try {
    return JSON.parse(todosJSON);
  } catch (error) {
    console.error('Erreur lors du parsing des todos:', error);
    return [];
  }
}

function handleFilterToggle (filter: FilterType) {
  activeFilter.value = filter.id;
}

</script>