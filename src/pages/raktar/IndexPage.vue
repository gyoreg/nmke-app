<template>
  <q-page class="q-pa-md">
    <h3>Raktár</h3>

    <q-tabs class="q-mb-md" align="left" dense>
      <q-route-tab to="/raktar/eszkozok" label="Eszközök" />
      <q-route-tab to="/raktar/helyszinek" label="Helyszínek" />
    </q-tabs>

    <router-view />
  </q-page>
</template>

<script setup lang="ts">
</script>
