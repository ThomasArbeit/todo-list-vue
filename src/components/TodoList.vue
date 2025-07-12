<template>
  <div class="flex flex-col gap-6 min-h-[100vh] px-4 py-4 max-w-[800px] mx-auto relative">
    <h1 class="text-2xl font-semibold">TodoList</h1>
    <TodoFilter @toggle="(e: FilterType) => handleFilterToggle(e)"/>
    <div class="flex flex-col gap-2">
      <TodoItem v-for="todo in filteredTodoList"
      :key="todo.id"
      :todo="todo"
      @toggle="toggleTodo(todo)"
      @delete="deleteTodo(todo)"
      />
    </div>
    <TodoInput @add="(e: string) => addTodo(e)"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TodoItem, { type TodoType } from './TodoItem.vue';
import TodoInput from './TodoInput.vue';
import TodoFilter, { type FilterType } from './TodoFilter.vue';
import { useTodos } from '../composables/useTodos';
const { todoList, addTodo, deleteTodo, toggleTodo } = useTodos()

const activeFilter = ref<FilterType['id']>(1);

const filteredTodoList = computed(() => {
  if (activeFilter.value === 1) return todoList.value;
  if (activeFilter.value === 2) return todoList.value.filter((t:TodoType) => t.done === false);
  if (activeFilter.value === 3) return todoList.value.filter((t:TodoType) => t.done === true);
})

function handleFilterToggle (filter: FilterType) {
  activeFilter.value = filter.id;
}

</script>