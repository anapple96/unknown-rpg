<template>
  <div class="container">

    <wallet></wallet>
    <settings></settings>
    <statistics></statistics>
    <achievements></achievements>
    <world></world>
    <player></player>
    <player-inventory></player-inventory>

  </div>
</template>

<script>
import ABCPlayer from "@/game/features/player/ABCPlayer.vue";
import ABCWallet from "@/engine/features/wallet/ABCWallet.vue";
import ABCSettings from "@/engine/features/settings/ABCSettings.vue";
import ABCStatistics from "@/engine/features/statistics/ABCStatistics.vue";
import ABCAchievements from "@/engine/features/achievements/ABCAchievements.vue";
import ABCWorld from "@/game/features/world/ABCWorld.vue";
import ABCPlayerInventory from "@/game/features/inventory/ABCPlayerInventory.vue";

export default {

  components: {
    'world': ABCWorld,
    'statistics': ABCStatistics,
    'settings': ABCSettings,
    'player': ABCPlayer,
    'player-inventory': ABCPlayerInventory,
    'wallet': ABCWallet,
    'achievements': ABCAchievements,
  },

  methods: {}
}
</script>

<style>
</style>
