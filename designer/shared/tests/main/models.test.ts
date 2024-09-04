// models.test.ts
import { Action, Collection, Element, Plugin } from '../../src/main/models';

describe('Collection', () => {
    class TestCollection<T> extends Collection<T> { }

    it('should return an empty array when no items are added', () => {
        const collection = new TestCollection<any>();
        expect(collection.items).toEqual([]);
    });

    it('should return an array of items when items are added', () => {
        const collection = new TestCollection<number>();
        collection.push(1, 2, 3);
        expect(collection.items).toEqual([1, 2, 3]);
    });
});

describe('Element', () => {
    it('should have an id property', () => {
        const element: Element = { id: 'test-id' };
        expect(element).toHaveProperty('id', 'test-id');
    });
});

const action: Action = { id: `test-id`, icon: 'test-icon', onClick: () => { return; } };

describe('Action', () => {
    it('should have an icon property', () => {
        expect(action).toHaveProperty('icon', 'test-icon');
    });

    it('should have an onClick property', () => {
        expect(action).toHaveProperty('onClick');
    });
});

describe('Plugin', () => {
    it('should have a name property', () => {
        const plugin: Plugin<number> = { name: 'test-plugin', getActionAsync: async () => { return action; } };
        expect(plugin).toHaveProperty('name', 'test-plugin');
    });
});