<template>
  <div>
    <div
      v-if="!hideLabel"
      class="label"
      style="margin-bottom: 5px; position: relative"
    >
      {{ label || placeholder }}
    </div>
    <input
      class="code-block"
      type="text"
      v-model="innerValue"
      :placeholder="placeholder"
      @input="updateByEvent"
      style="width: 100%"
      :class="{ error }"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <div v-else-if="hint" class="hint">
      {{ hint }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, toRefs } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: String,
    },
    label: {
      required: false,
      type: String,
    },
    hint: {
      required: false,
      type: String,
    },
    error: {
      required: false,
      type: String,
    },
    hideLabel: {
      required: false,
      type: Boolean,
      default: false,
    },
    placeholder: String,
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const innerValue = ref(modelValue.value);

    function update(value: string) {
      emit("update:modelValue", value);
    }

    function updateByEvent(ev: any) {
      const event = <KeyboardEvent>ev;
      update((<HTMLInputElement>event.target).value);
    }

    watch(modelValue, (value) => (innerValue.value = value));

    return { innerValue, update, updateByEvent };
  },
});
</script>

<style>
.error-message {
  color: #ff3f55 !important;
  margin-top: 5px;
  font-size: 1rem;
  font-family: monospace;
}

.hint {
  margin-top: 5px;
  font-size: 1rem;
  font-family: monospace;
  opacity: 0.4 !important;
}

input.error {
  border-left: 4px solid #ff3f55;
}

input:focus {
  background: #282828;
}

input:hover {
  filter: brightness(0.9);
}

textarea,
input {
  outline: none;
  transition: background-color 0.1s ease;
  transition: border-color 0.15s ease;
  transition: filter 0.1s ease;
  border: none;
  border-left: 4px solid transparent;
}
</style>
