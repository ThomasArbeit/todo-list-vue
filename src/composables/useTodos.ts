// composables/useTodos.ts
import { ref, onBeforeMount } from 'vue'

export type TodoType = {
  id: number
  text: string
  done: boolean
}

const todoList = ref<TodoType[]>([])

export function useTodos() {
  const addTodo = (text: string) => {
    const lastId = todoList.value.length
      ? todoList.value[todoList.value.length - 1].id
      : 0

    todoList.value.push({
      id: lastId + 1,
      text,
      done: false
    })

    saveToLocalStorage()
  }

  const deleteTodo = (todo: TodoType) => {
    const index = todoList.value.findIndex(t => t.id === todo.id)
    if (index !== -1) {
      todoList.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const toggleTodo = (todo: TodoType) => {
    todo.done = !todo.done
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todoList.value))
  }

  const loadFromLocalStorage = () => {
    const raw = localStorage.getItem('todos')
    if (!raw) return
    try {
      todoList.value = JSON.parse(raw)
    } catch (e) {
      console.error('Invalid todos in localStorage', e)
    }
  }

  onBeforeMount(loadFromLocalStorage)

  return {
    todoList,
    addTodo,
    deleteTodo,
    toggleTodo
  }
}
