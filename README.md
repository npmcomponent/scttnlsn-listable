listable
========

Add an ordered list of items to on object.

## Install

    component install scttnlsn/listable

## Usage

Use it directly:

```js
var listable = require('listable');
var list = listable();

list.on('add', function (item) {
    console.log('added', item);
});

list.add({ foo: 'bar' });
```

Or as a mixin:

```js
function List(items) {
    this.reset(items);
}

listable(List.prototype);

var l = new List([{ foo: 'bar' }, { baz: 'qux' }]);
```

## API

### .add(item)

Add single item to list.  Emits `add` event.

### .add([items])

Add multiple items to list.  Emits `add` event for each item.

### .remove(item)

Remove and item from the list.  Emits `remove` event.

### .reset([items])

Reset the entire list with the given items.  Emits `reset` event.

### .at(index)

Returns the item at the given index.

### .size()

Returns the number of items in the list.

### .has(item)

Returns boolean indicating whether the list contains the given item.

### .indexOf(item)

Returns the index of the given item or `-1` if it is not in the list.

### .identify

Function used to uniquely identify an item.

```js
list.identify = function (item) {
    return item.id;
};
```

### .get(id)

Get an item identified by the given id.