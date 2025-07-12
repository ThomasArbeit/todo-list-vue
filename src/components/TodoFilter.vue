<template>
  <div class="flex gap-2">
    <div
    v-for="filter in filters"
    :key="filter.id"
    class="flex px-4 py-1 cursor-pointer rounded-full"
    :class="filter.active ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-black hover:bg-gray-200'"
    @click="toggleFilter(filter)">
      {{ filter.text }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

export type FilterType = {
  active: boolean,
  text: string,
  id: number,
}

const emit = defineEmits(['toggle']);

const filters = ref([
  {
    active: true,
    text: 'toutes',
    id: 1,
  },
  {
    active: false,
    text: 'actives',
    id: 2,
  },
  {
    active: false,
    text: 'terminées',
    id: 3,
  },
]);

function toggleFilter(filter: FilterType) {
  if (filter.active) return;
  let activeFilter = filters.value.find(filter => filter.active);
  if(activeFilter) activeFilter.active = !activeFilter?.active;
  filter.active = !filter.active;
  emit('toggle', filter);
}

</script>