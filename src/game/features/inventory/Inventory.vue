<template>
  <div>

    <p> {{ inventory.id }} - {{ inventory.slots }} {{ inventory.acceptedTypes }}</p>
    <div class="inventory-list">
      <inventory-item
          v-for="(item, index) in inventory.items"
          :inventory-item="item"
          :selected="index === hoveredIndex"
          :key="item.id + '-' + index"
          @click.native="setHoveredItem(index)"
      ></inventory-item>

    </div>
    <div class="hovered-item" v-show="hasItemSelected">
      <p> {{ selectedItem.name }}</p>
      <button v-if="isConsumable" @click="consume">Consume</button>
      <button @click="drop">Drop</button>
    </div>
  </div>
</template>

<script>
import {Inventory} from "@/game/features/inventory/Inventory.ts";
import InventoryItem from "@/game/features/inventory/InventoryItem.vue";
import {ItemList} from "@/game/items/ItemList.ts";
import {ItemId} from "@/game/items/ItemId";
import {isConsumable} from "@/game/items/Consumable";

export default {
  name: "Inventory",
  components: {InventoryItem},
  props: {
    inventory: Inventory,
  },
  data: function () {
    return {
      hoveredIndex: 0,
    };
  },
  computed: {
    isConsumable() {
      return isConsumable(this.selectedItem);
    },
    selectedItem() {
      return ItemList.getItem(this.inventory.items[this.hoveredIndex].id);
    },
    hasItemSelected() {
      return this.selectedItem.id !== ItemId.Empty;
    }
  },
  methods: {
    consume() {
      this.inventory.consumeItem(this.hoveredIndex);
    },
    drop() {
      this.inventory.dropStack(this.hoveredIndex);
    },
    setHoveredItem(index) {
      this.hoveredIndex = index;
    }
  }

}
</script>

<style scoped>
.inventory-list {
  display: flex;
}
</style>
