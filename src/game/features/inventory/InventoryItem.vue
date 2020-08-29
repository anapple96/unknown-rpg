<template>
  <div class="inventory-item">
    <p>{{inventoryItem.id}}</p>
    <p> {{ inventoryItem.amount }} / {{ inventoryItem.maxStack }}</p>
  </div>
</template>

<script>
import {InventoryItem} from "@/game/features/inventory/InventoryItem";
import {ItemList} from "@/game/items/ItemList";

export default {
  name: "InventoryItem",
  props: {
    inventoryItem: InventoryItem
  },

  computed: {
    item() {
      return ItemList.getItem(this.inventoryItem.id);
    }
  }
}
</script>

<style scoped>
.inventory-item {
  border: 1px solid black;
  width: 100px;
  height: 100px;
}
</style>
