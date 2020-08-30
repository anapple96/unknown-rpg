import {Inventory} from "./Inventory";
import {InventoryId} from "./InventoryId";
import {ItemId} from "../../items/ItemId";
import {Feature} from "@/game/Feature";
import {InventorySaveData} from "@/game/features/inventory/InventorySaveData";
import {ItemType} from "@/game/items/ItemType";
import {ItemList} from "@/game/items/ItemList";


export class PlayerInventory extends Feature {
    name: string = "Inventory";
    saveKey: string = "inventory";

    inventorySlots = 3;
    inventories: Inventory[] = []


    constructor() {
        super();
    }


    initialize() {
        this.enableInventory(new Inventory(InventoryId.Main, 5, [ItemType.Global, ItemType.Quest, ItemType.Fish], ItemId.Empty))
        this.gainItem(ItemId.FishInventory1);
    }

    enableInventory(inventory: Inventory) {
        if (this.inventories.length >= this.inventorySlots) {
            console.warn(`Cannot have more than ${this.inventorySlots} active`);
            return;
        }
        this.inventories.push(inventory);
    }

    disableInventory(id: InventoryId) {
        if (id === InventoryId.Main) {
            console.warn("Cannot disable main inventory");
            return;
        }
        const inventory = this.getSubInventory(id);
        if (!inventory.isEmpty()) {
            console.warn(`Cannot disable inventory ${id} if it's not empty`)
            return;
        }
        if (!this.getSubInventory(InventoryId.Main).hasEmptySlot()) {
            console.warn(`Cannot disable inventory ${id} as main inventory has no empty slots`);
            return;
        }
        const index = this.inventories.indexOf(inventory);
        this.gainItem(inventory.itemRepresentation);
        this.inventories.splice(index, 1);
    }

    inventoryInteraction(inventoryFromId: InventoryId, indexFrom: number, inventoryToId: InventoryId, indexTo: number) {
        if (inventoryFromId === inventoryToId) {
            if (indexFrom === indexTo) {
                console.log("Moving item to itself");
                return;
            }
        }
        const itemFrom = this.getSubInventory(inventoryFromId).items[indexFrom];

        if (itemFrom.isEmpty()) {
            console.warn("Cannot interact with empty item");
            return;
        }
        const itemTo = this.getSubInventory(inventoryToId).items[indexTo];

        if (itemFrom.id === itemTo.id) {
            this.mergeItems(inventoryFromId, indexFrom, inventoryToId, indexTo);
            return;
        }

        this.swapItems(inventoryFromId, indexFrom, inventoryToId, indexTo);
        return;
    }


    mergeItems(inventoryFromId: InventoryId, indexFrom: number, inventoryToId: InventoryId, indexTo: number) {
        const fromInventory = this.getSubInventory(inventoryFromId);
        const toInventory = this.getSubInventory(inventoryToId);

        const inventoryItemFrom = fromInventory.items[indexFrom];
        const inventoryItemTo = toInventory.items[indexTo];

        if (inventoryItemFrom.id !== inventoryItemTo.id) {
            throw new Error(`Cannot merge items of types ${inventoryItemFrom.id} and ${inventoryItemTo.id}`);
        }

        const amount = Math.min(inventoryItemFrom.amount, inventoryItemTo.spaceLeft());
        inventoryItemFrom.loseItems(amount);
        inventoryItemTo.gainItems(amount);
    }

