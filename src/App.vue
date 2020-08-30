<template>
  <div class="container">

    <wallet></wallet>
    <settings></settings>
    <statistics></statistics>
    <achievements></achievements>
    <world></world>
    <player></player>

  </div>
</template>

<script>
import Player from "@/game/features/player/Player.vue";
import Wallet from "@/engine/features/wallet/Wallet.vue";
import Settings from "@/engine/features/settings/Settings.vue";
import Statistics from "@/engine/features/statistics/Statistics.vue";
import Achievements from "@/engine/features/achievements/Achievements.vue";
import World from "@/game/features/world/World.vue";

export default {

  components: {
    'world': World,
    'statistics': Statistics,
    'settings': Settings,
    'player': Player,
    'wallet': Wallet,
    'achievements': Achievements,
  },

  methods: {}
}
</script>

<style>
</style>
