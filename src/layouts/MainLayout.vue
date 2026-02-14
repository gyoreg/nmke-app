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

    <q-drawer v-model="leftDrawerOpen" bordered>
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
      <div class="desktop-tabs" v-if="!isMobile && sectionTabs.length">
        <q-tabs inline-label align="left" active-color="primary" indicator-color="secondary">
          <q-route-tab
            v-for="tab in sectionTabs"
            :key="tab.to"
            :to="tab.to"
            :label="tab.label"
            :icon="tab.icon"
          />
        </q-tabs>
      </div>
      <router-view />
    </q-page-container>

    <q-footer class="text-center bg-background" elevated>
      <q-tabs
        v-if="isMobile && sectionTabs.length"
        align="justify"
        dense
        no-caps
        shrink
        active-bg-color="accent"
        indicator-color="transparent"
      >
        <q-route-tab
          v-for="tab in sectionTabs"
          :key="tab.to"
          :to="tab.to"
          :label="tab.label"
          :icon="tab.icon"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import ApplicationLink from 'src/components/ApplicationLink.vue';
import type { SectionTab } from 'src/types/sectionTab';

const route = useRoute();
const $q = useQuasar();

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

const isMobile = computed(() => $q.screen.lt.md);

const sectionTabs = computed<SectionTab[]>(() => {
  const matched = [...route.matched].reverse();
  const record = matched.find((r) => r.meta.sectionTabs);
  return record?.meta.sectionTabs ?? [];
});
</script>
