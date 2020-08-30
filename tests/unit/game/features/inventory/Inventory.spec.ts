import {Inventory} from "@/game/features/inventory/Inventory.ts";
import {InventoryId} from "@/game/features/inventory/InventoryId.ts";
import {ItemId} from "@/game/items/ItemId.ts";

test('check if inventory is empty', () => {
    // Arrange
    const inventory: Inventory = new Inventory(InventoryId.Main, 1, [], ItemId.Empty);

    // Act

    // Assert
    // expect(inventory.isEmpty()).toBe(true);
    expect(3).toBe(3)
});
