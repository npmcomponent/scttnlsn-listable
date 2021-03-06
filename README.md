*This repository is a mirror of the [component](http://component.io) module [scttnlsn/listable](http://github.com/scttnlsn/listable). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/scttnlsn-listable`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
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

Add single item to list.  Emits `add` event unless `silent: true` is passed as an option.

### .add([items])

Add multiple items to list.  Emits `add` event for each item unless `silent: true` is passed as an option.

### .remove(item)

Remove and item from the list.  Emits `remove` event unless `silent: true` is passed as an option.

### .reset([items])

Reset the entire list with the given items.  Emits `reset` event unless `silent: true` is passed as an option.

### .at(index)

Returns the item at the given index.

### .size()

Returns the number of items in the list.

### .has(item)

Returns boolean indicating whether the list contains the given item.

### .indexOf(item)

Returns the index of the given item or `-1` if it is not in the list.

### .sort(comparator, options)

Sort the items in the list according to the comparator function.  Emits `reset` event unless `silent: true` is passed as an option.

### .get(id)

Get an item identified by the given id.

### .identify

Function used to uniquely identify an item.

```js
var list = listable();

list.identify = function (item) {
    return item.id;
};

list.add({ id: 1, foo: 'bar' });
list.get(1) // => { id: 1, foo: 'bar' }
```

## License

MIT