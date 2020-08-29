<template>
  <div>
    <p>I'm a player</p>
    <player-action v-for="(action, index) in queue" :action="action"
                   :key="index + '-' + action.description"></player-action>
    <button @click="addDummyAction"> Add dummy action</button>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import {DummyAction} from "@/game/features/player/DummyAction";
import PlayerAction from "@/game/features/player/PlayerAction.vue";

export default {
  name: "Player",
  components: {PlayerAction},
  data: function () {
    return {
      player: App.game.player,
    }
  },

  methods: {
    addDummyAction() {
      App.game.player.addAction(new DummyAction("Do a dummy action", null, 3, 3));
    }
  },

  computed: {
    queue() {
      return this.player.actionQueue;
    }
  }
}
</script>

<style scoped>

</style>
