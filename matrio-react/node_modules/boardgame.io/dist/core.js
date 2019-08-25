(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('immer'), require('flatted')) :
  typeof define === 'function' && define.amd ? define(['exports', 'immer', 'flatted'], factory) :
  (global = global || self, factory(global.Core = {}, global.immer, global.Flatted));
}(this, function (exports, produce, flatted) { 'use strict';

  produce = produce && produce.hasOwnProperty('default') ? produce['default'] : produce;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  /**
   * Plugin that allows using Immer to make immutable changes
   * to G by just mutating it.
   */

  var PluginImmer = {
    fnWrap: function fnWrap(move) {
      return produce(move);
    }
  };

  /**
   * List of plugins that are always added.
   */

  var DEFAULT_PLUGINS = [PluginImmer];
  /**
   * Applies the provided plugins to ctx before processing a move / event.
   *
   * @param {object} ctx - The ctx object.
   * @param {object} game - The game object.
   */

  var CtxPreMove = function CtxPreMove(ctx, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.ctx !== undefined;
    }).filter(function (plugin) {
      return plugin.ctx.preMove !== undefined;
    }).forEach(function (plugin) {
      ctx = plugin.ctx.preMove(ctx, game);
    });
    return ctx;
  };
  /**
   * Applies the provided plugins to G before processing a move / event.
   *
   * @param {object} G - The G object.
   * @param {object} game - The game object.
   */


  var GPreMove = function GPreMove(G, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.G !== undefined;
    }).filter(function (plugin) {
      return plugin.G.preMove !== undefined;
    }).forEach(function (plugin) {
      G = plugin.G.preMove(G, game);
    });
    return G;
  };
  /**
   * Postprocesses G after a move / event.
   *
   * @param {object} G - The G object.
   * @param {object} game - The game object.
   */


  var GPostMove = function GPostMove(G, game) {
    [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.G !== undefined;
    }).filter(function (plugin) {
      return plugin.G.postMove !== undefined;
    }).forEach(function (plugin) {
      G = plugin.G.postMove(G, game);
    });
    return G;
  };
  /**
   * Applies the provided plugins to the given move / flow function.
   *
   * @param {function} fn - The move function or trigger to apply the plugins to.
   * @param {object} game - The game object.
   */


  var FnWrap = function FnWrap(fn, game) {
    var reducer = function reducer(acc, _ref) {
      var fnWrap = _ref.fnWrap;
      return fnWrap(acc, game);
    };

    var g = [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
      return plugin.fnWrap !== undefined;
    }).reduce(reducer, fn);
    return function (G, ctx) {
      G = GPreMove(G, game);
      ctx = CtxPreMove(ctx, game);

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      G = g.apply(void 0, [G, ctx].concat(args));
      G = GPostMove(G, game);
      return G;
    };
  };
  var G = {
    /**
     * Applies the provided plugins to G during game setup.
     *
     * @param {object} G - The G object.
     * @param {object} ctx - The ctx object.
     * @param {object} game - The game object.
     */
    setup: function setup(G, ctx, game) {
      [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
        return plugin.G !== undefined;
      }).filter(function (plugin) {
        return plugin.G.setup !== undefined;
      }).forEach(function (plugin) {
        G = plugin.G.setup(G, ctx, game);
      });
      return G;
    },

    /**
     * Applies the provided plugins to G during the beginning of the phase.
     *
     * @param {object} G - The G object.
     * @param {object} ctx - The ctx object.
     * @param {object} game - The game object.
     */
    onPhaseBegin: function onPhaseBegin(G, ctx, game) {
      [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
        return plugin.G !== undefined;
      }).filter(function (plugin) {
        return plugin.G.onPhaseBegin !== undefined;
      }).forEach(function (plugin) {
        G = plugin.G.onPhaseBegin(G, ctx, game);
      });
      return G;
    }
  };
  var ctx = {
    /**
     * Applies the provided plugins to ctx during game setup.
     *
     * @param {object} ctx - The ctx object.
     * @param {object} game - The game object.
     */
    setup: function setup(ctx, game) {
      [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
        return plugin.ctx !== undefined;
      }).filter(function (plugin) {
        return plugin.ctx.setup !== undefined;
      }).forEach(function (plugin) {
        ctx = plugin.ctx.setup(ctx, game);
      });
      return ctx;
    },

    /**
     * Applies the provided plugins to ctx during the beginning of the phase.
     *
     * @param {object} ctx - The ctx object.
     * @param {object} game - The game object.
     */
    onPhaseBegin: function onPhaseBegin(ctx, game) {
      [].concat(DEFAULT_PLUGINS, _toConsumableArray(game.plugins)).filter(function (plugin) {
        return plugin.ctx !== undefined;
      }).filter(function (plugin) {
        return plugin.ctx.onPhaseBegin !== undefined;
      }).forEach(function (plugin) {
        ctx = plugin.ctx.onPhaseBegin(ctx, game);
      });
      return ctx;
    }
  };

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV == 'test';
  var logfn = DEV ? console.log : function () {};
  var errorfn = DEV ? console.error : function () {};
  function error(error) {
    errorfn('ERROR:', error);
  }

  /**
   * Standard move that simulates passing.
   *
   * Creates two objects in G:
   * passOrder - An array of playerIDs capturing passes in the pass order.
   * allPassed - Set to true when all players have passed.
   */

  var Pass = function Pass(G, ctx) {
    var passOrder = [];

    if (G.passOrder !== undefined) {
      passOrder = G.passOrder;
    }

    var playerID = ctx.playerID;
    passOrder = [].concat(_toConsumableArray(passOrder), [playerID]);
    G = _objectSpread({}, G, {
      passOrder: passOrder
    });

    if (passOrder.length >= ctx.numPlayers) {
      G = _objectSpread({}, G, {
        allPassed: true
      });
    }

    return G;
  };
  /**
   * Event to change the actionPlayers array.
   * @param {object} state - The game state.
   * @param {object} arg - An array of playerID's or <object> of:
   *   {
   *     value: (G, ctx) => [],        // function that returns an array of playerID's (optional if all is set)
   *
   *     all: true,        // set value to all playerID's
   *
   *     others: true,     // set value to all except currentPlayer.
   *
   *     once: true,       // players have one move
   *                       // (after which they're pruned from actionPlayers).
   *                       // The phase ends once actionPlayers becomes empty.
   *   }
   */

  function SetActionPlayersEvent(state, arg) {
    return _objectSpread({}, state, {
      ctx: setActionPlayers(state.G, state.ctx, arg)
    });
  }

  function setActionPlayers(G, ctx, arg) {
    var actionPlayers = [];

    if (arg.value) {
      actionPlayers = arg.value(G, ctx);
    }

    if (arg.all) {
      actionPlayers = _toConsumableArray(ctx.playOrder);
    }

    if (arg.others) {
      actionPlayers = _toConsumableArray(ctx.playOrder).filter(function (nr) {
        return nr !== ctx.currentPlayer;
      });
    }

    if (Array.isArray(arg)) {
      actionPlayers = arg;
    }

    return _objectSpread({}, ctx, {
      actionPlayers: actionPlayers,
      _actionPlayersOnce: arg.once || false
    });
  }
  /**
   * Converts a playOrderPos index into its value in playOrder.
   * @param {Array} playOrder - An array of player ID's.
   * @param {number} playOrderPos - An index into the above.
   */


  function getCurrentPlayer(playOrder, playOrderPos) {
    return playOrder[playOrderPos] + '';
  }
  /**
   * Called at the start of a phase to initialize turn order state.
   * @param {object} G - The game object G.
   * @param {object} ctx - The game object ctx.
   * @param {object} turnOrder - A turn order object for this phase.
   */


  function InitTurnOrderState(G, ctx, turnOrder) {
    var playOrder = _toConsumableArray(new Array(ctx.numPlayers)).map(function (d, i) {
      return i + '';
    });

    if (turnOrder.playOrder !== undefined) {
      playOrder = turnOrder.playOrder(G, ctx);
    }

    var playOrderPos = turnOrder.first(G, ctx);
    var currentPlayer = getCurrentPlayer(playOrder, playOrderPos);

    if (turnOrder.actionPlayers !== undefined) {
      ctx = setActionPlayers(G, ctx, turnOrder.actionPlayers);
    } else {
      ctx = _objectSpread({}, ctx, {
        actionPlayers: [currentPlayer]
      });
    }

    return _objectSpread({}, ctx, {
      currentPlayer: currentPlayer,
      playOrderPos: playOrderPos,
      playOrder: playOrder
    });
  }
  /**
   * Called at the end of each turn to update the turn order state.
   * @param {object} G - The game object G.
   * @param {object} ctx - The game object ctx.
   * @param {object} turnOrder - A turn order object for this phase.
   * @param {string} endTurnArg - An optional argument to endTurn that
                                  may specify the next player.
   */

  function UpdateTurnOrderState(G, ctx, turnOrder, endTurnArg) {
    var playOrderPos = ctx.playOrderPos;
    var currentPlayer = ctx.currentPlayer;
    var actionPlayers = ctx.actionPlayers;
    var endPhase = false;

    if (endTurnArg && endTurnArg !== true) {
      if (ctx.playOrder.includes(endTurnArg.next)) {
        playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
        currentPlayer = endTurnArg.next;
        actionPlayers = [currentPlayer];
      } else {
        error("invalid argument to endTurn: ".concat(endTurnArg));
      }
    } else {
      var t = turnOrder.next(G, ctx);

      if (t === undefined) {
        endPhase = true;
      } else {
        playOrderPos = t;
        currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);

        if (turnOrder.actionPlayers === undefined) {
          actionPlayers = [currentPlayer];
        }
      }
    }

    ctx = _objectSpread({}, ctx, {
      playOrderPos: playOrderPos,
      currentPlayer: currentPlayer,
      actionPlayers: actionPlayers
    });
    return {
      endPhase: endPhase,
      ctx: ctx
    };
  }
  /**
   * Set of different turn orders possible in a phase.
   * These are meant to be passed to the `turnOrder` setting
   * in the flow objects.
   *
   * Each object defines the first player when the phase / game
   * begins, and also a function `next` to determine who the
   * next player is when the turn ends.
   *
   * Objects can also contain an actionPlayers section which
   * is passed to SetActionPlayers above at the beginning of
   * the phase.
   *
   * The phase ends if next() returns undefined.
   */

  var TurnOrder = {
    /**
     * DEFAULT
     *
     * The default round-robin turn order.
     */
    DEFAULT: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        return (ctx.playOrderPos + 1) % ctx.playOrder.length;
      }
    },

    /**
     * ONCE
     *
     * Another round-robin turn order, but goes around just once.
     * The phase ends after all players have played.
     */
    ONCE: {
      first: function first() {
        return 0;
      },
      next: function next(G, ctx) {
        if (ctx.playOrderPos < ctx.playOrder.length - 1) {
          return ctx.playOrderPos + 1;
        }
      }
    },

    /**
     * ANY
     *
     * The turn stays with one player, but any player can play (in any order)
     * until the phase ends.
     */
    ANY: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        return ctx.playOrderPos;
      },
      actionPlayers: {
        all: true
      }
    },

    /**
     * ANY_ONCE
     *
     * The turn stays with one player, but any player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every player in the game.
     */
    ANY_ONCE: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        return ctx.playOrderPos;
      },
      actionPlayers: {
        all: true,
        once: true
      },
      endPhaseOnceDone: true
    },

    /**
     * OTHERS
     *
     * The turn stays with one player, and every *other* player can play (in any order)
     * until the phase ends.
     */
    OTHERS: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        return ctx.playOrderPos;
      },
      actionPlayers: {
        others: true
      }
    },

    /**
     * OTHERS_ONCE
     *
     * The turn stays with one player, and every *other* player can play (once, and in any order).
     * This is typically used in a phase where you want to elicit a response
     * from every *other* player in the game.
     */
    OTHERS_ONCE: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        return ctx.playOrderPos;
      },
      actionPlayers: {
        others: true,
        once: true
      },
      endPhaseOnceDone: true
    },

    /**
     * CUSTOM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase.
     *
     * @param {Array} playOrder - The play order.
     */
    CUSTOM: function CUSTOM(_playOrder) {
      return {
        playOrder: function playOrder() {
          return _playOrder;
        },
        first: function first() {
          return 0;
        },
        next: function next(G, ctx) {
          return (ctx.playOrderPos + 1) % ctx.playOrder.length;
        }
      };
    },

    /**
     * CUSTOM_FROM
     *
     * Identical to DEFAULT, but also sets playOrder at the
     * beginning of the phase to a value specified by a field
     * in G.
     *
     * @param {string} playOrderField - Field in G.
     */
    CUSTOM_FROM: function CUSTOM_FROM(playOrderField) {
      return {
        playOrder: function playOrder(G) {
          return G[playOrderField];
        },
        first: function first() {
          return 0;
        },
        next: function next(G, ctx) {
          return (ctx.playOrderPos + 1) % ctx.playOrder.length;
        }
      };
    },

    /**
     * SKIP
     *
     * Round-robin, but skips over any players that have passed.
     * Meant to be used with Pass above.
     */
    SKIP: {
      first: function first(G, ctx) {
        return ctx.playOrderPos;
      },
      next: function next(G, ctx) {
        if (G.allPassed) return;
        var playOrderPos = ctx.playOrderPos;

        for (var i = 0; i < ctx.playOrder.length; i++) {
          playOrderPos = (playOrderPos + 1) % ctx.playOrder.length;

          if (!G.passOrder.includes(ctx.playOrder[playOrderPos] + '')) {
            return playOrderPos;
          }
        }
      }
    }
  };

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var MAKE_MOVE = 'MAKE_MOVE';
  var GAME_EVENT = 'GAME_EVENT';
  var REDO = 'REDO';
  var RESET = 'RESET';
  var SYNC = 'SYNC';
  var UNDO = 'UNDO';
  var UPDATE = 'UPDATE';

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  /**
   * Generate an automatic game event that is a side-effect of a move.
   * @param {string} type - The event type.
   * @param {Array}  args - Additional arguments.
   * @param {string}  playerID - The ID of the player making this action.
   * @param {string}  credentials - (optional) The credentials for the player making this action.
   */

  var automaticGameEvent = function automaticGameEvent(type, args, playerID, credentials) {
    return {
      type: GAME_EVENT,
      payload: {
        type: type,
        args: args,
        playerID: playerID,
        credentials: credentials
      },
      automatic: true
    };
  };

  // Inlined version of Alea from https://github.com/davidbau/seedrandom.

  /*
   * Copyright 2015 David Bau.
   *
   * Permission is hereby granted, free of charge,
   * to any person obtaining a copy of this software
   * and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge,
   * publish, distribute, sublicense, and/or sell copies of the
   * Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall
   * be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
   * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
   * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   * DEALINGS IN THE SOFTWARE.
   */
  function Alea(seed) {
    var me = this,
        mash = Mash();

    me.next = function () {
      var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32

      me.s0 = me.s1;
      me.s1 = me.s2;
      return me.s2 = t - (me.c = t | 0);
    }; // Apply the seeding algorithm from Baagoe.


    me.c = 1;
    me.s0 = mash(' ');
    me.s1 = mash(' ');
    me.s2 = mash(' ');
    me.s0 -= mash(seed);

    if (me.s0 < 0) {
      me.s0 += 1;
    }

    me.s1 -= mash(seed);

    if (me.s1 < 0) {
      me.s1 += 1;
    }

    me.s2 -= mash(seed);

    if (me.s2 < 0) {
      me.s2 += 1;
    }

    mash = null;
  }

  function copy(f, t) {
    t.c = f.c;
    t.s0 = f.s0;
    t.s1 = f.s1;
    t.s2 = f.s2;
    return t;
  }

  function Mash() {
    var n = 0xefc8249d;

    var mash = function mash(data) {
      data = data.toString();

      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }

      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    return mash;
  }

  function alea(seed, opts) {
    var xg = new Alea(seed),
        state = opts && opts.state,
        prng = xg.next;
    prng.quick = prng;

    if (state) {
      if (_typeof(state) == 'object') copy(state, xg);

      prng.state = function () {
        return copy(xg, {});
      };
    }

    return prng;
  }

  /**
   * Random
   *
   * Calls that require a pseudorandom number generator.
   * Uses a seed from ctx, and also persists the PRNG
   * state in ctx so that moves can stay pure.
   */

  var Random =
  /*#__PURE__*/
  function () {
    /**
     * constructor
     * @param {object} ctx - The ctx object to initialize from.
     */
    function Random(ctx) {
      _classCallCheck(this, Random);

      // If we are on the client, the seed is not present.
      // Just use a temporary seed to execute the move without
      // crashing it. The move state itself is discarded,
      // so the actual value doesn't matter.
      this.state = ctx._random || {
        seed: '0'
      };
    }
    /**
     * Updates ctx with the PRNG state.
     * @param {object} ctx - The ctx object to update.
     */


    _createClass(Random, [{
      key: "update",
      value: function update(state) {
        var ctx = _objectSpread({}, state.ctx, {
          _random: this.state
        });

        return _objectSpread({}, state, {
          ctx: ctx
        });
      }
      /**
       * Attaches the Random API to ctx.
       * @param {object} ctx - The ctx object to attach to.
       */

    }, {
      key: "attach",
      value: function attach(ctx) {
        return _objectSpread({}, ctx, {
          random: this._api()
        });
      }
      /**
       * Generate a random number.
       */

    }, {
      key: "_random",
      value: function _random() {
        var R = this.state;
        var fn;

        if (R.prngstate === undefined) {
          // No call to a random function has been made.
          fn = new alea(R.seed, {
            state: true
          });
        } else {
          fn = new alea('', {
            state: R.prngstate
          });
        }

        var number = fn();
        this.state = _objectSpread({}, R, {
          prngstate: fn.state()
        });
        return number;
      }
    }, {
      key: "_api",
      value: function _api() {
        var random = this._random.bind(this);

        var SpotValue = {
          D4: 4,
          D6: 6,
          D8: 8,
          D10: 10,
          D12: 12,
          D20: 20
        }; // Generate functions for predefined dice values D4 - D20.

        var predefined = {};

        var _loop = function _loop(key) {
          var spotvalue = SpotValue[key];

          predefined[key] = function (diceCount) {
            if (diceCount === undefined) {
              return Math.floor(random() * spotvalue) + 1;
            } else {
              return _toConsumableArray(new Array(diceCount).keys()).map(function () {
                return Math.floor(random() * spotvalue) + 1;
              });
            }
          };
        };

        for (var key in SpotValue) {
          _loop(key);
        }

        return _objectSpread({}, predefined, {
          /**
           * Roll a die of specified spot value.
           *
           * @param {number} spotvalue - The die dimension (default: 6).
           * @param {number} diceCount - number of dice to throw.
           *                             if not defined, defaults to 1 and returns the value directly.
           *                             if defined, returns an array containing the random dice values.
           */
          Die: function Die(spotvalue, diceCount) {
            if (spotvalue === undefined) {
              spotvalue = 6;
            }

            if (diceCount === undefined) {
              return Math.floor(random() * spotvalue) + 1;
            } else {
              return _toConsumableArray(new Array(diceCount).keys()).map(function () {
                return Math.floor(random() * spotvalue) + 1;
              });
            }
          },

          /**
           * Generate a random number between 0 and 1.
           */
          Number: function Number() {
            return random();
          },

          /**
           * Shuffle an array.
           *
           * @param {Array} deck - The array to shuffle. Does not mutate
           *                       the input, but returns the shuffled array.
           */
          Shuffle: function Shuffle(deck) {
            var clone = deck.slice(0);
            var srcIndex = deck.length;
            var dstIndex = 0;
            var shuffled = new Array(srcIndex);

            while (srcIndex) {
              var randIndex = srcIndex * random() | 0;
              shuffled[dstIndex++] = clone[randIndex];
              clone[randIndex] = clone[--srcIndex];
            }

            return shuffled;
          }
        });
      }
    }]);

    return Random;
  }();
  /**
   * Removes the attached Random api from ctx.
   *
   * @param {object} ctx - The ctx object with the Random API attached.
   * @returns {object} A plain ctx object without the Random API.
   */

  Random.detach = function (ctx) {
    var random = ctx.random,
        rest = _objectWithoutProperties(ctx, ["random"]); // eslint-disable-line no-unused-vars


    return rest;
  };
  /**
   * Generates a new seed from the current date / time.
   */


  Random.seed = function () {
    return (+new Date()).toString(36).slice(-10);
  };

  /**
   * Events
   */

  var Events =
  /*#__PURE__*/
  function () {
    function Events(flow, playerID) {
      _classCallCheck(this, Events);

      this.flow = flow;
      this.playerID = playerID;
      this.dispatch = [];
    }
    /**
     * Attaches the Events API to ctx.
     * @param {object} ctx - The ctx object to attach to.
     */


    _createClass(Events, [{
      key: "attach",
      value: function attach(ctx) {
        var _this = this;

        var events = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var key = _step.value;

            events[key] = function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              _this.dispatch.push({
                key: key,
                args: args
              });
            };
          };

          for (var _iterator = this.flow.eventNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return _objectSpread({}, ctx, {
          events: events
        });
      }
      /**
       * Updates ctx with the triggered events.
       * @param {object} state - The state object { G, ctx }.
       */

    }, {
      key: "update",
      value: function update$$1(state) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.dispatch[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;
            var action = automaticGameEvent(item.key, item.args, this.playerID);
            state = _objectSpread({}, state, this.flow.processGameEvent(state, action));
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return state;
      }
    }]);

    return Events;
  }();
  /**
   * Detaches the Events API from ctx.
   * @param {object} ctx - The ctx object to strip.
   */

  Events.detach = function (ctx) {
    var events = ctx.events,
        rest = _objectWithoutProperties(ctx, ["events"]); // eslint-disable-line no-unused-vars


    return rest;
  };

  /**
   * Moves can return this when they want to indicate
   * that the combination of arguments is illegal and
   * the move ought to be discarded.
   */

  var INVALID_MOVE = 'INVALID_MOVE';
  /**
   * Context API to allow writing custom logs in games.
   */

  var GameLoggerCtxAPI =
  /*#__PURE__*/
  function () {
    function GameLoggerCtxAPI() {
      _classCallCheck(this, GameLoggerCtxAPI);

      this._payload = undefined;
    }

    _createClass(GameLoggerCtxAPI, [{
      key: "_api",
      value: function _api() {
        var _this = this;

        return {
          setPayload: function setPayload(payload) {
            _this._payload = payload;
          }
        };
      }
    }, {
      key: "attach",
      value: function attach(ctx$$1) {
        return _objectSpread({}, ctx$$1, {
          log: this._api()
        });
      }
    }, {
      key: "update",
      value: function update(state) {
        if (this._payload === undefined) {
          return state;
        } // attach the payload to the last log event


        var deltalog = state.deltalog;
        deltalog[deltalog.length - 1] = _objectSpread({}, deltalog[deltalog.length - 1], {
          payload: this._payload
        });
        this._payload = undefined;
        return _objectSpread({}, state, {
          deltalog: deltalog
        });
      }
    }], [{
      key: "detach",
      value: function detach(ctx$$1) {
        var log = ctx$$1.log,
            ctxWithoutLog = _objectWithoutProperties(ctx$$1, ["log"]); // eslint-disable-line no-unused-vars


        return ctxWithoutLog;
      }
    }]);

    return GameLoggerCtxAPI;
  }();
  /**
   * This class is used to attach/detach various utility objects
   * onto a ctx, without having to manually attach/detach them
   * all separately.
   */

  var ContextEnhancer =
  /*#__PURE__*/
  function () {
    function ContextEnhancer(ctx$$1, game, player) {
      _classCallCheck(this, ContextEnhancer);

      this.random = new Random(ctx$$1);
      this.events = new Events(game.flow, player);
      this.log = new GameLoggerCtxAPI();
    }

    _createClass(ContextEnhancer, [{
      key: "attachToContext",
      value: function attachToContext(ctx$$1) {
        var ctxWithAPI = this.random.attach(ctx$$1);
        ctxWithAPI = this.events.attach(ctxWithAPI);
        ctxWithAPI = this.log.attach(ctxWithAPI);
        return ctxWithAPI;
      }
    }, {
      key: "_update",
      value: function _update(state, updateEvents) {
        var newState = updateEvents ? this.events.update(state) : state;
        newState = this.random.update(newState);
        newState = this.log.update(newState);
        return newState;
      }
    }, {
      key: "updateAndDetach",
      value: function updateAndDetach(state, updateEvents) {
        var newState = this._update(state, updateEvents);

        newState.ctx = ContextEnhancer.detachAllFromContext(newState.ctx);
        return newState;
      }
    }], [{
      key: "detachAllFromContext",
      value: function detachAllFromContext(ctx$$1) {
        var ctxWithoutAPI = Random.detach(ctx$$1);
        ctxWithoutAPI = Events.detach(ctxWithoutAPI);
        ctxWithoutAPI = GameLoggerCtxAPI.detach(ctxWithoutAPI);
        return ctxWithoutAPI;
      }
    }]);

    return ContextEnhancer;
  }();
  /**
   * InitializeGame
   *
   * Creates the initial game state.
   *
   * @param {...object} game - Return value of Game().
   * @param {...object} numPlayers - The number of players.
   * @param {...object} multiplayer - Set to true if we are in a multiplayer client.
   */

  function InitializeGame(_ref) {
    var game = _ref.game,
        numPlayers = _ref.numPlayers,
        setupData = _ref.setupData;

    if (!numPlayers) {
      numPlayers = 2;
    }

    var ctx$$1 = game.flow.ctx(numPlayers);
    var seed = game.seed;

    if (seed === undefined) {
      seed = Random.seed();
    }

    ctx$$1._random = {
      seed: seed
    }; // Pass ctx through all the plugins that want to modify it.

    ctx$$1 = ctx.setup(ctx$$1, game); // Augment ctx with the enhancers (TODO: move these into plugins).

    var apiCtx = new ContextEnhancer(ctx$$1, game, ctx$$1.currentPlayer);
    var ctxWithAPI = apiCtx.attachToContext(ctx$$1);
    var initialG = game.setup(ctxWithAPI, setupData); // Pass G through all the plugins that want to modify it.

    initialG = G.setup(initialG, ctxWithAPI, game);
    var initial = {
      // User managed state.
      G: initialG,
      // Framework managed state.
      ctx: ctx$$1,
      // List of {G, ctx} pairs that can be undone.
      _undo: [],
      // List of {G, ctx} pairs that can be redone.
      _redo: [],
      // A monotonically non-decreasing ID to ensure that
      // state updates are only allowed from clients that
      // are at the same version that the server.
      _stateID: 0,
      // A snapshot of this object so that actions can be
      // replayed over it to view old snapshots.
      // TODO: This will no longer be necessary once the
      // log stops replaying actions (but reads the actual
      // game states instead).
      _initial: {}
    };
    var state = game.flow.init({
      G: initial.G,
      ctx: ctxWithAPI
    });
    initial.G = state.G;
    initial._undo = state._undo;
    state = apiCtx.updateAndDetach(state, true);
    initial.ctx = state.ctx;

    var deepCopy = function deepCopy(obj) {
      return flatted.parse(flatted.stringify(obj));
    };

    initial._initial = deepCopy(initial);
    return initial;
  }
  /**
   * CreateGameReducer
   *
   * Creates the main game state reducer.
   * @param {...object} game - Return value of Game().
   * @param {...object} numPlayers - The number of players.
   * @param {...object} multiplayer - Set to true if we are in a multiplayer client.
   */

  function CreateGameReducer(_ref2) {
    var game = _ref2.game,
        multiplayer = _ref2.multiplayer;

    /**
     * GameReducer
     *
     * Redux reducer that maintains the overall game state.
     * @param {object} state - The state before the action.
     * @param {object} action - A Redux action.
     */
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 ? arguments[1] : undefined;

      switch (action.type) {
        case GAME_EVENT:
          {
            state = _objectSpread({}, state, {
              deltalog: []
            }); // Process game events only on the server.
            // These events like `endTurn` typically
            // contain code that may rely on secret state
            // and cannot be computed on the client.

            if (multiplayer) {
              return state;
            } // Ignore the event if the player isn't allowed to make it.


            if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerCallEvent(state.G, state.ctx, action.payload.playerID)) {
              return state;
            }

            var apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);
            state.ctx = apiCtx.attachToContext(state.ctx);
            var newState = game.flow.processGameEvent(state, action);
            newState = apiCtx.updateAndDetach(newState, true);
            return _objectSpread({}, newState, {
              _stateID: state._stateID + 1
            });
          }

        case MAKE_MOVE:
          {
            state = _objectSpread({}, state, {
              deltalog: []
            }); // Check whether the game knows the move at all.

            if (!game.moveNames.includes(action.payload.type)) {
              return state;
            } // Ignore the move if it isn't allowed at this point.


            if (!game.flow.canMakeMove(state.G, state.ctx, action.payload.type)) {
              return state;
            } // Ignore the move if the player isn't allowed to make it.


            if (action.payload.playerID !== null && action.payload.playerID !== undefined && !game.flow.canPlayerMakeMove(state.G, state.ctx, action.payload.playerID)) {
              return state;
            }

            var _apiCtx = new ContextEnhancer(state.ctx, game, action.payload.playerID);

            var ctxWithAPI = _apiCtx.attachToContext(state.ctx); // Process the move.


            var G$$1 = game.processMove(state.G, action.payload, ctxWithAPI);

            if (G$$1 === INVALID_MOVE) {
              // the game declared the move as invalid.
              return state;
            } // Create a log entry for this move.


            var logEntry = {
              action: action,
              _stateID: state._stateID,
              turn: state.ctx.turn,
              phase: state.ctx.phase
            }; // don't call into events here

            var _newState = _apiCtx.updateAndDetach(_objectSpread({}, state, {
              deltalog: [logEntry]
            }), false);

            var ctx$$1 = _newState.ctx; // Undo changes to G if the move should not run on the client.

            if (multiplayer && !game.flow.optimisticUpdate(G$$1, ctx$$1, action.payload)) {
              G$$1 = state.G;
            }

            state = _objectSpread({}, _newState, {
              G: G$$1,
              ctx: ctx$$1,
              _stateID: state._stateID + 1
            }); // If we're on the client, just process the move
            // and no triggers in multiplayer mode.
            // These will be processed on the server, which
            // will send back a state update.

            if (multiplayer) {
              return state;
            } // Allow the flow reducer to process any triggers that happen after moves.


            ctxWithAPI = _apiCtx.attachToContext(state.ctx);
            state = game.flow.processMove(_objectSpread({}, state, {
              ctx: ctxWithAPI
            }), action.payload);
            state = _apiCtx.updateAndDetach(state, true);
            state._undo[state._undo.length - 1].ctx = state.ctx;
            return state;
          }

        case RESET:
        case UPDATE:
        case SYNC:
          {
            return action.state;
          }

        case UNDO:
          {
            var _state = state,
                _undo = _state._undo,
                _redo = _state._redo;

            if (_undo.length < 2) {
              return state;
            }

            var last = _undo[_undo.length - 1];
            var restore = _undo[_undo.length - 2]; // Only allow undoable moves to be undone.

            if (!game.flow.canUndoMove(state.G, state.ctx, last.moveType)) {
              return state;
            }

            return _objectSpread({}, state, {
              G: restore.G,
              ctx: restore.ctx,
              _undo: _undo.slice(0, _undo.length - 1),
              _redo: [last].concat(_toConsumableArray(_redo))
            });
          }

        case REDO:
          {
            var _state2 = state,
                _undo2 = _state2._undo,
                _redo2 = _state2._redo;

            if (_redo2.length == 0) {
              return state;
            }

            var first = _redo2[0];
            return _objectSpread({}, state, {
              G: first.G,
              ctx: first.ctx,
              _undo: [].concat(_toConsumableArray(_undo2), [first]),
              _redo: _redo2.slice(1)
            });
          }

        default:
          {
            return state;
          }
      }
    };
  }

  /**
   * Helper to create a reducer that manages ctx (with the
   * ability to also update G).
   *
   * You probably want to use FlowWithPhases below, but you might
   * need to use this directly if you are creating a very customized
   * game flow that it cannot handle.
   *
   * @param {...object} ctx - Function with the signature
   *                          numPlayers => ctx
   *                          that determines the initial value of ctx.
   * @param {...object} events - Object containing functions
   *                             named after events that this
   *                             reducer will handle. Each function
   *                             has the following signature:
   *                             ({G, ctx}) => {G, ctx}
   * @param {...object} enabledEvents - Map of eventName -> bool indicating
   *                                    which events are callable from the client
   *                                    or from within moves.
   * @param {...object} processMove - A function that's called whenever a move is made.
   *                                  (state, action, dispatch) => state.
   * @param {...object} optimisticUpdate - (G, ctx, move) => boolean
   *                                       Control whether a move should
   *                                       be executed optimistically on
   *                                       the client while waiting for
   *                                       the result of execution from
   *                                       the server.
   * @param {...object} canMakeMove - (G, ctx, moveName) => boolean
   *                                  Predicate to determine whether a
   *                                  particular move is allowed at
   *                                  this time.
   *
   * @param {...object} canUndoMove - (G, ctx, moveName) => boolean
   *                                  Predicate to determine whether a
   *                                  particular move is undoable at this
   *                                  time.
   *
   * @param {Array} redactedMoves - List of moves to be redacted
   *                                from the log.
   */

  function Flow(_ref) {
    var ctx$$1 = _ref.ctx,
        events = _ref.events,
        enabledEvents = _ref.enabledEvents,
        init = _ref.init,
        _processMove = _ref.processMove,
        optimisticUpdate = _ref.optimisticUpdate,
        _canMakeMove = _ref.canMakeMove,
        canUndoMove = _ref.canUndoMove,
        redactedMoves = _ref.redactedMoves;
    if (!ctx$$1) ctx$$1 = function ctx$$1() {
      return {};
    };
    if (!events) events = {};
    if (!enabledEvents) enabledEvents = {};
    if (!init) init = function init(state) {
      return state;
    };
    if (!_processMove) _processMove = function processMove(state) {
      return state;
    };
    if (!_canMakeMove) _canMakeMove = function canMakeMove() {
      return true;
    };
    if (!canUndoMove) canUndoMove = function canUndoMove() {
      return true;
    };

    if (optimisticUpdate === undefined) {
      optimisticUpdate = function optimisticUpdate() {
        return true;
      };
    }

    var dispatch = function dispatch(state, action) {
      var payload = action.payload;

      if (events.hasOwnProperty(payload.type)) {
        var context = {
          playerID: payload.playerID,
          dispatch: dispatch
        };
        var logEntry = {
          action: action,
          _stateID: state._stateID,
          turn: state.ctx.turn,
          phase: state.ctx.phase
        };
        var deltalog = [].concat(_toConsumableArray(state.deltalog || []), [logEntry]);
        state = _objectSpread({}, state, {
          deltalog: deltalog
        });
        var args = [state].concat(payload.args);
        return events[payload.type].apply(context, args);
      }

      return state;
    };

    return {
      ctx: ctx$$1,
      init: init,
      canUndoMove: canUndoMove,
      redactedMoves: redactedMoves,
      eventNames: Object.getOwnPropertyNames(events),
      enabledEventNames: Object.getOwnPropertyNames(enabledEvents),
      processMove: function processMove(state, action) {
        return _processMove(state, action, dispatch);
      },
      processGameEvent: function processGameEvent(state, action) {
        return dispatch(state, action, dispatch);
      },
      optimisticUpdate: optimisticUpdate,
      canPlayerCallEvent: function canPlayerCallEvent(G$$1, ctx$$1, playerID) {
        return ctx$$1.currentPlayer == playerID && ctx$$1.actionPlayers.includes(playerID);
      },
      canPlayerMakeMove: function canPlayerMakeMove(G$$1, ctx$$1, playerID) {
        var actionPlayers = ctx$$1.actionPlayers || [];
        return actionPlayers.includes(playerID);
      },
      canMakeMove: function canMakeMove(G$$1, ctx$$1, moveName) {
        // Disallow moves once the game is over.
        if (ctx$$1.gameover !== undefined) return false; // User-provided move validation.

        return _canMakeMove(G$$1, ctx$$1, moveName);
      }
    };
  }
  /**
   * FlowWithPhases
   *
   * A very customizable game flow that introduces phases to the
   * game. Each phase can be configured with:
   * - A custom turn order.
   * - Automatically executed setup / cleanup code.
   * - Custom phase end conditions.
   * - A move whitelist that disallows other moves during the phase.
   *
   * @param {...object} movesPerTurn - End the turn automatically after a certain number
   *                                   of moves (default: undefined, i.e. the turn does
   *                                   not automatically end after a certain number of moves).
   *
   * @param {...object} endTurnIf - The turn automatically ends if this
   *                                returns a truthy value
   *                                (checked after each move).
   *                                If the return value is { next: playerID },
   *                                that player is the next player
   *                                (instead of following the turn order).
   *                                (G, ctx) => boolean|object
   *
   * @param {...object} endGameIf - The game automatically ends if this function
   *                                returns anything (checked after each move).
   *                                The return value is available at ctx.gameover.
   *                                (G, ctx) => {}
   *
   * @param {...object} onTurnBegin - Any code to run when a turn begins.
   *                                 (G, ctx) => G
   *
   * @param {...object} onTurnEnd - Any code to run when a turn ends.
   *                                (G, ctx) => G
   *
   * @param {...object} onMove - Any code to run at the end of a move.
   *                             (G, ctx, { type: 'moveName', args: [] }) => G
   *
   * @param {...object} turnOrder - Customize the turn order (see turn-order.js).
   *
   * @param {...object} endTurn - Set to false to disable the `endTurn` event.
   *
   * @param {...object} endPhase - Set to false to disable the `endPhase` event.
   *
   * @param {...object} endGame - Set to true to enable the `endGame` event.
   *
   * @param {...object} setActionPlayers - Set to true to enable the `setActionPlayers` event.
   *
   * @param {...object} allowedMoves - List of moves that are allowed.
   *                                   This can be either a list of
   *                                   move names or a function with the
   *                                   signature (G, ctx) => [].
   *                                   (default: null, i.e. all moves are allowed).
   *
   * @param {...object} undoableMoves - List of moves that are undoable,
   *                                   (default: null, i.e. all moves are undoable).
   *
   * @param {Array} redactedMoves - List of moves to be redacted
   *                                from the log.
   *
   * @param {object} game - The game object.
   *
   * @param {...object} optimisticUpdate - (G, ctx, move) => boolean
   *                                       Control whether a move should
   *                                       be executed optimistically on
   *                                       the client while waiting for
   *                                       the result of execution from
   *                                       the server.
   *
   * @param {...object} phases - A map of phases in the game.
   *
   * Each phase is described by an object whose key is the phase name.
   *
   * All the properties below override their global equivalents
   * above whenever they are defined (i.e. the global setting
   * is used if a phase-specific setting is absent).
   *
   * {
   *   // Any setup code to run before the phase begins.
   *   onPhaseBegin: (G, ctx) => G,
   *
   *   // Any cleanup code to run after the phase ends.
   *   onPhaseEnd: (G, ctx) => G,
   *
   *   // The phase ends if this function returns a truthy value.
   *   // If the return value is of the form { next: 'phase name' }
   *   // then that will be chosen as the next phase.
   *   endPhaseIf: (G, ctx) => boolean|object,
   *
   *   Phase-specific options that override their global equivalents:
   *
   *   // A phase-specific endTurnIf.
   *   endTurnIf: (G, ctx) => boolean|object,
   *
   *   // A phase-specific endGameIf.
   *   endGameIf: (G, ctx) => {},
   *
   *   // A phase-specific onTurnBegin
   *   onTurnBegin: (G, ctx) => G,
   *
   *   // A phase-specific onTurnEnd.
   *   onTurnEnd: (G, ctx) => G,
   *
   *   // A phase-specific onMove.
   *   onMove - (G, ctx) => G,
   *
   *   // A phase-specific turnOrder.
   *   turnOrder: TurnOrder.DEFAULT,
   *
   *   // A phase-specific movesPerTurn.
   *   movesPerTurn: integer,
   *
   *   // List of moves or a function that returns a list of moves
   *   // that are allowed in this phase.
   *   allowedMoves: (G, ctx) => ['moveA', ...],
   *
   *   // List of moves that are undoable.
   *   undoableMoves: ['moveA', ...],
   * }
   */

  function FlowWithPhases(_ref2) {
    var phases = _ref2.phases,
        startingPhase = _ref2.startingPhase,
        movesPerTurn = _ref2.movesPerTurn,
        endTurnIf = _ref2.endTurnIf,
        endGameIf = _ref2.endGameIf,
        onTurnBegin = _ref2.onTurnBegin,
        onTurnEnd = _ref2.onTurnEnd,
        onMove = _ref2.onMove,
        turnOrder = _ref2.turnOrder,
        endTurn = _ref2.endTurn,
        endPhase = _ref2.endPhase,
        endGame = _ref2.endGame,
        setActionPlayers = _ref2.setActionPlayers,
        undoableMoves = _ref2.undoableMoves,
        allowedMoves = _ref2.allowedMoves,
        redactedMoves = _ref2.redactedMoves,
        _optimisticUpdate = _ref2.optimisticUpdate,
        game = _ref2.game;

    // Attach defaults.
    if (endPhase === undefined && phases) {
      endPhase = true;
    }

    if (endTurn === undefined) {
      endTurn = true;
    }

    if (endGame === undefined) {
      endGame = false;
    }

    if (setActionPlayers === undefined) {
      setActionPlayers = false;
    }

    if (_optimisticUpdate === undefined) {
      _optimisticUpdate = function optimisticUpdate() {
        return true;
      };
    }

    if (game === undefined) {
      game = {
        plugins: []
      };
    }

    if (!phases) phases = {};
    if (!startingPhase) startingPhase = 'default';
    if (!endTurnIf) endTurnIf = function endTurnIf() {
      return false;
    };
    if (!endGameIf) endGameIf = function endGameIf() {
      return undefined;
    };
    if (!onTurnBegin) onTurnBegin = function onTurnBegin(G$$1) {
      return G$$1;
    };
    if (!onTurnEnd) onTurnEnd = function onTurnEnd(G$$1) {
      return G$$1;
    };
    if (!onMove) onMove = function onMove(G$$1) {
      return G$$1;
    };
    if (!turnOrder) turnOrder = TurnOrder.DEFAULT;
    if (allowedMoves === undefined) allowedMoves = null;
    if (undoableMoves === undefined) undoableMoves = null;
    var phaseMap = phases;

    if ('default' in phaseMap) {
      error('cannot specify phase with name "default"');
    }

    phaseMap['default'] = {};

    for (var phase in phaseMap) {
      var conf = phaseMap[phase];

      if (conf.endPhaseIf === undefined) {
        conf.endPhaseIf = function () {
          return undefined;
        };
      }

      if (conf.onPhaseBegin === undefined) {
        conf.onPhaseBegin = function (G$$1) {
          return G$$1;
        };
      }

      conf.onPhaseBegin = FnWrap(conf.onPhaseBegin, game);

      if (conf.onPhaseEnd === undefined) {
        conf.onPhaseEnd = function (G$$1) {
          return G$$1;
        };
      }

      conf.onPhaseEnd = FnWrap(conf.onPhaseEnd, game);

      if (conf.movesPerTurn === undefined) {
        conf.movesPerTurn = movesPerTurn;
      }

      if (conf.endTurnIf === undefined) {
        conf.endTurnIf = endTurnIf;
      }

      if (conf.endGameIf === undefined) {
        conf.endGameIf = endGameIf;
      }

      if (conf.onTurnBegin === undefined) {
        conf.onTurnBegin = onTurnBegin;
      }

      conf.onTurnBegin = FnWrap(conf.onTurnBegin, game);

      if (conf.onTurnEnd === undefined) {
        conf.onTurnEnd = onTurnEnd;
      }

      conf.onTurnEnd = FnWrap(conf.onTurnEnd, game);

      if (conf.onMove === undefined) {
        conf.onMove = onMove;
      }

      conf.onMove = FnWrap(conf.onMove, game);

      if (conf.turnOrder === undefined) {
        conf.turnOrder = turnOrder;
      }

      if (conf.undoableMoves === undefined) {
        conf.undoableMoves = undoableMoves;
      }

      if (conf.allowedMoves === undefined) {
        conf.allowedMoves = allowedMoves;
      }

      if (typeof conf.allowedMoves !== 'function') {
        (function () {
          var t = conf.allowedMoves;

          conf.allowedMoves = function () {
            return t;
          };
        })();
      }
    }

    var shouldEndPhase = function shouldEndPhase(_ref3) {
      var G$$1 = _ref3.G,
          ctx$$1 = _ref3.ctx;
      var conf = phaseMap[ctx$$1.phase];
      return conf.endPhaseIf(G$$1, ctx$$1);
    };

    var shouldEndTurn = function shouldEndTurn(_ref4) {
      var G$$1 = _ref4.G,
          ctx$$1 = _ref4.ctx;
      var conf = phaseMap[ctx$$1.phase];
      var currentPlayerMoves = ctx$$1.stats.turn.numMoves[ctx$$1.currentPlayer] || 0;

      if (conf.movesPerTurn && currentPlayerMoves >= conf.movesPerTurn) {
        return true;
      }

      return conf.endTurnIf(G$$1, ctx$$1);
    }; // Helper to perform start-of-phase initialization.


    var startPhase = function startPhase(state, config) {
      var G$$1 = config.onPhaseBegin(state.G, state.ctx);
      var ctx$$1 = InitTurnOrderState(G$$1, state.ctx, config.turnOrder); // Allow plugins to modify G and ctx at the beginning of a phase.

      G$$1 = G.onPhaseBegin(G$$1, ctx$$1, game);
      ctx$$1 = ctx.onPhaseBegin(ctx$$1, game); // Reset stats.

      ctx$$1.stats = _objectSpread({}, ctx$$1.stats, {
        phase: _objectSpread({}, ctx$$1.stats.phase, {
          numMoves: {},
          allPlayed: false
        })
      });
      var allowedMoves = config.allowedMoves(G$$1, ctx$$1);
      return _objectSpread({}, state, {
        G: G$$1,
        ctx: _objectSpread({}, ctx$$1, {
          allowedMoves: allowedMoves
        })
      });
    };

    var startTurn = function startTurn(state, config) {
      var G$$1 = config.onTurnBegin(state.G, state.ctx);
      var plainCtx = ContextEnhancer.detachAllFromContext(state.ctx);
      var _undo = [{
        G: G$$1,
        ctx: plainCtx
      }];

      var ctx$$1 = _objectSpread({}, state.ctx);

      ctx$$1.allowedMoves = config.allowedMoves(G$$1, ctx$$1); // Reset stats.

      ctx$$1.stats = _objectSpread({}, ctx$$1.stats, {
        turn: _objectSpread({}, ctx$$1.stats.turn, {
          numMoves: {},
          allPlayed: false
        })
      });
      return _objectSpread({}, state, {
        G: G$$1,
        ctx: ctx$$1,
        _undo: _undo,
        _redo: []
      });
    };

    var startGame = function startGame(state) {
      if (!(state.ctx.phase in phaseMap)) {
        error('invalid startingPhase: ' + state.ctx.phase);
        return state;
      }

      var conf = phaseMap[state.ctx.phase];
      state = startPhase(state, conf);
      state = startTurn(state, conf);
      return state;
    };
    /**
     * endPhase (game event)
     *
     * Ends the current phase.
     * Also runs any phase cleanup code and setup code for the
     * next phase (if any).
     *
     * The next phase is chosen in a round-robin fashion, with the
     * option to override that by passing nextPhase.
     *
     * If this call results in a cycle, the phase is reset to
     * the default phase.
     */


    function endPhaseEvent(state, arg, visitedPhases) {
      var G$$1 = state.G;
      var ctx$$1 = state.ctx; // Run any cleanup code for the phase that is about to end.

      var conf = phaseMap[ctx$$1.phase];
      G$$1 = conf.onPhaseEnd(G$$1, ctx$$1);
      var gameover = conf.endGameIf(G$$1, ctx$$1);

      if (gameover !== undefined) {
        return _objectSpread({}, state, {
          G: G$$1,
          ctx: _objectSpread({}, ctx$$1, {
            gameover: gameover
          })
        });
      }

      var prevPhase = ctx$$1.phase; // Update the phase.

      if (arg && arg !== true) {
        if (arg.next in phaseMap) {
          ctx$$1 = _objectSpread({}, ctx$$1, {
            phase: arg.next,
            prevPhase: prevPhase
          });
        } else {
          error('invalid argument to endPhase: ' + arg);
        }
      } else if (conf.next !== undefined) {
        ctx$$1 = _objectSpread({}, ctx$$1, {
          phase: conf.next,
          prevPhase: prevPhase
        });
      } else {
        ctx$$1 = _objectSpread({}, ctx$$1, {
          phase: ctx$$1.prevPhase,
          prevPhase: prevPhase
        });
      } // Run any setup code for the new phase.


      state = startPhase(_objectSpread({}, state, {
        G: G$$1,
        ctx: ctx$$1
      }), phaseMap[ctx$$1.phase]);
      var origTurn = state.ctx.turn; // End the new phase automatically if necessary.
      // In order to avoid infinite loops, the `default`
      // phase is chosen as the next phase the moment we
      // end up at a phase that we've already visited when
      // we processed the endPhase event that kicked of this
      // chain of events.

      if (!visitedPhases) visitedPhases = {};

      if (ctx$$1.phase in visitedPhases) {
        state = this.dispatch(state, automaticGameEvent('endPhase', [{
          next: 'default'
        }, visitedPhases], this.playerID));
      } else {
        visitedPhases[ctx$$1.phase] = true;
        var end = shouldEndPhase(state);

        if (end) {
          state = this.dispatch(state, automaticGameEvent('endPhase', [end, visitedPhases], this.playerID));
        }
      } // End turn if endTurnIf returns something
      // (and the turn has not already been ended by a nested endPhase call).


      var endTurn = shouldEndTurn(state);

      if (endTurn && state.ctx.turn == origTurn) {
        state = this.dispatch(state, automaticGameEvent('endTurn', [endTurn], this.playerID));
      }

      return state;
    }
    /**
     * endTurn (game event)
     *
     * Ends the current turn.
     * Passes the turn to the next turn in a round-robin fashion.
     */


    function endTurnEvent(state, arg) {
      var _state = state,
          G$$1 = _state.G,
          ctx$$1 = _state.ctx;
      var conf = phaseMap[ctx$$1.phase]; // Prevent ending the turn if movesPerTurn haven't been made.

      var currentPlayerMoves = ctx$$1.stats.turn.numMoves[ctx$$1.currentPlayer] || 0;

      if (conf.movesPerTurn && currentPlayerMoves < conf.movesPerTurn) {
        return state;
      } // Run turn-end triggers.


      G$$1 = conf.onTurnEnd(G$$1, ctx$$1); // Update gameover.

      var gameover = conf.endGameIf(G$$1, ctx$$1);

      if (gameover !== undefined) {
        return _objectSpread({}, state, {
          G: G$$1,
          ctx: _objectSpread({}, ctx$$1, {
            gameover: gameover
          })
        });
      }

      var endPhase = false; // Update turn order state.

      {
        var _UpdateTurnOrderState = UpdateTurnOrderState(G$$1, ctx$$1, conf.turnOrder, arg),
            a = _UpdateTurnOrderState.endPhase,
            b = _UpdateTurnOrderState.ctx;

        endPhase = a;
        ctx$$1 = b;
      } // Update turn.

      var turn = ctx$$1.turn + 1; // Update state.

      ctx$$1 = _objectSpread({}, ctx$$1, {
        turn: turn
      });
      state = _objectSpread({}, state, {
        G: G$$1,
        ctx: ctx$$1
      }); // End phase if condition is met.

      var endPhaseArg = shouldEndPhase(state);

      if (endPhaseArg) {
        endPhase = true;
      }

      if (endPhase) {
        return this.dispatch(state, automaticGameEvent('endPhase', [endPhaseArg], this.playerID));
      }

      return startTurn(state, conf);
    }

    function endGameEvent(state, arg) {
      if (arg === undefined) {
        arg = true;
      }

      return _objectSpread({}, state, {
        ctx: _objectSpread({}, state.ctx, {
          gameover: arg
        })
      });
    }

    function updateStats(state, key, playerID) {
      var moves = (state.ctx.stats[key].numMoves[playerID] || 0) + 1;

      var numMoves = _objectSpread({}, state.ctx.stats[key].numMoves, _defineProperty({}, playerID, moves));

      var t = _objectSpread({}, state.ctx.stats[key], {
        numMoves: numMoves
      });

      if (Object.keys(numMoves).length == state.ctx.numPlayers) {
        t.allPlayed = true;
      }

      var stats = _objectSpread({}, state.ctx.stats, _defineProperty({}, key, t));

      var ctx$$1 = _objectSpread({}, state.ctx, {
        stats: stats
      });

      return _objectSpread({}, state, {
        ctx: ctx$$1
      });
    }

    function processMove(state, action, dispatch) {
      var conf = phaseMap[state.ctx.phase];
      state = updateStats(state, 'turn', action.playerID);
      state = updateStats(state, 'phase', action.playerID); // Update actionPlayers if _actionPlayersOnce is set.

      var actionPlayers = state.ctx.actionPlayers;
      var actionPlayersOnceDone = false;

      if (state.ctx._actionPlayersOnce) {
        var playerID = action.playerID;
        actionPlayers = actionPlayers.filter(function (id) {
          return id !== playerID;
        });

        if (actionPlayers.length == 0 && conf.turnOrder.endPhaseOnceDone) {
          actionPlayersOnceDone = true;
        }
      }

      state = _objectSpread({}, state, {
        ctx: _objectSpread({}, state.ctx, {
          actionPlayers: actionPlayers
        })
      });
      var G$$1 = conf.onMove(state.G, state.ctx, action);
      state = _objectSpread({}, state, {
        G: G$$1
      });
      var origTurn = state.ctx.turn;
      var gameover = conf.endGameIf(state.G, state.ctx); // End the phase automatically if endPhaseIf is true or if endGameIf returns.

      var endPhase = shouldEndPhase(state) || actionPlayersOnceDone;

      if (endPhase || gameover !== undefined) {
        state = dispatch(state, automaticGameEvent('endPhase', [endPhase], action.playerID)); // Update to the new phase configuration

        conf = phaseMap[state.ctx.phase];
      } // End the turn automatically if endTurnIf is true or if endGameIf returns.
      // (but not if endPhase above already ends the turn).


      var endTurn = shouldEndTurn(state);

      if (state.ctx.turn == origTurn && (endTurn || gameover !== undefined)) {
        state = dispatch(state, automaticGameEvent('endTurn', [endTurn], action.playerID));
      } // End the game automatically if endGameIf returns.


      if (gameover !== undefined) {
        return _objectSpread({}, state, {
          ctx: _objectSpread({}, state.ctx, {
            gameover: gameover
          })
        });
      } // Update allowedMoves.


      var allowedMoves = conf.allowedMoves(state.G, state.ctx);
      state = _objectSpread({}, state, {
        ctx: _objectSpread({}, state.ctx, {
          allowedMoves: allowedMoves
        })
      }); // Update undo / redo state.

      if (!endTurn) {
        var undo$$1 = state._undo || [];
        var moveType = action.type;
        var plainCtx = ContextEnhancer.detachAllFromContext(state.ctx);
        state = _objectSpread({}, state, {
          _undo: [].concat(_toConsumableArray(undo$$1), [{
            G: state.G,
            ctx: plainCtx,
            moveType: moveType
          }]),
          _redo: []
        });
      }

      return state;
    }

    var canMakeMove = function canMakeMove(G$$1, ctx$$1, moveName) {
      var conf = phaseMap[ctx$$1.phase];
      var moves = conf.allowedMoves(G$$1, ctx$$1);
      if (!moves) return true;
      return moves.includes(moveName);
    };

    var canUndoMove = function canUndoMove(G$$1, ctx$$1, moveName) {
      var conf = phaseMap[ctx$$1.phase];
      if (!conf.undoableMoves) return true;
      return conf.undoableMoves.includes(moveName);
    };

    var events = {
      endTurn: endTurnEvent,
      endPhase: endPhaseEvent,
      endGame: endGameEvent,
      setActionPlayers: SetActionPlayersEvent
    };
    var enabledEvents = {};

    if (endTurn) {
      enabledEvents['endTurn'] = true;
    }

    if (endPhase) {
      enabledEvents['endPhase'] = true;
    }

    if (endGame) {
      enabledEvents['endGame'] = true;
    }

    if (setActionPlayers) {
      enabledEvents['setActionPlayers'] = true;
    }

    return Flow({
      ctx: function ctx$$1(numPlayers) {
        return {
          numPlayers: numPlayers,
          turn: 0,
          currentPlayer: '0',
          actionPlayers: ['0'],
          currentPlayerMoves: 0,
          playOrder: _toConsumableArray(new Array(numPlayers)).map(function (d, i) {
            return i + '';
          }),
          playOrderPos: 0,
          stats: {
            turn: {
              numMoves: {}
            },
            phase: {
              numMoves: {}
            }
          },
          allPlayed: false,
          phase: startingPhase,
          prevPhase: 'default'
        };
      },
      init: function init(state) {
        return startGame(state);
      },
      optimisticUpdate: function optimisticUpdate(G$$1, ctx$$1, action) {
        // Some random code was executed.
        if (ctx$$1._random !== undefined && ctx$$1._random.prngstate !== undefined) {
          return false;
        }

        return _optimisticUpdate(G$$1, ctx$$1, action);
      },
      events: events,
      enabledEvents: enabledEvents,
      processMove: processMove,
      canMakeMove: canMakeMove,
      canUndoMove: canUndoMove,
      redactedMoves: redactedMoves
    });
  }

  /**
   * Game
   *
   * Helper to generate the game move reducer. The returned
   * reducer has the following signature:
   *
   * (G, action, ctx) => {}
   *
   * You can roll your own if you like, or use any Redux
   * addon to generate such a reducer.
   *
   * The convention used in this framework is to
   * have action.type contain the name of the move, and
   * action.args contain any additional arguments as an
   * Array.
   *
   * Game({
   *   name: 'tic-tac-toe',
   *
   *   setup: (numPlayers) => {
   *     const G = {...};
   *     return G;
   *   },
   *
   *   plugins: [plugin1, plugin2, ...],
   *
   *   moves: {
   *     'moveWithoutArgs': (G, ctx) => {
   *       return Object.assign({}, G, ...);
   *     },
   *     'moveWithArgs': (G, ctx, arg0, arg1) => {
   *       return Object.assign({}, G, ...);
   *     }
   *   },
   *
   *   playerView: (G, ctx, playerID) => { ... },
   *
   *   flow: {
   *     endGameIf: (G, ctx) => { ... },
   *     endTurnIf: (G, ctx) => { ... },
   *
   *     phases: {
   *       A: { onPhaseBegin: (G, ctx) => G, onPhaseEnd: (G, ctx) => G },
   *       B: { onPhaseBegin: (G, ctx) => G, onPhaseEnd: (G, ctx) => G },
   *       ...
   *     }
   *   },
   * })
   *
   * @param {...object} setup - Function that returns the initial state of G.
   *
   * @param {...object} moves - A dictionary of move functions.
   *
   * @param {...object} playerView - A function that returns a
   *                                 derivative of G tailored for
   *                                 the specified player.
   *
   * @param {...object} flow - Customize the flow of the game (see flow.js).
   *                           Must contain the return value of Flow().
   *                           If it contains any other object, it is presumed to be a
   *                           configuration object for FlowWithPhases().
   *
   * @param {...object} seed - Seed for the PRNG.
   *
   * @param {Array} plugins - List of plugins. Each plugin is an object like the following:
   *                          {
   *                            // Optional: Wraps a move / trigger function and returns
   *                            // the wrapped function. The wrapper can do anything
   *                            // it wants, but will typically be used to customize G.
   *                            fnWrap: (fn) => {
   *                              return (G, ctx, ...args) => {
   *                                G = preprocess(G);
   *                                G = fn(G, ctx, ...args);
   *                                G = postprocess(G);
   *                                return G;
   *                              };
   *                            },
   *
   *                            // Optional: Called during setup. Can be used to
   *                            // augment G with additional state during setup.
   *                            setup: (G, ctx) => G,
   *                          }
   */

  function Game(game) {
    if (game.name === undefined) game.name = 'default';
    if (game.setup === undefined) game.setup = function () {
      return {};
    };
    if (game.moves === undefined) game.moves = {};
    if (game.playerView === undefined) game.playerView = function (G$$1) {
      return G$$1;
    };
    if (game.plugins === undefined) game.plugins = [];

    if (!game.flow || game.flow.processGameEvent === undefined) {
      game.flow = FlowWithPhases(_objectSpread({
        game: game
      }, game.flow));
    }

    return _objectSpread({}, game, {
      moveNames: Object.getOwnPropertyNames(game.moves),
      processMove: function processMove(G$$1, action, ctx$$1) {
        if (game.moves.hasOwnProperty(action.type)) {
          var ctxWithPlayerID = _objectSpread({}, ctx$$1, {
            playerID: action.playerID
          });

          var args = [G$$1, ctxWithPlayerID].concat(action.args);
          var fn = FnWrap(game.moves[action.type], game);
          return fn.apply(void 0, _toConsumableArray(args));
        }

        return G$$1;
      }
    });
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  /**
   * PlayerView reducers.
   */
  var PlayerView = {
    /**
     * STRIP_SECRETS
     *
     * Reducer which removes a key named `secret` and
     * removes all the keys in `players`, except for the one
     * corresponding to the current playerID.
     */
    STRIP_SECRETS: function STRIP_SECRETS(G, ctx, playerID) {
      var r = _objectSpread({}, G);

      if (r.secret !== undefined) {
        delete r.secret;
      }

      if (r.players) {
        r.players = _defineProperty({}, playerID, r.players[playerID]);
      }

      return r;
    }
  };

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.Game = Game;
  exports.InitializeGame = InitializeGame;
  exports.CreateGameReducer = CreateGameReducer;
  exports.Flow = Flow;
  exports.FlowWithPhases = FlowWithPhases;
  exports.TurnOrder = TurnOrder;
  exports.Pass = Pass;
  exports.PlayerView = PlayerView;
  exports.INVALID_MOVE = INVALID_MOVE;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
