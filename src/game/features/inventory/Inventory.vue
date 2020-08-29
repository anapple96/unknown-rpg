<template>
  <div>

    <p> {{ inventory.id }} - {{ inventory.slots }} {{ inventory.acceptedTypes }}</p>
    <div class="inventory-list">
      <inventory-item v-for="(item, index) in inventory.items" :inventory-item="item"
                      :key="item.id + '-' + index"></inventory-item>

    </div>
     </div>
</template>

<script>
import {Inventory} from "@/game/features/inventory/Inventory";
import InventoryItem from "@/game/features/inventory/InventoryItem.vue";

export default {
  name: "Inventory",
  components: {InventoryItem},
  props: {
    inventory: Inventory,
  },
}
</script>

<style scoped>
.inventory-list {
  display: flex;
}
</style>
