(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types'], factory) :
  (global = global || self, factory(global.AIVisualize = {}, global.React, global.PropTypes));
}(this, function (exports, React, PropTypes) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  var css = "/*\n * Copyright 2018 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.mcts {\n  display: flex;\n  flex-direction: column;\n}\n\n.mcts .description {\n  text-align: right;\n  padding: 50px;\n}\n\n.mcts-tree {\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.mcts-tree .preview {\n  display: flex;\n  justify-content: center;\n  text-align: center;\n  height: 300px;\n  width: 300px;\n  padding: 10px;\n}\n\n.mcts-node-preview {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  list-style: none;\n  text-align: left;\n  font-size: 12px;\n  border-radius: 10px;\n  padding: 20px;\n}\n\n.mcts-tree .parents {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n}\n\n.mcts-tree .children {\n  display: grid;\n  font-weight: bold;\n  grid-template-columns: repeat(1, 1fr);\n  grid-gap: 10px;\n}\n\n.mcts-action-wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.mcts-action {\n  color: #888;\n  font-size: 11px;\n  font-weight: normal;\n  background: #ddd;\n  height: 25px;\n  line-height: 25px;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n.arrow-right {\n  width: 0;\n  height: 0;\n  border-top: 20px solid transparent;\n  border-bottom: 20px solid transparent;\n  border-left: 20px solid #ddd;\n  margin-right: 30px;\n}\n\n.mcts-node {\n  cursor: pointer;\n  overflow: hidden;\n  font-size: 14px;\n  border-radius: 100%;\n  margin-right: 30px;\n  border: 1px solid #ccc;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  padding: 10px;\n  color: #bbb;\n  background: #444;\n  text-align: center;\n}\n\n.mcts-node.clickable {\n  color: #777;\n  background: #eee;\n}\n\n.mcts-node.clickable:hover {\n  background: #ddd;\n}\n";
  styleInject(css);

  var MCTSVisualizer = function MCTSVisualizer(renderState) {
    return function (metadata) {
      return React.createElement(MCTSRoot, {
        root: metadata,
        renderState: renderState
      });
    };
  };
  var MCTSRoot =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MCTSRoot, _React$Component);

    function MCTSRoot(props) {
      var _this;

      _classCallCheck(this, MCTSRoot);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MCTSRoot).call(this, props));
      _this.state = {
        root: props.root,
        preview: null
      };
      return _this;
    }

    _createClass(MCTSRoot, [{
      key: "componentWillReceiveProps",
      // eslint-disable-next-line react/no-deprecated
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          root: nextProps.root
        });
      }
    }, {
      key: "getParents",
      value: function getParents(node) {
        var _this2 = this;

        var t = node;
        var parents = [];
        var id = 0;

        var onClick = function onClick(root) {
          return function () {
            return _this2.setState({
              root: root
            });
          };
        };

        var onMouseOver = function onMouseOver(preview) {
          return function () {
            return _this2.setState({
              preview: preview
            });
          };
        };

        while (t.parent) {
          var parent = t.parent;
          var _t$parentAction$paylo = t.parentAction.payload,
              type = _t$parentAction$paylo.type,
              args = _t$parentAction$paylo.args;
          var argsFormatted = (args || []).join(',');
          var arrowText = "".concat(type, "(").concat(argsFormatted, ")");
          parents.push(React.createElement("div", {
            className: "mcts-action-wrapper",
            key: id++
          }, React.createElement(MCTSNode, _extends({
            onClick: onClick(parent),
            onMouseOut: function onMouseOut() {
              return _this2.setState({
                preview: null
              });
            },
            onMouseOver: onMouseOver(parent),
            renderState: this.props.renderState
          }, parent)), React.createElement("div", {
            className: "mcts-action"
          }, arrowText), React.createElement("div", {
            className: "arrow-right"
          })));
          t = parent;
        }

        parents.reverse();
        return parents;
      }
    }, {
      key: "getChildren",
      value: function getChildren(node) {
        var _this3 = this;

        return node.children.map(function (child, i) {
          var _child$parentAction$p = child.parentAction.payload,
              type = _child$parentAction$p.type,
              args = _child$parentAction$p.args;
          var argsFormatted = (args || []).join(',');
          var arrowText = "".concat(type, "(").concat(argsFormatted, ")");

          var onClick = function onClick() {
            return _this3.setState({
              root: child
            });
          };

          if (child.children.length == 0) {
            onClick = undefined;
          }

          return React.createElement("div", {
            className: "mcts-action-wrapper",
            key: i
          }, React.createElement("div", {
            className: "mcts-action"
          }, arrowText), React.createElement("div", {
            className: "arrow-right"
          }), React.createElement(MCTSNode, _extends({
            onClick: onClick,
            renderState: _this3.props.renderState,
            onMouseOut: function onMouseOut() {
              return _this3.setState({
                preview: null
              });
            },
            onMouseOver: function onMouseOver() {
              return _this3.setState({
                preview: child
              });
            }
          }, child, {
            parentVisits: node.visits
          })));
        });
      }
    }, {
      key: "getPreview",
      value: function getPreview() {
        if (!this.state.preview) {
          return null;
        }

        return React.createElement(MCTSNodeDetails, _extends({}, this.state.preview, {
          renderState: this.props.renderState
        }));
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var root = this.state.root;
        return React.createElement("div", {
          className: "mcts"
        }, React.createElement("div", {
          className: "description"
        }, React.createElement("h4", null, "MCTS Visualizer"), React.createElement("p", null, "The following diagram explains why the bot made this particular move."), React.createElement("p", null, "Interactively browse through the MCTS tree by clicking on various nodes."), React.createElement("p", null, "The numbers inside the nodes are the number of visits made by the algorithm."), React.createElement("p", null, "Unexpanded nodes are marked black. Read more about MCTS", ' ', React.createElement("a", {
          href: "https://jeffbradberry.com/posts/2015/09/intro-to-monte-carlo-tree-search/"
        }, "here"), ".")), React.createElement("div", {
          className: "mcts-tree",
          style: this.props.style
        }, React.createElement("section", {
          className: "parents"
        }, this.getParents(root)), React.createElement("section", {
          className: "root"
        }, React.createElement(MCTSNode, _extends({}, root, {
          isRoot: true,
          onMouseOut: function onMouseOut() {
            return _this4.setState({
              preview: null
            });
          },
          onMouseOver: function onMouseOver() {
            return _this4.setState({
              preview: root
            });
          },
          renderState: this.props.renderState
        }))), React.createElement("section", {
          className: "children"
        }, this.getChildren(root)), React.createElement("section", {
          className: "preview"
        }, this.getPreview())));
      }
    }]);

    return MCTSRoot;
  }(React.Component);

  _defineProperty(MCTSRoot, "propTypes", {
    root: PropTypes.any.isRequired,
    renderState: PropTypes.func,
    style: PropTypes.any
  });

  var MCTSNode =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(MCTSNode, _React$Component2);

    function MCTSNode() {
      _classCallCheck(this, MCTSNode);

      return _possibleConstructorReturn(this, _getPrototypeOf(MCTSNode).apply(this, arguments));
    }

    _createClass(MCTSNode, [{
      key: "render",
      value: function render() {
        var classes = 'mcts-node';

        if (this.props.children.length > 0) {
          classes += ' clickable';
        }

        return React.createElement("div", {
          className: classes,
          onClick: this.props.onClick,
          onMouseOut: this.props.onMouseOut,
          onMouseOver: this.props.onMouseOver
        }, this.props.visits);
      }
    }]);

    return MCTSNode;
  }(React.Component);

  _defineProperty(MCTSNode, "propTypes", {
    state: PropTypes.any,
    visits: PropTypes.any,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    onClick: PropTypes.func,
    children: PropTypes.any
  });

  var MCTSNodeDetails =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(MCTSNodeDetails, _React$Component3);

    function MCTSNodeDetails() {
      _classCallCheck(this, MCTSNodeDetails);

      return _possibleConstructorReturn(this, _getPrototypeOf(MCTSNodeDetails).apply(this, arguments));
    }

    _createClass(MCTSNodeDetails, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            state = _this$props.state,
            value = _this$props.value,
            visits = _this$props.visits,
            parentVisits = _this$props.parentVisits,
            renderState = _this$props.renderState,
            isRoot = _this$props.isRoot;
        var classes = 'mcts-node-preview';

        if (isRoot) {
          classes += ' mcts-root';
        }

        var uct = value / visits + Math.sqrt(2 * Math.log(parentVisits) / visits);
        var ratio = value / visits;
        uct = Math.floor(100 * uct);
        ratio = Math.floor(100 * ratio);
        if (!parentVisits) uct = null;
        return React.createElement("div", {
          className: classes
        }, React.createElement("div", null, React.createElement("li", null, "value ", value), React.createElement("li", null, "visits ", visits), React.createElement("li", null, "ratio ", ratio), uct && React.createElement("li", null, "uct ", uct)), renderState && renderState(state));
      }
    }]);

    return MCTSNodeDetails;
  }(React.Component);

  _defineProperty(MCTSNodeDetails, "propTypes", {
    state: PropTypes.any,
    renderState: PropTypes.func,
    value: PropTypes.any,
    visits: PropTypes.any,
    parentVisits: PropTypes.any,
    isRoot: PropTypes.any,
    children: PropTypes.any
  });

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  exports.MCTSVisualizer = MCTSVisualizer;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
