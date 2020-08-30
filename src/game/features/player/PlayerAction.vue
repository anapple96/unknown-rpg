<template>
  <div>
    <p>{{ index + 1 }} - {{ action.description }}: {{ action.currentProgress | twoDigits }} /
      {{ action.duration | twoDigits }}
      <span v-if="action.repeat > 0">Repeat {{ action.repeat }} times</span>
      <button @click="cancel">Cancel</button>
    </p>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import {PlayerAction} from "@/game/features/player/PlayerAction";

export default {
  name: "PlayerAction",
  props: {
    index: Number,
    action: PlayerAction,
  },

  methods: {
    cancel() {
      App.game.player.cancelActionsFromIndex(this.index);
    }
  }
}
</script>

<style scoped>

</style>
