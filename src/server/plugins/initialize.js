'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

module.exports = function callee$0$0(kbnServer, server, config) {
  var _require, includes, keys, plugins, path, initialize, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, id;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _require = require('lodash');
        includes = _require.includes;
        keys = _require.keys;

        if (config.get('plugins.initialize')) {
          context$1$0.next = 6;
          break;
        }

        server.log(['info'], 'Plugin initialization disabled.');
        return context$1$0.abrupt('return', []);

      case 6:
        plugins = kbnServer.plugins;

        // extend plugin apis with additional context
        plugins.getPluginApis().forEach(function (api) {

          Object.defineProperty(api, 'uiExports', {
            value: kbnServer.uiExports
          });
        });

        path = [];

        initialize = function initialize(id) {
          var plugin, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, reqId;

          return _regeneratorRuntime.async(function initialize$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                plugin = plugins.byId[id];

                if (!includes(path, id)) {
                  context$2$0.next = 3;
                  break;
                }

                throw new Error('circular dependencies found: "' + path.concat(id).join(' -> ') + '"');

              case 3:

                path.push(id);

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$2$0.prev = 7;
                _iterator = _getIterator(plugin.requiredIds);

              case 9:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$2$0.next = 18;
                  break;
                }

                reqId = _step.value;

                if (plugins.byId[reqId]) {
                  context$2$0.next = 13;
                  break;
                }

                throw new Error('Unmet requirement "' + reqId + '" for plugin "' + id + '"');

              case 13:
                context$2$0.next = 15;
                return _regeneratorRuntime.awrap(initialize(reqId));

              case 15:
                _iteratorNormalCompletion = true;
                context$2$0.next = 9;
                break;

              case 18:
                context$2$0.next = 24;
                break;

              case 20:
                context$2$0.prev = 20;
                context$2$0.t0 = context$2$0['catch'](7);
                _didIteratorError = true;
                _iteratorError = context$2$0.t0;

              case 24:
                context$2$0.prev = 24;
                context$2$0.prev = 25;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }

              case 27:
                context$2$0.prev = 27;

                if (!_didIteratorError) {
                  context$2$0.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return context$2$0.finish(27);

              case 31:
                return context$2$0.finish(24);

              case 32:
                context$2$0.next = 34;
                return _regeneratorRuntime.awrap(plugin.init());

              case 34:
                path.pop();

              case 35:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this, [[7, 20, 24, 32], [25,, 27, 31]]);
        };

        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 13;
        _iterator2 = _getIterator(plugins);

      case 15:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 22;
          break;
        }

        id = _step2.value.id;
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(initialize(id));

      case 19:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 15;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](13);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError2) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError2;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[13, 24, 28, 36], [29,, 31, 35]]);
};
