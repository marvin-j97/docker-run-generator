<template>
  <button class="button hover" :style="style">
    <slot />
  </button>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    color: {
      required: false,
      type: String,
      default: "#505050",
    },
  },
  setup(props) {
    const { color } = toRefs(props);

    const style: ComputedRef<any> = computed(() => ({
      "background-color": color.value,
    }));

    return {
      style,
    };
  },
});
</script>

<style>
.button {
  padding: 7px 8px 7px 8px;
  appearance: none;
  border: none;
  display: inline-block;
  font-size: 1rem;
  font-family: monospace;
  border-radius: 4px;
  min-width: 60px;
}
</style>
