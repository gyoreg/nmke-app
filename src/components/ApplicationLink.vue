<template>
  <q-item clickable tag="a" v-if="!isExternal" :to="page" @click="onClick">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item clickable v-else tag="a" :href="page || '#'" target="_blank" rel="noopener noreferrer" @click="onClick">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption><q-icon name="public" /> {{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'clicked'): void
}>()

function onClick() {
  emit('clicked')
}

export interface ApplicationLinkProps {
  title: string;
  caption?: string;
  page?: string;
  icon?: string;
  isExternal?: boolean;
}

withDefaults(defineProps<ApplicationLinkProps>(), {
  caption: '',
  page: '',
  icon: '',
  isExternal: false,
});
</script>
