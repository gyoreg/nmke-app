<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
      <q-separator class="q-my-md" />

      <div v-if="user">
        <q-button label="Logout" color="primary" @click="logout">Logout</q-button>

        <q-separator class="q-my-md" />

        <q-label>{{ user?.email }}</q-label
        ><br />
        <q-label>{{ user?.name }}</q-label
        ><br />
        <img :src="user?.picture" alt="User Picture" />
      </div>
      <div v-else>
        <GoogleLogin :callback="handleLogin" prompt />
        <q-separator class="q-my-md" />
        No user logged in
      </div>
    </div>

    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

import { decodeCredential, googleLogout } from 'vue3-google-login';

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

const user = ref<GoogleUser | null>(null);

const handleLogin = (response: { credential: string }) => {
  user.value = decodeCredential(response.credential) as GoogleUser;
  console.log('User:', user.value);

  /*
    user contains:
    - email
    - name
    - picture
    - sub (Google user ID)
  */
};

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});

function logout() {
  user.value = null;
  googleLogout();
}
</script>
