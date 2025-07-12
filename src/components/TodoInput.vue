
<template>
  <div class="flex gap-2 absolute bottom-6 left-4 right-4 bg-gray-100 hover:bg-gray-200 rounded-full transition duration-150">
    <input @keypress.enter="handleAdd()" class="flex flex-1  px-6 py-4 outline-none" v-model="input" type="text" placeholder="Ajouter une tache">
    <!-- <button @click="handleAdd()" class="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 cursor-pointer">Ajouter</button> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits(['add']);

const input = ref('');

function handleAdd () {
  emit('add', input.value);
  setTimeout(() => {
    input.value = ''
  },50);
}
</script>