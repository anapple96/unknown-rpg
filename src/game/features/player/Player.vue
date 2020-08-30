<template>
  <div>
    <p>I'm a player</p>
    <player-action v-for="(action, index) in queue" :index="index" :action="action"
                   :key="index + '-' + action.description"></player-action>
    <button @click="addDummyAction">Fish</button>
    <button @click="addDummyAction2">Potion</button>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import {DummyAction, DummyAction2} from "@/game/features/player/DummyAction";
import PlayerAction from "@/game/features/player/PlayerAction.vue";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {TownId} from "@/game/features/world/towns/TownId";

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
      App.game.player.addAction(new DummyAction("Fish in Toon Town", new TownLocationIdentifier(TownId.ToonTown), 1, 10));
    },
    addDummyAction2() {
      App.game.player.addAction(new DummyAction2("Get a magic potion in Toon Town", new TownLocationIdentifier(TownId.ToonTown), 1, 10));
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
