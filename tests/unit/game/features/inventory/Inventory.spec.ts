import {Inventory} from "@/game/features/inventory/Inventory";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {ItemId} from "@/game/items/ItemId";
import {ItemList} from "@/game/items/ItemList";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";


describe('Inventory', () => {
    const maxExampleStack = 5;
    const exampleItem = ItemId.Example;

    beforeAll(() => {
        ItemList.registerItem(new Item("Example", ItemId.Example, ItemType.Global, maxExampleStack))
    });

    test('Inventory is empty after creation', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [], ItemId.Empty);

        // Act

        // Assert
        expect(inventory.isEmpty()).toBe(true);
    });

    test('Inventory is not empty after item is added', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [], ItemId.Empty);


        // Act
        inventory.gainItem(exampleItem);

        // Assert
        expect(inventory.isEmpty()).toBe(false);
        expect(inventory.hasEmptySlot()).toBe(false);
        expect(inventory.getTotalAmount(exampleItem)).toBe(1);
    });

    test('We can add more of the same item to a stack', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem);

        // Assert
        expect(inventory.hasNonFullStack(exampleItem)).toBe(true);

    });

    test('Adding items does not exceed max stack count', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 1, [], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        expect(inventory.getTotalAmount(exampleItem)).toBe(maxExampleStack);

    });

    test('Adding items overflows into the next stack', () => {
        // Arrange
        const inventory: Inventory = new Inventory(InventoryId.Main, 2, [], ItemId.Empty);

        // Act
        inventory.gainItem(exampleItem, maxExampleStack + 1);

        // Assert
        expect(inventory.getTotalAmount(exampleItem)).toBe(maxExampleStack + 1);

    });
})

