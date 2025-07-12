<template>
  <li class="flex align-items justify-between px-4 py-1 rounded bg-white">
    <div class="flex items-center gap-2" :class="{'opacity-50 line-through' : todo.done}">
      <input type="checkbox" :checked="todo.done" @change="$emit('toggle')" class="cursor-pointer"/>
      <span class="cursor-pointer hover:opacity-70" @click.stop="$emit('toggle')">
        {{ todo.text }}
      </span>
    </div>
    <button 
    class="bg-red-500 text-white hover:bg-red-600 cursor-pointer flex px-3 py-1 align-items justify-center rounded"
    @click="emit('delete')">
      X
    </button>
  </li>
</template>

<script setup lang="ts">
export type TodoType = {
  text: string,
  done: boolean,
  id: number,
}
defineProps({
  todo: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['toggle', 'delete'])

</script>