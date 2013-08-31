var bind = require('bind');
var emitter = require('emitter');
var enumerable = require('enumerable');
var type = require('type');

module.exports = function (obj) {
    obj || (obj = {});

    emitter(obj);
    enumerable(obj);

    obj.__iterate__ = function () {
        return {
            length: bind(this, this.size),
            get: bind(this, this.at)
        };
    };

    if (!obj.identify) {
        obj.identify = function (item) {
            return item;
        };
    }

    obj.indexOf = function (item) {
        var id = this.identify(item);

        for (var i = 0; i < this.size(); i++) {
            if (id === this.identify(this.at(i))) return i;
        }

        return -1;
    };

    obj.has = function (item) {
        return this.indexOf(item) !== -1;
    };

    obj.get = function (id) {
        if (keyable(id)) {
            this._ids || (this._ids = {});
            return this._ids[id];
        }
    };

    obj.add = function (item, options) {
        options || (options = {});
        this.items || (this.items = []);

        var add = function (item) {
            if (!this.has(item)) {
                this.items.push(item);
                index.call(this, item);

                if (!options.silent) this.emit('add', item);
            }
        };

        var items = type(item) === 'array' ? item : [item];

        for (var i = 0; i < items.length; i++) {
            add.call(this, items[i]);
        }
    };

    obj.remove = function (item, options) {
        options || (options = {});
        this.items || (this.items = []);

        if (this.has(item)) {
            var index = this.items.indexOf(item);
            this.items.splice(index, 1);
            unindex.call(this, item);
            if (!options.silent) this.emit('remove', item);
        }
    };

    obj.reset = function (items, options) {
        items || (items = []);
        options || (options = {});
        
        if (type(items) !== 'array') throw new Error('Must reset list with array');

        this.items = items;
        if (!options.silent) this.emit('reset');
    };

    obj.at = function (i) {
        this.items || (this.items = []);
        return this.items[i];
    };

    obj.size = function () {
        this.items || (this.items = []);
        return this.items.length;
    };

    obj.sort = function (comparator, options) {
        options || (options = {});
        this.items.sort(comparator);
        if (!options.silent) this.emit('reset');
    };

    return obj;
};

// Helpers

function keyable(key) {
    return type(key) === 'string' || type(key) === 'number';
}

function index(item) {
    var id = this.identify(item);

    if (keyable(id)) {
        this._ids || (this._ids = {});
        this._ids[id] = item;
    }
}

function unindex(item) {
    var id = this.identify(item);

    if (keyable(id)) {
        this._ids || (this._ids = {});
        delete this._ids[id];
    }
}