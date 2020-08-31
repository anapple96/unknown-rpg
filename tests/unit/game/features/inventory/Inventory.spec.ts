import {Inventory} from "@/game/features/inventory/Inventory";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {ItemId} from "@/game/items/ItemId";
import {ItemList} from "@/game/items/ItemList";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";


describe('Inventory', () => {
    const maxExampleStack = 5;
    const exampleItem = ItemId.Example;
    const exampleItem2 = ItemId.Example2;

    beforeAll(() => {
        ItemList.registerItem(new Item("Example", ItemId.Example, ItemType.Global, maxExampleStack))
        ItemList.registerItem(new Item("Example2", ItemId.Example2, ItemType.Global, maxExampleStack))
    });

    test('Inventory is empty after creation', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [ItemType.Global], ItemId.Empty);

        // Act

        // Assert
        expect(inventory.isEmpty()).toBe(true);
    });

    test('Inventory is not empty after item is added', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [ItemType.Global], ItemId.Empty);


        // Act
        inventory.gainItem(exampleItem);

        // Assert
        expect(inventory.isEmpty()).toBe(false);
        expect(inventory.hasEmptySlot()).toBe(false);
        expect(inventory.getTotalAmount(exampleItem)).toBe(1);
    });

    test('We can add more of the same item to a stack', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [ItemType.Global], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem);

        // Assert
        expect(inventory.hasNonFullStack(exampleItem)).toBe(true);

    });

    test('Adding items does not exceed max stack count', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [ItemType.Global], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        expect(inventory.getTotalAmount(exampleItem)).toBe(maxExampleStack);

    });

    test('Adding items overflows into the next stack', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 2, [ItemType.Global], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        expect(inventory.getTotalAmount(exampleItem)).toBe(maxExampleStack + 1);

    });

    test('Correct spots left', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 2, [ItemType.Global], ItemId.Empty);
        expect(inventory.getSpotsLeftForItem(exampleItem)).toBe(2 * maxExampleStack);

        // Act
        inventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        expect(inventory.getSpotsLeftForItem(exampleItem)).toBe(maxExampleStack - 1);
        expect(inventory.canTakeItem(exampleItem, maxExampleStack - 1)).toBe(true);
        expect(inventory.canTakeItem(exampleItem, maxExampleStack)).toBe(false);
    });

    test('Correct spots left with multiple items', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 2, [ItemType.Global], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem);
        inventory.gainItem(exampleItem2);

        // Assert
        expect(inventory.getSpotsLeftForItem(exampleItem)).toBe(maxExampleStack - 1);
        expect(inventory.getSpotsLeftForItem(exampleItem2)).toBe(maxExampleStack - 1);
    });
})

