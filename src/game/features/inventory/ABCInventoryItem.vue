<template>
  <div class="inventory-item" :class="{'inventory-item-selected': selected}"
       draggable="true"
       @dragstart="startDrag($event, inventoryId, index)"
       @drop="onDrop($event, inventoryId, index)"
       @dragover.prevent
       @dragenter.prevent
  >
    <div v-if="!inventoryItem.isEmpty()">
      <p>{{ item.name }}</p>
      <p> {{ inventoryItem.amount }} / {{ inventoryItem.maxStack }}</p>
    </div>
  </div>
</template>

<script>
import {InventoryItem} from "@/game/features/inventory/InventoryItem";
import {ItemList} from "@/game/items/ItemList";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {App} from "@/App.ts";


export default {
  name: "ABCInventoryItem",
  props: {
    inventoryId: InventoryId,
    index: Number,
    selected: Boolean,
    inventoryItem: InventoryItem,
  },

  methods: {
    startDrag(evt, inventoryId, index) {
      if (!this.canDrag) {
        evt.preventDefault();
        return;
      }
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('inventoryId', inventoryId);
      evt.dataTransfer.setData('index', index);
    },
    onDrop(evt, inventoryToId, indexTo) {
      const inventoryFromId = evt.dataTransfer.getData('inventoryId');
      const indexFrom = parseInt(evt.dataTransfer.getData('index'));
      App.game.playerInventory.inventoryInteraction(inventoryFromId, indexFrom, inventoryToId, indexTo);
    }
  },

  computed: {
    item() {
      return ItemList.getItem(this.inventoryItem.id);
    },
    canDrag() {
      return !this.inventoryItem.isEmpty();
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

.inventory-item-selected {
  border: 1px solid red;
}
</style>
