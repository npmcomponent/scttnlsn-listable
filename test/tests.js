var assert = require('assert');
var listable = require('listable');

describe('Listable', function () {
    beforeEach(function () {
        this.list = listable();
    });

    it('is an enumerable', function () {
        this.list.add({ n: 1 });
        this.list.add({ n: 2 });

        var ns = this.list.map('n').value();

        assert(ns.length === 2);
        assert(ns[0] === 1);
        assert(ns[1] === 2);
    });

    describe('.add', function () {
        it('appends single item to list', function () {
            this.list.add({ n: 1 });
            assert(this.list.size() === 1);
            assert(this.list.at(0).n === 1);

            this.list.add({ n: 2 });
            assert(this.list.size() === 2);
            assert(this.list.at(1).n === 2);
        });

        it('adds multiple items to list', function () {
            this.list.add([{}, {}]);
            assert(this.list.size() === 2);
        });

        it('does not add duplicates', function () {
            var item = {};
            this.list.add(item);
            this.list.add(item);
            assert(this.list.size() === 1);
        });

        it('emits add event', function (done) {
            this.list.on('add', function (item) {
                assert(item.foo === 'bar');
                done();
            });

            this.list.add({ foo: 'bar' });
        });

        it('does not emit add event when silent', function () {
            var emitted = false;

            this.list.on('add', function () {
                emitted = true;
            });

            this.list.add({ foo: 'bar' }, { silent: true });
            assert(emitted === false);
        });
    });

    describe('.remove', function () {
        beforeEach(function () {
            this.a = { n: 1 };
            this.b = { n: 2 };
            this.list.add(this.a);
            this.list.add(this.b);
        });

        describe('existing item', function () {
            it('removes item from list', function () {
                this.list.remove(this.a);
                assert(this.list.size() === 1);
            });

            it('emits remove event', function (done) {
                this.list.on('remove', function (item) {
                    assert(item.n === 1);
                    done();
                });

                this.list.remove(this.a);
            });

            it('does not emit remove event when silent', function () {
                var emitted = false;

                this.list.on('remove', function () {
                    emitted = true;
                });

                this.list.remove(this.a, { silent: true });
                assert(emitted === false);
            });
        });

        describe('non-existent item', function () {
            it('does not remove anything', function () {
                this.list.remove({});
                assert(this.list.size() === 2);
            });

            it('does not emit remove event', function () {
                var emitted = false;

                this.list.on('remove', function () {
                    emitted = true;
                });

                assert(emitted === false);
            });
        });
    });

    describe('.reset', function () {
        beforeEach(function () {
            this.a = {};
            this.b = {};
            this.list.add(this.a);
            this.list.add(this.b);
        });

        it('replaces all items in list', function () {
            this.list.reset([{}]);
            assert(this.list.size() === 1);
        });

        it('emits reset event', function (done) {
            this.list.on('reset', function () {
                done();
            });

            this.list.reset();
        });

        it('does not emit reset event when silent', function () {
            var emitted = false;

            this.list.on('reset', function () {
                emitted = true;
            });

            this.list.reset([], { silent: true });
            assert(emitted === false);
        });

        it('throws error when resetting with non-array', function () {
            var error = false;

            try {
                this.list.reset({});
            } catch (err) {
                error = !!err;
            }

            assert(error);
        });
    });

    describe('.identify', function () {
        beforeEach(function () {
            this.list.identify = function (item) {
                return item.id;
            };

            this.list.add({ id: 1 });
            this.list.add({ id: 2 });
        });

        it('allows access to item by id', function () {
            var item = this.list.get(1);
            assert(item.id === 1);
        });

        it('does not add duplicates', function () {
            this.list.add({ id: 1 });
            assert(this.list.size() === 2);
        });
    });
});