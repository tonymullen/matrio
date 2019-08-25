(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('mousetrap'), require('flatted')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'mousetrap', 'flatted'], factory) :
  (global = global || self, factory(global.Internal = {}, global.React, global.PropTypes, global.Mousetrap, global.Flatted));
}(this, function (exports, React, PropTypes, Mousetrap, flatted) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  Mousetrap = Mousetrap && Mousetrap.hasOwnProperty('default') ? Mousetrap['default'] : Mousetrap;

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  function AssignShortcuts(moveNames, eventNames, blacklist) {
    var shortcuts = {};
    var events = {};

    for (var name in moveNames) {
      events[name] = name;
    }

    for (var _name in eventNames) {
      events[_name] = _name;
    }

    var taken = {};

    for (var i = 0; i < blacklist.length; i++) {
      var c = blacklist[i];
      taken[c] = true;
    } // Try assigning the first char of each move as the shortcut.


    var t = taken;
    var canUseFirstChar = true;

    for (var _name2 in events) {
      var shortcut = _name2[0];

      if (t[shortcut]) {
        canUseFirstChar = false;
        break;
      }

      t[shortcut] = true;
      shortcuts[_name2] = shortcut;
    }

    if (canUseFirstChar) {
      return shortcuts;
    } // If those aren't unique, use a-z.


    t = taken;
    var next = 97;
    shortcuts = {};

    for (var _name3 in events) {
      var _shortcut = String.fromCharCode(next);

      while (t[_shortcut]) {
        next++;
        _shortcut = String.fromCharCode(next);
      }

      t[_shortcut] = true;
      shortcuts[_name3] = _shortcut;
    }

    return shortcuts;
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  var Item = function Item(props) {
    return React.createElement("div", {
      className: "gameinfo-item"
    }, React.createElement("strong", null, props.name, " "), React.createElement("div", null, JSON.stringify(props.value)));
  };

  Item.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any
  };
  var GameInfo = function GameInfo(props) {
    return React.createElement("section", {
      className: "gameinfo"
    }, React.createElement(Item, {
      name: "gameID",
      value: props.gameID
    }), React.createElement(Item, {
      name: "playerID",
      value: props.playerID
    }), React.createElement(Item, {
      name: "isActive",
      value: props.isActive
    }), props.isMultiplayer && React.createElement("span", null, React.createElement(Item, {
      name: "isConnected",
      value: props.isConnected
    }), React.createElement(Item, {
      name: "isMultiplayer",
      value: props.isMultiplayer
    })));
  };
  GameInfo.propTypes = {
    gameID: PropTypes.string,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isConnected: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.debug-ui {\n  text-align: left;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  background: #fefefe;\n  border-left: 1px solid #ddd;\n  box-shadow: -1px 0 10px #aaa;\n  position: absolute;\n  width: 300px;\n  right: 0;\n  top: 0;\n  height: 100%;\n  font-family: monospace;\n  font-size: 14px;\n}\n\n#debug-controls.docktop {\n  position: fixed;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  padding-left: 10px;\n  padding-right: 10px;\n  min-width: 500px;\n  top: 0;\n  right: 300px;\n  height: 50px;\n  background: #fff;\n  box-shadow: -3px 3px 3px #ccc;\n}\n\n@media only screen and (max-device-width: 750px) {\n  .debug-ui {\n    display: none;\n  }\n}\n\n.debug-ui .gameinfo {\n  background: #ddd;\n  position: fixed;\n  bottom: 0;\n  box-sizing: border-box;\n  width: 285px;\n  margin-left: -20px;\n  margin-bottom: 0;\n  padding: 10px;\n}\n\n.debug-ui .gameinfo-item div {\n  float: right;\n  text-align: right;\n}\n\n.debug-ui .ai-visualization {\n  position: fixed;\n  opacity: 100%;\n  right: 300px;\n  height: 100%;\n  width: 100%;\n  max-width: 3000px;\n  background: #fafafa;\n  border-right: 1px solid #ddd;\n}\n\n.debug-ui .pane {\n  float: left;\n  padding: 20px;\n  box-sizing: border-box;\n  min-width: 300px;\n  max-width: 400px;\n  opacity: 0.8;\n}\n\n.debug-ui section {\n  margin-bottom: 20px;\n}\n\n.debug-ui textarea {\n  resize: none;\n}\n\n.debug-ui .move {\n  cursor: pointer;\n  margin-bottom: 10px;\n  color: #666;\n}\n\n.debug-ui .move:hover {\n  color: #333;\n}\n\n.debug-ui .move.active {\n  color: #111;\n  font-weight: bold;\n}\n\n.debug-ui .move-error {\n  color: #a00;\n  font-weight: bold;\n}\n\n.debug-ui .arg-field {\n  outline: none;\n  font-family: monospace;\n}\n\n.debug-ui .key {\n  margin-bottom: 5px;\n}\n\n.debug-ui .key-box {\n  display: inline-block;\n  cursor: pointer;\n  min-width: 10px;\n  padding-left: 5px;\n  padding-right: 5px;\n  height: 20px;\n  line-height: 20px;\n  text-align: center;\n  border: 1px solid #ccc;\n  box-shadow: 1px 1px 1px #888;\n  background: #eee;\n  color: #444;\n}\n\n.debug-ui .key-box:hover {\n  background: #ddd;\n}\n\n.debug-ui .key.active .key-box {\n  background: #ddd;\n  border: 1px solid #999;\n  box-shadow: none;\n}\n\n.debug-ui .key-child {\n  display: inline-block;\n  height: 20px;\n  margin-left: 10px;\n}\n\n.debug-ui .menu {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.debug-ui .menu .item {\n  cursor: pointer;\n  margin-top: -10px;\n  margin-bottom: 20px;\n  margin-right: 10px;\n  padding: 5px;\n  min-width: 50px;\n  text-align: center;\n}\n\n.debug-ui .menu .item.active {\n  font-weight: bold;\n  border-bottom: 3px solid #ccc;\n}\n\n.debug-ui .player-box {\n  display: flex;\n  flex-direction: row;\n}\n\n.debug-ui .player {\n  cursor: pointer;\n  text-align: center;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  background: #eee;\n  border: 3px solid #fff;\n  box-sizing: content-box;\n}\n\n.debug-ui .player.current {\n  background: #555;\n  color: #eee;\n  font-weight: bold;\n}\n\n.debug-ui .player.active {\n  border: 3px solid #ff7f50;\n}\n";
  styleInject(css);

  /**
   * KeyboardShortcut
   *
   * Registers a keyboard shortcut to activate the
   * associated child component that is passed in.
   *
   * When the key is pressed, 'active' is set to true
   * in the prop passed to the child.
   */

  var KeyboardShortcut =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(KeyboardShortcut, _React$Component);

    function KeyboardShortcut() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, KeyboardShortcut);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KeyboardShortcut)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        active: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "deactivate", function () {
        _this.setState({
          active: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "activate", function () {
        _this.setState({
          active: true
        });

        if (_this.props.onPress) {
          _this.props.onPress();

          _this.setState({
            active: false
          });
        }
      });

      return _this;
    }

    _createClass(KeyboardShortcut, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        Mousetrap.bind(this.props.value, function (e) {
          e.preventDefault();

          _this2.activate();
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        Mousetrap.unbind(this.props.value);
      }
    }, {
      key: "render",
      value: function render() {
        var child = this.props.children;

        if (_typeof(this.props.children) === _typeof(this)) {
          child = React.cloneElement(this.props.children, {
            active: this.state.active,
            deactivate: this.deactivate,
            activate: this.activate
          });
        }

        var className = 'key';

        if (this.state.active) {
          className += ' active';
        }

        return React.createElement("div", {
          className: className
        }, React.createElement("div", {
          className: "key-box",
          onClick: this.activate
        }, this.props.value), React.createElement("div", {
          className: "key-child"
        }, child));
      }
    }]);

    return KeyboardShortcut;
  }(React.Component);

  _defineProperty(KeyboardShortcut, "propTypes", {
    value: PropTypes.string.isRequired,
    children: PropTypes.any,
    onPress: PropTypes.func
  });

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  /**
   * Controls that are triggered by keyboard shortcuts.
   */

  var Controls = function Controls(props) {
    var ai = null;

    if (props.step) {
      ai = [React.createElement(KeyboardShortcut, {
        key: "4",
        value: "4",
        onPress: props.step
      }, "step"), React.createElement(KeyboardShortcut, {
        key: "5",
        value: "5",
        onPress: props.simulate
      }, "simulate")];
    }

    var style = null;
    var className = 'controls';

    if (props.dockTop) {
      className += ' docktop';
    }

    if (props.help) {
      className += ' help';
    }

    var display = props.help && !props.dockTop ? 'block' : 'none';
    return React.createElement("section", {
      id: "debug-controls",
      style: style,
      className: className
    }, React.createElement(KeyboardShortcut, {
      value: "1",
      onPress: props.reset
    }, "reset"), React.createElement(KeyboardShortcut, {
      value: "2",
      onPress: props.save
    }, "save"), React.createElement(KeyboardShortcut, {
      value: "3",
      onPress: props.restore
    }, "restore"), ai, props.dockTop || React.createElement(KeyboardShortcut, {
      value: "?",
      onPress: props.toggleHelp
    }, "show more"), React.createElement("div", {
      className: "key",
      style: {
        display: display
      }
    }, React.createElement("div", {
      className: "key-box"
    }, "d"), " show/hide this pane"), React.createElement("div", {
      className: "key",
      style: {
        display: display
      }
    }, React.createElement("div", {
      className: "key-box"
    }, "l"), " show/hide log"), React.createElement("div", {
      className: "key",
      style: {
        display: display
      }
    }, React.createElement("div", {
      className: "key-box"
    }, "i"), " show/hide game info tab"), React.createElement("div", {
      className: "key",
      style: {
        display: display
      }
    }, React.createElement("div", {
      className: "key-box"
    }, "t"), " dock controls"));
  };
  Controls.propTypes = {
    help: PropTypes.bool,
    toggleHelp: PropTypes.func,
    step: PropTypes.func,
    simulate: PropTypes.func,
    reset: PropTypes.func,
    save: PropTypes.func,
    restore: PropTypes.func,
    dockTop: PropTypes.bool
  };

  /**
   * Component that renders information about the
   * players in the game (whose turn it is etc.).
   */

  var PlayerInfo =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(PlayerInfo, _React$Component);

    function PlayerInfo() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, PlayerInfo);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PlayerInfo)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (playerID) {
        var arg = playerID == _this.props.playerID ? null : playerID;

        _this.props.onClick(arg);
      });

      return _this;
    }

    _createClass(PlayerInfo, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var players = [];

        var _loop = function _loop(i) {
          var playerID = i + '';
          var className = 'player';

          if (playerID === _this2.props.ctx.currentPlayer) {
            className += ' current';
          }

          if (playerID === _this2.props.playerID) {
            className += ' active';
          }

          players.push(React.createElement("div", {
            className: className,
            key: i,
            onClick: function onClick() {
              return _this2.onClick(playerID);
            }
          }, playerID));
        };

        for (var i = 0; i < this.props.ctx.numPlayers; i++) {
          _loop(i);
        }

        return React.createElement("div", {
          className: "player-box"
        }, players);
      }
    }]);

    return PlayerInfo;
  }(React.Component);

  _defineProperty(PlayerInfo, "propTypes", {
    ctx: PropTypes.any.isRequired,
    playerID: PropTypes.any,
    onClick: PropTypes.func
  });

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
   * DebugMove
   *
   * Component that allows the user to dispatch a move from
   * the debug pane. The user is presented with the textarea
   * to enter any additional arguments.
   */

  var DebugMove =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DebugMove, _React$Component);

    function DebugMove() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, DebugMove);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DebugMove)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        error: ''
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSubmit", function (value) {
        var error$$1 = '';

        try {
          var argArray = new Function("return [".concat(value, "]"))();

          _this.props.fn.apply(_assertThisInitialized(_assertThisInitialized(_this)), argArray);
        } catch (error2) {
          error$$1 = '' + error2;
          error(error2);
        }

        _this.setState({
          error: error$$1,
          focus: false,
          enterArg: false
        });
      });

      return _this;
    }

    _createClass(DebugMove, [{
      key: "render",
      value: function render() {
        return React.createElement("div", null, React.createElement(KeyboardShortcut, {
          value: this.props.shortcut
        }, React.createElement(DebugMoveArgField, {
          name: this.props.name,
          onSubmit: this.onSubmit
        })), this.state.error ? React.createElement("span", {
          className: "move-error"
        }, this.state.error) : null);
      }
    }]);

    return DebugMove;
  }(React.Component);

  _defineProperty(DebugMove, "propTypes", {
    name: PropTypes.string.isRequired,
    shortcut: PropTypes.string.isRequired,
    fn: PropTypes.func.isRequired
  });

  var DebugMoveArgField =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(DebugMoveArgField, _React$Component2);

    function DebugMoveArgField() {
      var _getPrototypeOf3;

      var _this2;

      _classCallCheck(this, DebugMoveArgField);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(DebugMoveArgField)).call.apply(_getPrototypeOf3, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "onKeyDown", function (e) {
        if (e.key == 'Enter') {
          e.preventDefault();
          var value = _this2.span.innerText;

          _this2.props.onSubmit(value);

          _this2.span.innerText = '';

          _this2.props.deactivate();
        }

        if (e.key == 'Escape') {
          e.preventDefault();

          _this2.props.deactivate();
        }
      });

      return _this2;
    }

    _createClass(DebugMoveArgField, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.props.active) {
          this.span.focus();
        } else {
          this.span.blur();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var className = 'move';
        if (this.props.active) className += ' active';
        return React.createElement("div", {
          className: className,
          onClick: this.props.activate
        }, this.props.name, "(", React.createElement("span", {
          ref: function ref(r) {
            _this3.span = r;
          },
          className: "arg-field",
          onBlur: this.props.deactivate,
          onKeyDown: this.onKeyDown,
          contentEditable: true
        }), ")");
      }
    }]);

    return DebugMoveArgField;
  }(React.Component);

  _defineProperty(DebugMoveArgField, "propTypes", {
    name: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    active: PropTypes.bool,
    activate: PropTypes.func,
    deactivate: PropTypes.func
  });

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var MAKE_MOVE = 'MAKE_MOVE';
  var SYNC = 'SYNC';

  var css$1 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.gamelog {\n  display: grid;\n  grid-template-columns: 30px 1fr 30px;\n  grid-auto-rows: auto;\n  grid-auto-flow: column;\n}\n\n.gamelog .turn-marker {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  grid-column: 1;\n  background: #555;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  border: 1px solid #888;\n}\n\n.gamelog .log-event {\n  grid-column: 2;\n  cursor: pointer;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #fff;\n  border: 1px dotted #ccc;\n  border-left: 5px solid #ccc;\n  padding: 5px;\n  text-align: center;\n  color: #888;\n  font-size: 14px;\n  min-height: 25px;\n  line-height: 25px;\n}\n\n.gamelog .phase-marker {\n  grid-column: 3;\n  background: #555;\n  border: 1px solid #888;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-orientation: sideways;\n  writing-mode: vertical-rl;\n  line-height: 30px;\n  width: 100%;\n}\n\n.gamelog.pinned .log-event {\n  opacity: 0.2;\n}\n\n.gamelog .log-event:hover {\n  border-style: solid;\n  background: #eee;\n}\n\n.gamelog .log-event.pinned {\n  border-style: solid;\n  background: #eee;\n  opacity: 1;\n}\n\n.gamelog div.player0 {\n  border-left-color: #ff851b;\n}\n\n.gamelog div.player1 {\n  border-left-color: #7fdbff;\n}\n\n.gamelog div.player2 {\n  border-left-color: #0074d9;\n}\n\n.gamelog div.player3 {\n  border-left-color: #39cccc;\n}\n\n.gamelog div.player4 {\n  border-left-color: #3d9970;\n}\n\n.gamelog div.player5 {\n  border-left-color: #2ecc40;\n}\n\n.gamelog div.player6 {\n  border-left-color: #01ff70;\n}\n\n.gamelog div.player7 {\n  border-left-color: #ffdc00;\n}\n\n.gamelog div.player8 {\n  border-left-color: #001f3f;\n}\n\n.gamelog div.player9 {\n  border-left-color: #ff4136;\n}\n\n.gamelog div.player10 {\n  border-left-color: #85144b;\n}\n\n.gamelog div.player11 {\n  border-left-color: #f012be;\n}\n\n.gamelog div.player12 {\n  border-left-color: #b10dc9;\n}\n\n.gamelog div.player13 {\n  border-left-color: #111111;\n}\n\n.gamelog div.player14 {\n  border-left-color: #aaaaaa;\n}\n\n.gamelog div.player15 {\n  border-left-color: #dddddd;\n}\n";
  styleInject(css$1);

  /**
   * Default component to render custom payload.
   */

  var CustomPayload = function CustomPayload(props) {
    var custompayload = props.payload !== undefined ? JSON.stringify(props.payload, null, 4) : '';
    return React.createElement("div", null, custompayload);
  };

  CustomPayload.propTypes = {
    payload: PropTypes.any
  };
  /**
   * LogEvent
   *
   * Logs a single action in the game.
   */

  var LogEvent = function LogEvent(props) {
    var action = props.action;
    var args = action.payload.args || [];
    var playerID = action.payload.playerID;
    var classNames = "log-event player".concat(playerID);

    if (props.pinned) {
      classNames += ' pinned';
    } // allow to pass in custom rendering component for custom payload


    var customPayload = props.payloadComponent !== undefined ? React.createElement(props.payloadComponent, {
      payload: props.payload
    }) : React.createElement(CustomPayload, {
      payload: props.payload
    });
    return React.createElement("div", {
      className: classNames,
      onClick: function onClick() {
        return props.onLogClick(props.logIndex);
      },
      onMouseEnter: function onMouseEnter() {
        return props.onMouseEnter(props.logIndex);
      },
      onMouseLeave: function onMouseLeave() {
        return props.onMouseLeave();
      }
    }, React.createElement("div", null, action.payload.type, "(", args.join(','), ")"), customPayload);
  };

  LogEvent.propTypes = {
    action: PropTypes.any.isRequired,
    logIndex: PropTypes.number.isRequired,
    onLogClick: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    pinned: PropTypes.bool,
    payload: PropTypes.object,
    payloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  };
  /**
   * TurnMarker
   *
   * The markers on the left of the log events that indicate
   * which turn the event belongs to.
   */

  var TurnMarker = function TurnMarker(props) {
    return React.createElement("div", {
      className: "turn-marker",
      style: {
        gridRow: 'span ' + props.numEvents
      }
    }, props.turn);
  };

  TurnMarker.propTypes = {
    turn: PropTypes.number.isRequired,
    numEvents: PropTypes.number.isRequired
  };
  /**
   * PhaseMarker
   *
   * The markers on the right of the log events that indicate
   * which phase the event belongs to.
   */

  var PhaseMarker = function PhaseMarker(props) {
    return React.createElement("div", {
      className: "phase-marker",
      style: {
        gridRow: 'span ' + props.numEvents
      }
    }, props.phase);
  };

  PhaseMarker.propTypes = {
    phase: PropTypes.string.isRequired,
    numEvents: PropTypes.number.isRequired
  };
  /**
   * GameLog
   *
   * Component to log the actions in the game.
   */

  var GameLog =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GameLog, _React$Component);

    function GameLog() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, GameLog);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GameLog)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        pinned: null
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "rewind", function (logIndex) {
        var state = _this.props.initialState;

        for (var i = 0; i < _this.props.log.length; i++) {
          var action = _this.props.log[i].action;

          if (!action.automatic) {
            state = _this.props.reducer(state, action);
          }

          if (action.type == MAKE_MOVE) {
            if (logIndex == 0) {
              break;
            }

            logIndex--;
          }
        }

        return {
          G: state.G,
          ctx: state.ctx
        };
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogClick", function (logIndex) {
        _this.setState(function (o) {
          var state = _this.rewind(logIndex);

          var renderedLogEntries = _this.props.log.filter(function (e) {
            return e.action.type == MAKE_MOVE;
          });

          var metadata = renderedLogEntries[logIndex].action.payload.metadata;

          if (o.pinned === logIndex) {
            _this.props.onHover({
              logIndex: logIndex,
              state: state,
              metadata: undefined
            });

            return {
              pinned: null
            };
          }

          _this.props.onHover({
            logIndex: logIndex,
            state: state,
            metadata: metadata
          });

          return {
            pinned: logIndex
          };
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseEnter", function (logIndex) {
        if (_this.state.pinned === null) {
          var state = _this.rewind(logIndex);

          _this.props.onHover({
            logIndex: logIndex,
            state: state
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseLeave", function () {
        if (_this.state.pinned === null) {
          _this.props.onHover({
            state: null
          });
        }
      });

      return _this;
    }

    _createClass(GameLog, [{
      key: "render",
      value: function render() {
        var log = [];
        var turns = [];
        var phases = [];
        var eventsInCurrentPhase = 0;
        var eventsInCurrentTurn = 0;
        var renderedLogEntries = this.props.log.filter(function (e) {
          return e.action.type == MAKE_MOVE;
        });

        for (var i = 0; i < renderedLogEntries.length; i++) {
          var _renderedLogEntries$i = renderedLogEntries[i],
              action = _renderedLogEntries$i.action,
              payload = _renderedLogEntries$i.payload,
              turn = _renderedLogEntries$i.turn,
              phase = _renderedLogEntries$i.phase;
          eventsInCurrentPhase++;
          eventsInCurrentTurn++;
          log.push(React.createElement(LogEvent, {
            key: i,
            pinned: i === this.state.pinned,
            logIndex: i,
            onLogClick: this.onLogClick,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            action: action,
            payload: payload,
            payloadComponent: this.props.payloadComponent
          }));

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
            turns.push(React.createElement(TurnMarker, {
              key: turns.length,
              turn: turn,
              numEvents: eventsInCurrentTurn
            }));
            eventsInCurrentTurn = 0;
          }

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
            phases.push(React.createElement(PhaseMarker, {
              key: phases.length,
              phase: phase,
              numEvents: eventsInCurrentPhase
            }));
            eventsInCurrentPhase = 0;
          }
        }

        var className = 'gamelog';

        if (this.state.pinned !== null) {
          className += ' pinned';
        }

        return React.createElement("div", {
          className: className
        }, turns, log, phases);
      }
    }]);

    return GameLog;
  }(React.Component);

  _defineProperty(GameLog, "propTypes", {
    onHover: PropTypes.func,
    reducer: PropTypes.func,
    initialState: PropTypes.any.isRequired,
    log: PropTypes.array.isRequired,
    payloadComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  });

  _defineProperty(GameLog, "defaultProps", {
    onHover: function onHover() {}
  });

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  /**
   * Used to reset the Redux store's state on a sync.
   * @param {object} state - The state to restore.
   * @param {Array} log - The log to restore.
   */

  var sync = function sync(state, log) {
    return {
      type: SYNC,
      state: state,
      log: log,
      clientOnly: true
    };
  };

  /**
   * Removes all the keys in ctx that begin with a _.
   */

  function SanitizeCtx(ctx) {
    var r = {};

    for (var key in ctx) {
      if (!key.startsWith('_')) {
        r[key] = ctx[key];
      }
    }

    return r;
  }
  /**
   * Debug
   *
   * Debug pane that displays the game state objects,
   * allows you to dispatch moves,
   * and allows you to save / restore from localStorage.
   */


  var Debug =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Debug, _React$Component);

    function Debug(props) {
      var _this;

      _classCallCheck(this, Debug);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Debug).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saveState", function () {
        var json = flatted.stringify(_this.props.gamestate);
        window.localStorage.setItem('gamestate', json);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "restoreState", function () {
        var gamestateJSON = window.localStorage.getItem('gamestate');

        if (gamestateJSON !== null) {
          var gamestate = flatted.parse(gamestateJSON);

          _this.props.store.dispatch(sync(gamestate));
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickMain", function () {
        _this.setState({
          showLog: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClickLog", function () {
        _this.setState({
          showLog: true
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggleHelp", function () {
        _this.setState(function (oldstate) {
          return {
            help: !oldstate.help
          };
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLogHover", function (_ref) {
        var state = _ref.state,
            metadata = _ref.metadata;

        _this.setState({
          AIMetadata: metadata
        });

        _this.props.overrideGameState(state);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "simulate", function () {
        var iterations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10000;
        var sleepTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

        var step = async function step() {
          for (var i = 0; i < iterations; i++) {
            var action = await _this.props.step();
            if (!action) break;
            await new Promise(function (resolve) {
              return setTimeout(resolve, sleepTimeout);
            });
          }
        };

        return step();
      });

      _this.shortcuts = AssignShortcuts(props.moves, props.events, 'dlit');
      _this.state = {
        showDebugUI: true,
        showLog: false,
        showGameInfo: props.showGameInfo,
        dockControls: props.dockControls,
        help: false,
        AIMetadata: null
      };
      return _this;
    }

    _createClass(Debug, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        Mousetrap.bind('d', function (e) {
          e.preventDefault();

          _this2.setState(function (old) {
            return {
              showDebugUI: !old.showDebugUI
            };
          });
        });
        Mousetrap.bind('l', function (e) {
          e.preventDefault();

          _this2.setState(function (old) {
            return {
              showLog: !old.showLog
            };
          });
        });
        Mousetrap.bind('i', function (e) {
          e.preventDefault();

          _this2.setState(function (old) {
            return {
              showGameInfo: !old.showGameInfo
            };
          });
        });
        Mousetrap.bind('t', function (e) {
          e.preventDefault();

          _this2.setState(function (old) {
            return {
              dockControls: !old.dockControls
            };
          });
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        Mousetrap.unbind('d');
        Mousetrap.unbind('l');
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.state.showDebugUI) {
          return null;
        }

        var moves = [];

        for (var name in this.props.moves) {
          var fn = this.props.moves[name];
          var shortcut = this.shortcuts[name];
          moves.push(React.createElement(DebugMove, {
            key: name,
            name: name,
            fn: fn,
            shortcut: shortcut
          }));
        }

        var events = [];

        for (var _name in this.props.events) {
          var _fn = this.props.events[_name];
          var _shortcut = this.shortcuts[_name];
          events.push(React.createElement(DebugMove, {
            key: _name,
            name: _name,
            fn: _fn,
            shortcut: _shortcut
          }));
        }

        var visualizeAI = this.state.AIMetadata && this.props.visualizeAI;
        var className = 'debug-ui';

        if (this.state.dockControls) {
          className += ' docktop';
        }

        return React.createElement("div", {
          className: className
        }, visualizeAI && React.createElement("div", {
          className: "ai-visualization"
        }, this.props.visualizeAI(this.state.AIMetadata)), React.createElement("div", {
          className: "pane"
        }, React.createElement("div", {
          className: "menu"
        }, React.createElement("div", {
          className: this.state.showLog ? 'item' : 'item active',
          onClick: this.onClickMain
        }, "Main"), React.createElement("div", {
          className: this.state.showLog ? 'item active' : 'item',
          onClick: this.onClickLog
        }, "Log")), this.state.showLog || React.createElement("span", null, this.state.showGameInfo && React.createElement(GameInfo, {
          gameID: this.props.gameID,
          playerID: this.props.playerID,
          isActive: this.props.gamestate.isActive,
          isConnected: this.props.gamestate.isConnected,
          isMultiplayer: this.props.isMultiplayer
        }), React.createElement(Controls, {
          dockTop: this.state.dockControls,
          help: this.state.help,
          toggleHelp: this.toggleHelp,
          step: this.props.step,
          simulate: this.simulate,
          reset: this.props.reset,
          save: this.saveState,
          restore: this.restoreState
        }), React.createElement("h3", null, "Players"), React.createElement(PlayerInfo, {
          ctx: this.props.gamestate.ctx,
          playerID: this.props.playerID,
          onClick: this.props.updatePlayerID
        }), React.createElement("h3", null, "Moves"), React.createElement("section", null, moves), React.createElement("h3", null, "Events"), React.createElement("section", null, events), React.createElement("section", null, React.createElement("pre", {
          className: "json"
        }, React.createElement("strong", null, "G"), ":", ' ', JSON.stringify(this.props.gamestate.G, null, 2))), React.createElement("section", null, React.createElement("pre", {
          className: "json"
        }, React.createElement("strong", null, "ctx"), ":", ' ', JSON.stringify(SanitizeCtx(this.props.gamestate.ctx), null, 2)))), this.state.showLog && React.createElement("section", null, React.createElement(GameLog, {
          onHover: this.onLogHover,
          reducer: this.props.reducer,
          log: this.props.gamestate.log,
          initialState: this.props.gamestate._initial
        }))));
      }
    }]);

    return Debug;
  }(React.Component);

  _defineProperty(Debug, "propTypes", {
    gamestate: PropTypes.shape({
      G: PropTypes.any.isRequired,
      ctx: PropTypes.any.isRequired,
      log: PropTypes.array.isRequired,
      isActive: PropTypes.bool,
      isConnected: PropTypes.bool,
      _initial: PropTypes.any.isRequired
    }),
    gameID: PropTypes.string.isRequired,
    playerID: PropTypes.string,
    isMultiplayer: PropTypes.bool,
    moves: PropTypes.any,
    events: PropTypes.any,
    restore: PropTypes.func,
    showLog: PropTypes.bool,
    store: PropTypes.any,
    step: PropTypes.func,
    reset: PropTypes.func,
    reducer: PropTypes.func,
    overrideGameState: PropTypes.func,
    visualizeAI: PropTypes.func,
    updateGameID: PropTypes.func,
    updatePlayerID: PropTypes.func,
    updateCredentials: PropTypes.func,
    showGameInfo: PropTypes.bool,
    dockControls: PropTypes.bool
  });

  _defineProperty(Debug, "defaultProps", {
    showGameInfo: true,
    dockControls: false
  });

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.Debug = Debug;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
