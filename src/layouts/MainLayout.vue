<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="apps" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row items-center">
          <img
            src="~assets/logo.png"
            alt="NMKE logo for admin dashboard header"
            style="height: 32px; margin-right: 8px"
          />
          NMKE Admin
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Modulok </q-item-label>
        <ApplicationLink
          v-for="app in appsList"
          :key="app.title"
          v-bind="app"
          @clicked="leftDrawerOpen = false"
        />
      </q-list>

      <q-separator />

      <q-list>
        <q-item-label header> Fontos oldalak </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import ApplicationLink from 'src/components/ApplicationLink.vue';
// URL for custom menu icon

const appsList = [
  {
    title: 'Raktár',
    caption: 'Tárgykezelő rendszer',
    icon: `img:${new URL('../assets/custom-icons/inventory-management.svg', import.meta.url).href}`,
    page: '/raktar/',
  },
  {
    title: 'Foglalások',
    caption: 'Rendezvényfoglalások kezelése',
    icon: `img:${new URL('../assets/custom-icons/reservation-management.svg', import.meta.url).href}`,
    page: '/foglalasok',
  },
];

const linksList: EssentialLinkProps[] = [
  {
    title: 'Weboldal',
    caption: 'ungarninnuernberg.de',
    icon: `ti-world`,
    link: 'https://www.ungarninnuernberg.de',
  },
  {
    title: 'Facebook',
    caption: '/nurnbergimagyarprogramok',
    icon: `ti-facebook`,
    link: 'https://www.facebook.com/nurnbergimagyarprogramok',
  },
  {
    title: 'Youtube',
    caption: '@ungarischerkulturvereinnur784',
    icon: `ti-youtube`,
    link: 'https://www.youtube.com/@ungarischerkulturvereinnur784',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
