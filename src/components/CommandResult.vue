<template>
  <div class="label" style="margin-bottom: 10px">Result</div>
  <div
    class="code-block"
    style="display: flex; align-items: center; margin-bottom: 10px"
  >
    <div class="hover" @click="() => copyCommand()">
      {{ hasError ? "Could not generate output: invalid inputs" : command }}
    </div>
    <div style="flex-grow: 1"></div>
    <div style="margin-left: 10px; height: 24px" @click="() => copyCommand()">
      <svg
        class="icon hover"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
        ></path>
        <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path>
      </svg>
    </div>
    <div style="margin-left: 10px; height: 24px" @click="() => copyShareLink()">
      <svg
        class="icon hover"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    command: {
      type: String,
      required: true,
    },
    hasError: {
      type: Boolean,
      required: true,
    },
    copyCommand: {
      type: Function,
      required: true,
    },
    copyShareLink: {
      type: Function,
      required: true,
    },
  },
  setup() {},
});
</script>
