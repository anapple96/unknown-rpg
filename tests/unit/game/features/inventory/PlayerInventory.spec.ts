import {ItemId} from "@/game/items/ItemId";
import {ItemList} from "@/game/items/ItemList";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";
import {Inventory} from "@/game/features/inventory/Inventory";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {PlayerInventory} from "@/game/features/inventory/PlayerInventory";

describe('PlayerInventory', () => {
    const maxExampleStack = 5;
    const exampleItem = ItemId.Example;

    beforeAll(() => {
        ItemList.registerItem(new Item("Example", ItemId.Example, ItemType.Fish, maxExampleStack))
    });


    test('Inventory knows if it can take items in multiple inventories', () => {
        // Arrange
        const playerInventory: PlayerInventory = new PlayerInventory();
        playerInventory.enableInventory(new Inventory(InventoryId.Fish1, 1, [ItemType.Fish], ItemId.Empty))
        playerInventory.enableInventory(new Inventory(InventoryId.Fish2, 2, [ItemType.Fish], ItemId.Empty))

        // Act
        // playerInventory.gainItem()
        // Assert
        expect(playerInventory.getSpotsLeftForItem(exampleItem)).toBe(3 * maxExampleStack)
    });

    test('Inventory knows if it can take items in multiple inventories if one cannot take them', () => {
        // Arrange
        const playerInventory: PlayerInventory = new PlayerInventory();
        playerInventory.enableInventory(new Inventory(InventoryId.Log1, 1, [ItemType.Log], ItemId.Empty))
        playerInventory.enableInventory(new Inventory(InventoryId.Fish1, 2, [ItemType.Fish], ItemId.Empty))

        // Act

        // Assert
        expect(playerInventory.getSpotsLeftForItem(exampleItem)).toBe(2 * maxExampleStack)
    });

    test('Inventory knows if it can take items in multiple inventories if some slots are already taken', () => {
        // Arrange
        const playerInventory: PlayerInventory = new PlayerInventory();
        playerInventory.enableInventory(new Inventory(InventoryId.Fish1, 1, [ItemType.Fish], ItemId.Empty))
        playerInventory.enableInventory(new Inventory(InventoryId.Fish2, 2, [ItemType.Fish], ItemId.Empty))

        // Act
        playerInventory.getSubInventory(InventoryId.Fish1).gainItem(exampleItem);
        playerInventory.getSubInventory(InventoryId.Fish2).gainItem(exampleItem);

        // Assert
        expect(playerInventory.getSpotsLeftForItem(exampleItem)).toBe(3 * maxExampleStack - 2)
    });

    test('Inventory overflows correctly into another ', () => {
        // Arrange
        const playerInventory: PlayerInventory = new PlayerInventory();
        playerInventory.enableInventory(new Inventory(InventoryId.Main, 1, [ItemType.Fish], ItemId.Empty))
        playerInventory.enableInventory(new Inventory(InventoryId.Example, 1, [ItemType.Fish], ItemId.Empty))

        // Act
        playerInventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        // Place the max into the example
        expect(playerInventory.getSubInventory(InventoryId.Example).getTotalAmount(exampleItem)).toBe(maxExampleStack);
        // And overflow the one into the main
        expect(playerInventory.getSubInventory(InventoryId.Main).getTotalAmount(exampleItem)).toBe(1);
    });


});

