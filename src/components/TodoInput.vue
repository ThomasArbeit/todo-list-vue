
<template>
  <div class="flex gap-2">
    <input class="flex flex-1 bg-gray-100 rounded px-4 py-2 hover:bg-gray-200" v-model="input" type="text" placeholder="Ajouter une tache">
    <button @click="handleAdd()" class="px-4 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 cursor-pointer">Ajouter</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const emit = defineEmits(['add']);

const input = ref('')
const isLoading = ref(false);

function handleAdd () {
  isLoading.value = true;
  emit('add', input.value);
  setTimeout(() => {
    isLoading.value = false;
    input.value = ''
  },50);
}
</script>