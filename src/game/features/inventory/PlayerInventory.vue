<template>
  <div>
    <p>I'm the top-level inventory</p>
    <inventory v-for="inv in inventories" :inventory="inv" :key="inv.id"></inventory>
  </div>
</template>

<script>
import {App} from "@/App.ts";
import Inventory from "@/game/features/inventory/Inventory.vue";

export default {

  name: "PlayerInventory",
  components: {Inventory},
  data: function () {
    return {
      inventory: App.game.playerInventory,
    }
  },

  computed: {
    inventories() {
      return this.inventory.inventories;
    }
  }
}
</script>

<style scoped>
div {
  border: 1px solid black;
}
</style>
