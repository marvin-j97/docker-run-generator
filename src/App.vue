<template>
  <header>
    <h4 class="title">
      <a
        href="https://docs.docker.com/engine/reference/commandline/run"
        target="_blank"
        class="hover"
        >docker run</a
      >
      command generator
    </h4>
  </header>
  <main>
    <div style="width: 550px">
      <command-generator style="margin-bottom: 40px" />
    </div>
  </main>
  <footer>
    <div>
      <a
        href="https://github.com/marvin-j97/docker-run-generator"
        target="_blank"
        class="hover"
      >
        GitHub
      </a>
    </div>
    <!-- <div style="margin-left: 10px; margin-right: 10px; opacity: 0.5">|</div>
    <div>
      <a href="#" target="_blank" class="hover">Donate</a>
    </div> -->
  </footer>
  <notification />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandGenerator from "./components/CommandGenerator.vue";
import Notification from "./components/Notification.vue";

export default defineComponent({
  name: "App",
  components: {
    CommandGenerator,
    Notification,
  },
});
</script>

<style>
* {
  box-sizing: border-box;
}

main {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.title {
  font-family: monospace;
  font-size: 1.5rem;
  text-align: center;
}

a {
  text-decoration: none;
  color: #0df;
  font-family: monospace;
  font-weight: bold;
}

.hover {
  cursor: pointer;
  transition: filter 0.1s ease-in-out;
}

.hover:hover {
  filter: brightness(0.66);
}

body {
  background: #111114;
  color: #fafafa;
  margin: 0;
}

footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #222224;
  text-align: center;
}

footer a {
  font-size: 1.25rem;
}
</style>
