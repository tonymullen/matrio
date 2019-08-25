(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Plugins = {}));
}(this, function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  /**
   * Plugin that maintains state for each player in G.players.
   * During a turn, G.player will contain the object for the current player.
   * In two player games, G.opponent will contain the object for the other player.
   *
   * @param {function} initPlayerState - Function of type (playerID) => playerState.
   */
  var pluginPlayer = {
    fnWrap: function fnWrap(moveFn) {
      return function (G, ctx) {
        var current = ctx.currentPlayer;
        var player = G.players[current];
        G = _objectSpread({}, G, {
          player: player
        });
        var other = null;
        var opponent = null;

        if (ctx.numPlayers == 2) {
          other = current == '0' ? '1' : '0';
          opponent = G.players[other];
          G.opponent = opponent;
        }

        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        G = moveFn.apply(void 0, [G, ctx].concat(args));

        var players = _objectSpread({}, G.players, _defineProperty({}, current, G.player));

        if (other !== null) {
          players[other] = G.opponent;
        }

        {
          /* eslint-disable-next-line no-unused-vars */
          var _G = G,
              _player = _G.player,
              _opponent = _G.opponent,
              rest = _objectWithoutProperties(_G, ["player", "opponent"]);

          return _objectSpread({}, rest, {
            players: players
          });
        }
      };
    },
    G: {
      setup: function setup(G, ctx, game) {
        var players = {};

        for (var i = 0; i < ctx.numPlayers; i++) {
          var playerState = {};

          if (game.playerSetup !== undefined) {
            playerState = game.playerSetup(i + '');
          }

          players[i + ''] = playerState;
        }

        return _objectSpread({}, G, {
          players: players
        });
      }
    }
  };

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.PluginPlayer = pluginPlayer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
