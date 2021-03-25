import { computed, ref, reactive } from "vue";
import {
  arrayToArgString,
  getBooleanFlag,
  getStringFlag,
  getArrayFlag,
  stringifyEnvVarTuple,
  formatStringArg,
} from "./format";
import { startNotification } from "./notification";

export function useGenerator() {
  const useLongFlags = ref(false);

  let state = reactive({
    imageId: "my-image",

    detach: false,
    interactive: false,
    tty: false,
    readOnly: false,
    autoRemoveContainer: false,
    privileged: false,
    disableHealthcheck: false,
    disableOOMKiller: false,

    containerName: "",
    restartPolicy: "",
    pullPolicy: "",
    workDir: "",
    containerCommand: "",
    mount: "",

    envVars: [] as { key: string; value: string; id: string }[],
    volumes: [] as { id: string; value: string }[],
    ports: [] as { id: string; value: string }[],
  });

  function getShareLink() {
    const q = btoa(JSON.stringify(state));
    return `${window.location.href}?q=${q}`;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const initialState = urlParams.get("q");

  if (initialState) {
    try {
      state = reactive(Object.assign(state, JSON.parse(atob(initialState))));
      console.log("Loaded state from URL", state);
    } catch (error) {
      console.warn("Could not load initial state");
      window.history.replaceState({}, document.title, ".");
    }
  }

  const opts = computed(() => {
    return arrayToArgString([
      getBooleanFlag("detach", state.detach, useLongFlags.value),
      getBooleanFlag("interactive", state.interactive, useLongFlags.value),
      getBooleanFlag("tty", state.tty, useLongFlags.value),
      getBooleanFlag("readOnly", state.readOnly, useLongFlags.value),
      getBooleanFlag("rm", state.autoRemoveContainer, useLongFlags.value),
      getBooleanFlag("privileged", state.privileged, useLongFlags.value),
      getBooleanFlag(
        "disableHealthcheck",
        state.disableHealthcheck,
        useLongFlags.value
      ),
      getBooleanFlag(
        "disableOOMKiller",
        state.disableOOMKiller,
        useLongFlags.value
      ),

      getStringFlag("name", state.containerName, useLongFlags.value),
      getStringFlag("mount", state.mount, useLongFlags.value),
      getStringFlag("restart", state.restartPolicy, useLongFlags.value),
      getStringFlag("pull", state.pullPolicy, useLongFlags.value),
      getStringFlag("workDir", state.workDir, useLongFlags.value),

      getArrayFlag(
        "env",
        state.envVars.filter(({ value }) => value).map(stringifyEnvVarTuple),
        useLongFlags.value
      ),
      getArrayFlag(
        "volume",
        state.volumes
          .filter(({ value }) => value)
          .map(({ value }) => formatStringArg(value)),
        useLongFlags.value
      ),
      getArrayFlag(
        "port",
        state.ports
          .filter(({ value }) => value)
          .map(({ value }) => formatStringArg(value)),
        useLongFlags.value
      ),
    ]);
  });

  const command = computed(() => {
    return arrayToArgString([
      "docker",
      "run",
      opts.value,
      state.imageId.trim().replace(/ +/g, "-"),
      state.containerCommand.trim(),
    ]);
  });

  async function copyText(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  async function copyCommand(): Promise<void> {
    await copyText(command.value);
    startNotification("Command copied!");
  }

  async function copyShareLink(): Promise<void> {
    await copyText(getShareLink());
    startNotification("URL copied!");
  }

  const isValidImage = computed(() => !!state.imageId.length);
  const isValidRestartPolicy = computed(() =>
    ["no", "unless-stopped", "always", "on-failure", ""].includes(
      state.restartPolicy
    )
  );
  const isValidPullPolicy = computed(() =>
    ["always", "missing", "never", ""].includes(state.pullPolicy)
  );

  const hasError = computed(
    () =>
      !(
        isValidImage.value &&
        isValidRestartPolicy.value &&
        isValidPullPolicy.value
      )
  );

  return {
    state,
    useLongFlags,

    copyCommand,
    getShareLink,
    copyShareLink,

    command,

    hasError,
    isValidImage,
    isValidRestartPolicy,
    isValidPullPolicy,
  };
}
