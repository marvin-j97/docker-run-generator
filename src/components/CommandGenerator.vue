<template>
  <div>
    <div
      class="code-block"
      style="display: flex; align-items: center; margin-bottom: 10px"
    >
      <div>
        {{ command }}
      </div>
      <div style="flex-grow: 1"></div>
      <div style="margin-left: 10px; height: 24px" @click="copyCommand">
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
      <div style="margin-left: 10px; height: 24px" @click="copyShareLink">
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

    <checkbox v-model="useLongFlags" label="Use long flags" />

    <hr />

    <text-field
      v-model="state.imageId"
      placeholder="Image"
      style="width: 100%; margin-bottom: 20px"
    />

    <hr />

    <div>
      <checkbox v-model="state.detach" label="Detach" />
      <checkbox v-model="state.interactive" label="Interactive" />
      <checkbox v-model="state.tty" label="TTY" />
      <checkbox v-model="state.readOnly" label="Read-only" />
      <checkbox
        v-model="state.disableHealthcheck"
        label="Disable health check"
      />
      <checkbox v-model="state.disableOOMKiller" label="Disable OOM Killer" />
      <checkbox
        v-model="state.autoRemoveContainer"
        label="Remove the container when it exits"
      />
      <checkbox v-model="state.privileged" label="Privileged" />
    </div>

    <hr />

    <text-field
      v-model="state.containerName"
      placeholder="Container name"
      label="Container name (optional)"
      style="width: 100%; margin-bottom: 20px"
    />

    <text-field
      v-model="state.mount"
      placeholder="Mount"
      label="Mount (optional)"
      style="width: 100%; margin-bottom: 20px"
    />

    <text-field
      v-model="state.restartPolicy"
      placeholder="Restart policy"
      label="Restart policy (optional)"
      style="width: 100%; margin-bottom: 20px"
      hint="Values: no, unless-stopped, always, on-failure[:max-retries]"
    />

    <text-field
      v-model="state.pullPolicy"
      placeholder="Pull policy"
      label="Pull policy (optional)"
      style="width: 100%; margin-bottom: 20px"
      hint="Values: always, missing, never"
    />

    <text-field
      v-model="state.workDir"
      placeholder="Working directory"
      label="Working directory (optional)"
      style="width: 100%; margin-bottom: 20px"
    />

    <text-field
      v-model="state.containerCommand"
      placeholder="Command"
      style="width: 100%"
    />

    <hr />

    <div>
      <div class="label" style="margin-bottom: 20px">Volumes</div>
      <div v-for="(volume, i) in state.volumes" :key="volume.id">
        <div
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          "
        >
          <text-field
            hide-label
            v-model="state.volumes[i].value"
            placeholder="Value"
            style="margin-right: 10px"
          />
          <div style="flex-grow: 1"></div>
          <button style="height: 30px" @click="state.volumes.splice(i, 1)">
            - Remove
          </button>
        </div>
      </div>
      <button
        @click="
          state.volumes.push({
            value: 'host:container',
            id: Math.random().toString(36),
          })
        "
      >
        + Add
      </button>
    </div>

    <hr />

    <div>
      <div class="label" style="margin-bottom: 20px">Ports</div>
      <div v-for="(port, i) in state.ports" :key="port.id">
        <div
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          "
        >
          <text-field
            hide-label
            v-model="state.ports[i].value"
            placeholder="Value"
            style="margin-right: 10px"
          />
          <div style="flex-grow: 1"></div>
          <button style="height: 30px" @click="state.ports.splice(i, 1)">
            - Remove
          </button>
        </div>
      </div>
      <button
        @click="
          state.ports.push({
            value: 'host:container',
            id: Math.random().toString(36),
          })
        "
      >
        + Add
      </button>
    </div>

    <hr />

    <div>
      <div class="label" style="margin-bottom: 20px">Environment variables</div>
      <div v-for="(envVar, i) in state.envVars" :key="envVar.id">
        <div
          style="
            display: flex;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          "
        >
          <text-field
            hide-label
            v-model="envVar.key"
            placeholder="Key"
            style="margin-right: 10px"
          />
          <text-field
            hide-label
            v-model="envVar.value"
            placeholder="Value"
            style="margin-right: 10px"
          />
          <div style="flex-grow: 1"></div>
          <button style="height: 30px" @click="state.envVars.splice(i, 1)">
            - Remove
          </button>
        </div>
      </div>
      <button
        @click="
          state.envVars.push({
            key: '',
            value: '',
            id: Math.random().toString(36),
          })
        "
      >
        + Add
      </button>
    </div>

    <hr />

    <div
      class="code-block"
      style="display: flex; align-items: center; margin-bottom: 10px"
    >
      <div>
        {{ command }}
      </div>
      <div style="flex-grow: 1"></div>
      <div style="margin-left: 10px; height: 24px" @click="copyCommand">
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
      <div style="margin-left: 10px; height: 24px" @click="copyShareLink">
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
    <checkbox v-model="useLongFlags" label="Use long flags" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Checkbox from "./Checkbox.vue";
import TextField from "./TextField.vue";
import { useGenerator } from "../generator";

export default defineComponent({
  name: "CommandGenerator",
  components: {
    Checkbox,
    TextField,
  },
  setup() {
    return useGenerator();
  },
});
</script>

<style>
hr {
  margin-top: 25px;
  margin-bottom: 25px;
  border: 1px solid #1a1a1a;
}

label,
.label {
  font-size: 1.1rem;
  font-family: monospace;
  opacity: 0.66;
}

.code-block {
  background: #222224;
  padding: 12px;
  border-radius: 5px;
  font-family: monospace;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fafafa;
  overflow: hidden;
  border: none;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: #fafafa;
}
</style>