    swapItems(idFrom: InventoryId, indexFrom: number, idTo: InventoryId, indexTo: number) {
        const fromInventory = this.getSubInventory(idFrom);
        const toInventory = this.getSubInventory(idTo);

        const inventoryItemFrom = fromInventory.items[indexFrom];
        const inventoryItemTo = toInventory.items[indexTo];

        const itemFrom = ItemList.getItem(inventoryItemFrom.id);
        const itemTo = ItemList.getItem(inventoryItemTo.id);

        if (!fromInventory.acceptsType(itemTo.type)) {
            console.error(`Cannot swap items ${itemFrom} and ${itemTo} as inventory ${fromInventory.id} does not accept it`);
            return;
        }
        if (!toInventory.acceptsType(itemFrom.type)) {
            console.error(`Cannot swap items ${itemFrom} and ${itemTo} as inventory ${toInventory.id} does not accept it`);
            return;
        }

        const temp = inventoryItemFrom;
        fromInventory.items.splice(indexFrom, 1, inventoryItemTo);
        toInventory.items.splice(indexTo, 1, temp);

    }

    canCollapse(id: InventoryId): boolean {
        return id !== InventoryId.Main && this.getSubInventory(id).isEmpty() && this.getSubInventory(InventoryId.Main).hasEmptySlot();
    }


    consumeItem(inventory: InventoryId, index: number) {
        this.getSubInventory(inventory).consumeItem(index);
    }

    /**
     * Loop over all inventories to try and place the amount of item.
     * errorOnInventoryFull determines whether to continue if not everything can be added
     * @param id item to add
     * @param amount
     * @param errorOnInventoryFull if false, items will be added as possible, if true no items will be added and an exception be thrown.
     * This is useful for quest items that must be placed in the inventory
     */
    gainItem(id: ItemId, amount: number = 1, errorOnInventoryFull: boolean = false): boolean {
        if (!this.canTakeItem(id, amount) && errorOnInventoryFull) {
            throw new Error(`Cannot take ${amount} of item ${id}`);
        }

        const item = ItemList.getItem(id);

        let shouldContinue = true;
        let lastInventory = null;
        let amountLeft = amount;
        while (shouldContinue) {
            const inventory = this.getInventoryToPlaceItem(id, item.type);

            // Trying to place it in the same inventory means we're full.
            if (lastInventory === inventory) {
                return false;
            }

            // Try to add it to the found inventory
            amountLeft = inventory.gainItem(id, amountLeft);
            if (amountLeft <= 0) {
                shouldContinue = false;
            }

            lastInventory = inventory;
        }
        return true;
    }

    getSpotsLeftForItem(id: ItemId) {
        let total = 0;
        for (const inventory of this.inventories) {
            total += inventory.getSpotsLeftForItem(id);
        }
        return total;
    }

    canTakeItem(id: ItemId, amount: number) {
        return this.getSpotsLeftForItem(id) >= amount;
    }


    loseItem(inventory: InventoryId, index: number, amount: number = 1) {
        this.getSubInventory(inventory).loseItem(index, amount);
    }

    private getInventoryToPlaceItem(id: ItemId, type: ItemType): Inventory {

        // Check for inventory with a stack to add to
        for (const inventory of this.inventories) {
            // Don't check the main inventory, it will fall back on it.
            if (inventory.id === InventoryId.Main) {
                continue;
            }

            if (inventory.hasNonFullStack(id)) {
                return inventory;
            }
        }

        // Check for inventory with the best empty slot
        for (const inventory of this.inventories) {
            // Don't check the main inventory, it will fall back on it.
            if (inventory.id === InventoryId.Main) {
                continue;
            }
            console.log(inventory.id, type, inventory.acceptsType(type));
            if (inventory.acceptsType(type) && inventory.hasEmptySlot()) {
                return inventory;
            }
        }

        return this.getSubInventory(InventoryId.Main);
    }

    getSubInventory(id: InventoryId): Inventory {
        for (const inventory of this.inventories) {
            if (inventory.id === id) {
                return inventory;
            }
        }
        throw new Error(`Could not find inventory with id ${id}`);
    }

    load(data: InventorySaveData): void {
        // Empty
    }

    parseSaveData(json: Record<string, unknown>): InventorySaveData {
        return new InventorySaveData();
    }

    save(): InventorySaveData {
        return new InventorySaveData();
    }
}
