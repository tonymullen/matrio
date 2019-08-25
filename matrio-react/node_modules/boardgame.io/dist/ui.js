(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('prop-types'), require('three'), require('@tweenjs/tween.js'), require('react-dragtastic')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'prop-types', 'three', '@tweenjs/tween.js', 'react-dragtastic'], factory) :
  (global = global || self, factory(global.UI = {}, global.React, global.PropTypes, global.THREE, global.TWEEN, global.ReactDragtastic));
}(this, function (exports, React, PropTypes, THREE, TWEEN, reactDragtastic) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  TWEEN = TWEEN && TWEEN.hasOwnProperty('default') ? TWEEN['default'] : TWEEN;

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
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

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var UIContext = React.createContext();

  /**
   * Root element of the React based 2D UI framework.
   */

  var UI =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(UI, _React$Component);

    function UI(props) {
      var _this;

      _classCallCheck(this, UI);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(UI).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getContext", function () {
        return {
          genID: function genID() {
            return _this._nextID++;
          }
        };
      });

      _this._nextID = 1;
      return _this;
    }

    _createClass(UI, [{
      key: "render",
      value: function render() {
        return React.createElement(UIContext.Provider, {
          value: this.getContext()
        }, React.createElement("div", {
          className: "bgio-ui"
        }, this.props.children));
      }
    }]);

    return UI;
  }(React.Component);

  _defineProperty(UI, "propTypes", {
    children: PropTypes.any
  });

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

  var css = ".loader {\n  border: 16px solid #f3f3f3; /* Light grey */\n  border-top: 16px solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 2s linear infinite;\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n";
  styleInject(css);

  /**
   * Root element of the React/threejs based 3D UI framework.
   */

  var UI$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(UI, _React$Component);

    function UI(props) {
      var _this;

      _classCallCheck(this, UI);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(UI).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "animate", function () {
        requestAnimationFrame(_this.animate);
        TWEEN.update();

        _this.renderer.render(_this.scene, _this.camera);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "add", function (obj, callback) {
        _this.childGroup.add(obj);

        if (callback !== undefined) {
          _this.callbacks_[obj.id] = callback;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "registerCallback", function (obj, callback) {
        if (obj && callback) {
          _this.callbacks_[obj.id] = callback;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getContext", function () {
        return {
          three: true,
          add: _this.add,
          remove: function remove(obj) {
            return _this.scene.remove(obj);
          },
          scene: _this.scene,
          camera: _this.camera,
          regCall: _this.registerCallback
        };
      });

      _this.state = {
        isLoading: false
      };
      /**
       * Set of callbacks that children of this element pass via context.subscribeToMouseEvents
       * in order to receive mouse events that pertain to the objects that they manage.
       * @private
       */

      _this.callbacks_ = {};
      /**
       * Reference to the root div element.
       * @private
       */

      _this.ref_ = React.createRef(); // Set up scene.

      _this.scene = new THREE.Scene();
      _this.scene.background = new THREE.Color(0xffffff); // Set up renderer.

      _this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      _this.renderer.shadowMap.enabled = true;
      _this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      _this.renderer.setSize(_this.props.width, _this.props.height); // Set up camera.


      _this.camera = new THREE.PerspectiveCamera(45, _this.props.width / _this.props.height, 0.1, 1000);
      _this.camera.position.z = 7;
      _this.camera.position.y = 10;

      _this.camera.lookAt(new THREE.Vector3());

      _this.scene.add(_this.camera); // Set up lights.


      var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);

      _this.scene.add(ambientLight);

      var light = new THREE.DirectionalLight(0x555555);
      light.position.y = 50;
      light.shadow.camera.left = -10;
      light.shadow.camera.bottom = -10;
      light.shadow.camera.right = 10;
      light.shadow.camera.top = 10;
      light.castShadow = true;

      _this.scene.add(light); // Set up ground.


      var geometry = new THREE.PlaneBufferGeometry(100, 100);
      var material = new THREE.MeshLambertMaterial({
        color: 0xffffff
      });
      var plane = new THREE.Mesh(geometry, material);
      plane.receiveShadow = true;
      plane.lookAt(plane.up);
      plane.position.y = -0.01;
      _this.plane = plane;

      _this.scene.add(plane);

      var helper = new THREE.GridHelper(2000, 2000);
      helper.material.opacity = 0.1;
      helper.material.transparent = true;

      _this.scene.add(helper);

      _this.childGroup = new THREE.Group();

      _this.scene.add(_this.childGroup); // set up loading screen


      _this.loader = React.createElement("div", {
        className: "loader"
      });

      THREE.DefaultLoadingManager.onStart = function () {
        _this.setState({
          isLoading: true
        });

        _this.ref_.current.removeChild(_this.renderer.domElement);

        console.log('Started loading file');
      };

      THREE.DefaultLoadingManager.onLoad = function () {
        _this.setState({
          isLoading: false
        });

        _this.ref_.current.appendChild(_this.renderer.domElement);

        console.log('Loading Complete!');
      };

      THREE.DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        console.log('Loading file: ' + url + '\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
      };

      THREE.DefaultLoadingManager.onError = function (url) {
        console.log('There was an error loading: ' + url);
      };

      return _this;
    }

    _createClass(UI, [{
      key: "setupMouseEvents",
      value: function setupMouseEvents() {
        var _this2 = this;

        // List of objects currently being dragged.
        var dragging_ = []; // The 2D viewport co-ordinates of the mouse.

        var mouse = new THREE.Vector2(); // Raycaster that's used to calculate objects that the
        // mouse intersects.

        this.raycaster = new THREE.Raycaster();

        var getClickType = function getClickType(e) {
          if (e.which !== undefined) {
            switch (e.which) {
              case 1:
                return 'leftclick';

              case 2:
                return 'middleclick';

              case 3:
                return 'rightclick';
            }
          }

          if (e.button !== undefined) {
            switch (e.button) {
              case 0:
                return 'leftclick';

              case 1:
                return 'middleclick';

              case 2:
                return 'rightclick';
            }
          }
        };

        var dispatchMouseCallbacks = function dispatchMouseCallbacks(e, objects) {
          if (objects === undefined) {
            _this2.raycaster.setFromCamera(mouse, _this2.camera);

            objects = _this2.raycaster.intersectObjects(_this2.childGroup.children, true);
          }

          if (_this2.props.onMouseEvent) {
            _this2.props.onMouseEvent(e, objects);
          } // only intersect the nearest object.


          var obj = objects[0];

          if (obj) {
            e.point = obj.point;

            var current = _this2.childGroup.getObjectById(obj.object.id); // check parents until we hit a callback or hit the top level.


            while (current && current.parent && current.id != _this2.childGroup.id) {
              if (current.id in _this2.callbacks_) {
                _this2.callbacks_[current.id](e);

                break;
              }

              current = current.parent;
            }
          }
        };

        var onMouseDown = function onMouseDown(e) {
          var type = getClickType(e);

          _this2.raycaster.setFromCamera(mouse, _this2.camera);

          var objects = _this2.raycaster.intersectObjects(_this2.childGroup.children, true);

          if (type == 'leftclick') {
            dragging_ = objects.filter(function (obj) {
              return obj.object.userData.draggable && obj.object.userData.responsive;
            });
          } else {
            e = _objectSpread({}, e, {
              type: type
            });
          }

          dispatchMouseCallbacks(e, objects);

          if (dragging_.length > 0) {
            dragging_ = [dragging_[0]];
            dispatchMouseCallbacks(_objectSpread({}, e, {
              type: 'dragStart'
            }), dragging_);
          }
        };

        var onMouseUp = function onMouseUp(e) {
          _this2.raycaster.setFromCamera(mouse, _this2.camera);

          var objects = _this2.raycaster.intersectObjects(_this2.childGroup.children, true);

          dispatchMouseCallbacks(e, objects);

          if (dragging_.length > 0) {
            var droppable = objects.filter(function (obj) {
              return obj.object.userData.droppable && obj.object.userData.responsive;
            });

            if (droppable.length > 0) {
              var what = dragging_.map(function (o) {
                return o.object;
              });
              dispatchMouseCallbacks(_objectSpread({}, e, {
                type: 'drop',
                what: what
              }), droppable);
            }

            dispatchMouseCallbacks(_objectSpread({}, e, {
              type: 'dragEnd'
            }), dragging_);
            dragging_ = [];
          }
        };

        var onMouseMove = function onMouseMove(e) {
          var x = e.clientX;
          var y = e.clientY;
          var el = document.getElementById('bgio-canvas');
          var t = el;

          while (t) {
            if (t.offsetLeft) x -= t.offsetLeft;
            if (t.offsetTop) y -= t.offsetTop;
            t = t.offsetParent;
          }

          t = el;

          while (t) {
            if (t.scrollLeft) x += t.scrollLeft;
            if (t.scrollTop) y += t.scrollTop;
            t = t.parentNode;
          }

          mouse.x = x / _this2.props.width * 2 - 1;
          mouse.y = -(y / _this2.props.height) * 2 + 1;
          dispatchMouseCallbacks(e);

          _this2.raycaster.setFromCamera(mouse, _this2.camera);

          var r = _this2.raycaster.intersectObject(_this2.plane);

          if (r.length > 0) {
            var _e = _objectSpread({}, _e, {
              type: 'drag'
            });

            dragging_.forEach(function (obj) {
              _e.point = r[0].point;

              if (obj.object.id in _this2.callbacks_) {
                _this2.callbacks_[obj.object.id](_e);
              }

              if (obj.object.parent.id in _this2.callbacks_) {
                _this2.callbacks_[obj.object.parent.id](_e);
              }
            });
          }
        };

        var onMouseWheel = function onMouseWheel(e) {
          dispatchMouseCallbacks(e);

          if (e.defaultPrevented) {
            return;
          }

          if (e.wheelDelta > 0) {
            _this2.camera.zoom += 0.5;

            _this2.camera.updateProjectionMatrix();
          } else if (_this2.camera.zoom > 0.5) {
            _this2.camera.zoom -= 0.5;

            _this2.camera.updateProjectionMatrix();
          }

          e.preventDefault();
        };

        var root = this.ref_.current;
        root.addEventListener('mousemove', onMouseMove);
        root.addEventListener('wheel', onMouseWheel);
        root.addEventListener('mousedown', onMouseDown);
        root.addEventListener('mouseup', onMouseUp);
        root.addEventListener('click', dispatchMouseCallbacks);
        root.addEventListener('contextmenu', function (e) {
          return e.preventDefault();
        });
      }
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        this.renderer.domElement.id = 'bgio-canvas';
        this.ref_.current.appendChild(this.renderer.domElement);
        this.setupMouseEvents();
        this.animate();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._initCanvas();
      }
    }, {
      key: "render",
      value: function render() {
        var children = React.Children.map(this.props.children, function (child) {
          return React.cloneElement(child, {
            three: true
          });
        });
        return React.createElement(UIContext.Provider, {
          value: this.getContext()
        }, React.createElement("div", {
          className: "bgio-ui",
          ref: this.ref_
        }, this.state.isLoading ? this.loader : children));
      }
    }]);

    return UI;
  }(React.Component);

  _defineProperty(UI$1, "propTypes", {
    width: PropTypes.number,
    height: PropTypes.number,
    children: PropTypes.any,
    onMouseEvent: PropTypes.func
  });

  _defineProperty(UI$1, "defaultProps", {
    width: 1024,
    height: 768
  });

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  /**
   * Root component of the UI framework.
   */

  var UI$2 = function UI$$1(props) {
    return props.three ? React.createElement(UI$1, props, props.children) : React.createElement(UI, props, props.children);
  };
  UI$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */

  var Logo = function Logo(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return React.createElement("svg", {
      width: width || 128,
      height: height || 128,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 128 128"
    }, React.createElement("path", {
      d: "M64,120.37,15.27,92.28V35.91L64,7.82l48.73,28.09V92.28Z",
      fill: "#373748"
    }), React.createElement("path", {
      fill: "#000",
      d: "M64,124,12,94V34L64,4l52,30V94ZM18.33,90.37,64,116.74l45.67-26.37V37.63L64,11.26,18.33,37.63Z"
    }), React.createElement("path", {
      d: "M81.77,43.17c5.92,0,10.51,1.72,13.57,5.16,3.25,3.44,4.77,8.41,4.77,14.71q0,10.32-5.15,16.06c-3.44,3.82-8.22,5.73-14.53,5.73-5.92,0-10.51-1.72-13.56-5.35-3.25-3.63-4.78-8.6-4.78-15.29s1.72-12,5.16-15.67S75.46,43.17,81.77,43.17Zm-.57,5.16c-4.4,0-7.45,1.15-9.56,3.63s-3,6.31-3,11.66c0,5.73,1,9.74,3,12.42,2.11,2.48,5.16,3.82,9.56,3.82s7.64-1.34,9.74-3.82,3.25-6.5,3.25-11.85c0-5.54-1.15-9.55-3.25-12C88.65,49.48,85.59,48.33,81.2,48.33Z",
      fill: "#fff"
    }), React.createElement("path", {
      d: "M39.35,71.45l.19,12.8H33.43L33.62,72l-.19-28.48h6.11l-.19,27.9Z",
      fill: "#fff"
    }));
  };

  Logo.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string
  };

  var css$1 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.bgio-card {\n  display: flex;\n  user-select: none;\n  font-family: monospace;\n  font-weight: bold;\n  font-size: 18px;\n  color: #ababab;\n  text-align: center;\n  flex-direction: column;\n  justify-content: center;\n  cursor: pointer;\n  background: #fff;\n  border-radius: 6px;\n  border: 1px solid #cdcdcd;\n  width: 100px;\n  height: 140px;\n  overflow: hidden;\n  transition: transform 0.1s;\n}\n\n.bgio-card.placeholder {\n  cursor: default;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.bgio-card.accept {\n  transform: rotate(10deg);\n  box-shadow: 5px 5px 5px #ddd;\n}\n\n.bgio-card.reject {\n}\n\n.bgio-card__front,\n.bgio-card__back {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n}\n\n.bgio-card__back {\n  background-image: url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23ababab' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\");\n  background-position: 2px 2px;\n  outline: 8px solid #eee;\n  outline-offset: -20px;\n}\n";
  styleInject(css$1);

  function GetDraggable(props, classNames, cardStyle, onClick) {
    /* eslint-disable-next-line react/display-name */
    return function (_ref) {
      var isActive = _ref.isActive,
          events = _ref.events;
      return React.createElement("div", _extends({
        className: classNames.join(' '),
        style: _objectSpread({}, props.style, cardStyle, {
          opacity: isActive ? 0 : 1,
          pointerEvents: isActive ? 'none' : 'all'
        }),
        onClick: onClick
      }, events), props.isFaceUp ? props.front : props.back);
    };
  }
  function GetDragComponent(props, classNames, ref, isOverAcceptedCallback) {
    /* eslint-disable-next-line react/display-name, react/prop-types */
    return function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          isOverAccepted = _ref2.isOverAccepted,
          currentlyHoveredDroppableId = _ref2.currentlyHoveredDroppableId;

      var classes = _toConsumableArray(classNames);
      /* eslint-disable-next-line react/prop-types */


      var content = props.back;
      isOverAcceptedCallback(isOverAccepted);
      /* eslint-disable-next-line react/prop-types */

      if (props.isFaceUp) {
        /* eslint-disable-next-line react/prop-types */
        content = props.front;
      }

      if (currentlyHoveredDroppableId !== null) {
        if (isOverAccepted) {
          classes.push('accept');
        } else {
          classes.push('reject');
        }
      }

      return React.createElement("div", {
        className: classes.join(' '),
        ref: ref,
        style: {
          cursor: 'pointer',
          borderWidth: 2,
          pointerEvents: 'none',
          position: 'fixed',
          zIndex: 2000000000,
          boxShadow: '5px 5px 5px #eee',
          left: x - 50,
          top: y - 70
        }
      }, content);
    };
  }
  /* eslint-enable */

  var CardImpl =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(CardImpl, _React$Component);

    function CardImpl(props) {
      var _this;

      _classCallCheck(this, CardImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CardImpl).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {
        _this.props.onClick(_this.props.data);
      });

      _this.id = props.context.genID();
      _this.dragComponentRef = React.createRef();
      _this.isOverAccepted = false;
      return _this;
    }

    _createClass(CardImpl, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var classNames = ['bgio-card'];

        if (this.props.className) {
          classNames.push(this.props.className);
        }

        var cardStyle = {};

        if (this.props.inDeck) {
          cardStyle = {
            position: 'absolute',
            zIndex: this.props.deckPosition
          };
        }

        return React.createElement("div", null, React.createElement(reactDragtastic.Draggable, {
          id: this.id,
          type: this.props.dragZone,
          data: this.props.data
        }, GetDraggable(this.props, classNames, cardStyle, this.onClick)), React.createElement(reactDragtastic.DragComponent, {
          for: this.id
        }, GetDragComponent(this.props, classNames, this.dragComponentRef, function (o) {
          return _this2.isOverAccepted = o;
        })));
      }
    }]);

    return CardImpl;
  }(React.Component);

  _defineProperty(CardImpl, "propTypes", {
    isFaceUp: PropTypes.bool,
    front: PropTypes.node,
    back: PropTypes.node,
    className: PropTypes.string,
    dragZone: PropTypes.string,
    style: PropTypes.any,
    onClick: PropTypes.func,
    context: PropTypes.any.isRequired,
    inDeck: PropTypes.bool,
    data: PropTypes.any,
    deckPosition: PropTypes.number
  });

  _defineProperty(CardImpl, "defaultProps", {
    onClick: function onClick() {},
    isFaceUp: false,
    dragZone: 'bgio-card',
    front: React.createElement("div", {
      className: "bgio-card__front"
    }, "Card"),
    back: React.createElement("div", {
      className: "bgio-card__back"
    }, React.createElement(Logo, {
      width: "48"
    }))
  });

  var Card = function Card(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(CardImpl, _extends({}, props, {
        context: context
      }));
    });
  };

  var CardImpl$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(CardImpl, _React$Component);

    function CardImpl(props) {
      var _this;

      _classCallCheck(this, CardImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(CardImpl).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEvent", function (e) {
        if (!_this.props.responsive) {
          return;
        }

        if (e.type == 'dragStart') {
          _this.obj.castShadow = true;
          new TWEEN.Tween(_this.obj.position).to({
            y: _this.originalY + 0.5
          }, 100).easing(TWEEN.Easing.Quadratic.Out).start();
        }

        if (e.type == 'dragEnd') {
          new TWEEN.Tween(_this.obj.position).to({
            y: _this.originalY
          }, 100).onComplete(function () {
            return _this.obj.castShadow = false;
          }).start();
        }

        if (e.type == 'drag') {
          _this.obj.position.x = e.point.x;
          _this.obj.position.z = e.point.z;
        }
      });

      _this.originalY = props.thickness / 2 - 0.0001;
      var geometry = new THREE.BoxGeometry(props.width, props.thickness, props.height);
      var opts = {
        color: 0x777777
      };

      if (props.image) {
        opts = {
          map: new THREE.TextureLoader().load(props.image)
        };
      }

      var material = new THREE.MeshLambertMaterial(opts);
      _this.obj = new THREE.Mesh(geometry, material);
      _this.obj.receiveShadow = true;
      _this.obj.position.y = _this.originalY;
      _this.obj.userData.draggable = props.draggable;
      _this.obj.userData.responsive = props.responsive;
      return _this;
    }

    _createClass(CardImpl, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.context.add(this.obj, this.onEvent);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.context.remove(this.obj);
      }
    }, {
      key: "render",
      value: function render() {
        this.obj.position.x = this.props.x + this.props.splayX;
        this.obj.position.z = this.props.z + this.props.splayZ;
        this.obj.position.y = this.originalY + this.props.splayY;
        return null;
      }
    }]);

    return CardImpl;
  }(React.Component);

  _defineProperty(CardImpl$1, "propTypes", {
    context: PropTypes.any.isRequired,
    image: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    thickness: PropTypes.number,
    responsive: PropTypes.bool,
    draggable: PropTypes.bool,
    x: PropTypes.number,
    z: PropTypes.number,
    splayX: PropTypes.number,
    splayY: PropTypes.number,
    splayZ: PropTypes.number
  });

  _defineProperty(CardImpl$1, "defaultProps", {
    responsive: true,
    draggable: true,
    splayX: 0,
    splayY: 0,
    splayZ: 0,
    x: 0,
    z: 0,
    width: 1,
    height: 1.5,
    thickness: 0.01
  });

  var Card$1 = function Card(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(CardImpl$1, _extends({}, props, {
        context: context
      }));
    });
  };

  var Card$2 = function Card$$1(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return context.three ? React.createElement(Card$1, _extends({}, props, {
        context: context
      })) : React.createElement(Card, _extends({}, props, {
        context: context
      }));
    });
  };
  Card$2.propTypes = {
    children: PropTypes.any
  };

  var css$2 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.bgio-deck {\n  border: 1px dashed #ddd;\n  position: relative;\n  display: inline-flex;\n  border-radius: 6px;\n  padding: 5px;\n  margin-top: 20px;\n  margin-bottom: 20px;\n  margin-right: 20px;\n  width: 100px;\n  height: 140px;\n}\n";
  styleInject(css$2);

  var DeckImpl =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DeckImpl, _React$Component);

    function DeckImpl(props) {
      var _this;

      _classCallCheck(this, DeckImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DeckImpl).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function () {
        var cards = React.Children.toArray(_this.props.children);
        var topCardProps = null;

        if (cards.length > 0) {
          topCardProps = cards[cards.length - 1].props;

          _this.props.onClick(topCardProps.data);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDrop", function (cardData) {
        // Don't fire onDrop if the top card of this deck was
        // dragged away and then dropped back.
        var isChild = false;
        React.Children.forEach(_this.props.children, function (card) {
          if (cardData !== undefined && card.props.data === cardData) {
            isChild = true;
          }
        });

        if (!isChild) {
          _this.props.onDrop(cardData);
        }
      });

      _this.id = props.context.genID();
      return _this;
    }

    _createClass(DeckImpl, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var cardIndex = 0;
        var cards = React.Children.map(this.props.children, function (card) {
          return React.cloneElement(card, {
            dragZone: _this2.props.dragZone,
            inDeck: true,
            deckPosition: cardIndex++
          });
        });
        return React.createElement("div", {
          onClick: this.onClick
        }, React.createElement(reactDragtastic.Droppable, {
          accepts: this.props.dragZone,
          onDrop: this.onDrop
        }, function (_ref) {
          var events = _ref.events;
          return React.createElement("div", _extends({}, events, {
            className: _this2.props.className,
            style: {
              background: '#eee',
              marginRight: 20,
              padding: _this2.props.padding,
              position: 'relative',
              width: '100px',
              height: '140px',
              display: 'block',
              float: 'left'
            }
          }), cards);
        }));
      }
    }]);

    return DeckImpl;
  }(React.Component);

  _defineProperty(DeckImpl, "propTypes", {
    context: PropTypes.any,
    children: PropTypes.any,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    splayWidth: PropTypes.number,
    dragZone: PropTypes.string,
    padding: PropTypes.number,
    className: PropTypes.string
  });

  _defineProperty(DeckImpl, "defaultProps", {
    padding: 10,
    splayWidth: 3,
    dragZone: 'bgio-card',
    onDrop: function onDrop() {},
    onClick: function onClick() {}
  });

  var Deck = function Deck(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(DeckImpl, _extends({}, props, {
        context: context
      }));
    });
  };

  var DeckImpl$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DeckImpl, _React$Component);

    function DeckImpl(props) {
      var _this;

      _classCallCheck(this, DeckImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(DeckImpl).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        isHighlighted: false
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onEvent", function (e) {
        if (e.type == 'drop') {
          e.what[0].position.x = -2;
          e.what[0].position.z = 0;
          e.what[0].position.y += 20 * 0.02;
        }
      });

      _this.originalY = props.thickness / 2 - 0.0001;
      var geometry = new THREE.BoxGeometry(props.width, props.thickness, props.height);
      var material = new THREE.MeshLambertMaterial({
        color: 0xcccccc
      });
      _this.obj = new THREE.Mesh(geometry, material);
      _this.obj.userData.droppable = true;
      _this.obj.userData.responsive = true;
      _this.obj.position.y = _this.originalY;
      return _this;
    }

    _createClass(DeckImpl, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.context.add(this.obj, this.onEvent);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.context.remove(this.obj);
      }
    }, {
      key: "render",
      value: function render() {
        this.obj.position.x = -2;
        var cards = [];

        for (var i = 0; i < 20; i++) {
          cards.push(React.createElement(Card$1, {
            key: i,
            responsive: false,
            x: -2,
            splayY: i * 0.02
          }));
        }

        return cards;
      }
    }]);

    return DeckImpl;
  }(React.Component);

  _defineProperty(DeckImpl$1, "propTypes", {
    context: PropTypes.any.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    thickness: PropTypes.number
  });

  _defineProperty(DeckImpl$1, "defaultProps", {
    width: 1,
    height: 1.5,
    thickness: 0.01
  });

  var Deck$1 = function Deck(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(DeckImpl$1, _extends({}, props, {
        context: context
      }));
    });
  };

  var Deck$2 = function Deck$$1(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return context.three ? React.createElement(Deck$1, _extends({}, props, {
        context: context
      })) : React.createElement(Deck, _extends({}, props, {
        context: context
      }));
    });
  };
  Deck$2.propTypes = {
    children: PropTypes.any
  };

  /**
   * Grid
   *
   * Component that will show children on a cartesian regular grid.
   *
   * Props:
   *   rows       - Number of rows (height) of the grid.
   *   cols       - Number of columns (width) of the grid.
   *   style      - CSS style of the Grid HTML element.
   *   colorMap   - A map from 'x,y' => color.
   *   onClick    - (x, y) => {}
   *                Called when a square is clicked.
   *   onMouseOver    - (x, y) => {}
   *                Called when a square is mouse over.
   *   onMouseOut    - (x, y) => {}
   *                Called when a square is mouse out.
   *
   * Usage:
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2}/>
   * </Grid>
   */

  var Grid =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Grid, _React$Component);

    function Grid() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Grid);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Grid)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_svgRef", React.createRef());

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (args) {
        if (_this.props.onClick) {
          _this.props.onClick(args);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOver", function (args) {
        if (_this.props.onMouseOver) {
          _this.props.onMouseOver(args);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOut", function (args) {
        if (_this.props.onMouseOut) {
          _this.props.onMouseOut(args);
        }
      });

      return _this;
    }

    _createClass(Grid, [{
      key: "_getCellColor",
      value: function _getCellColor(x, y) {
        var key = "".concat(x, ",").concat(y);
        var color = 'white';

        if (key in this.props.colorMap) {
          color = this.props.colorMap[key];
        }

        return color;
      }
    }, {
      key: "_getGrid",
      value: function _getGrid() {
        if (!this.props.outline) {
          return null;
        }

        var squares = [];

        for (var x = 0; x < this.props.cols; x++) {
          for (var y = 0; y < this.props.rows; y++) {
            squares.push(React.createElement(Square, {
              key: this.props.cols * y + x,
              style: {
                fill: this._getCellColor(x, y)
              },
              x: x,
              y: y,
              size: this.props.cellSize,
              onClick: this.onClick,
              onMouseOver: this.onMouseOver,
              onMouseOut: this.onMouseOut
            }));
          }
        }

        return squares;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var tokens = React.Children.map(this.props.children, function (child) {
          return React.cloneElement(child, {
            template: Square,
            // Overwrites Token's onClick, onMouseOver, onMouseOut
            onClick: _this2.onClick,
            onMouseOver: _this2.onMouseOver,
            onMouseOut: _this2.onMouseOut,
            svgRef: _this2._svgRef
          });
        });
        return React.createElement("svg", {
          ref: this._svgRef,
          viewBox: '0 0 ' + this.props.cols + ' ' + this.props.rows,
          style: this.props.style
        }, React.createElement("g", null, this._getGrid()), tokens);
      }
    }]);

    return Grid;
  }(React.Component);
  /**
   * Square
   *
   * Component that renders a square inside a Grid.
   *
   * Props:
   *   x       - X coordinate on grid coordinates.
   *   y       - Y coordinate on grid coordinates.
   *   size    - Square size.
   *   style   - Custom styling.
   *   onClick - Invoked when a Square is clicked.
   *   onMouseOver - Invoked when a Square is mouse over.
   *   onMouseOut - Invoked when a Square is mouse out.
   *   eventListeners - Array of objects with name and callback
   *   for DOM events.
   *
   * Not meant to be used by the end user directly (use Token).
   * Also not exposed in the NPM.
   */

  _defineProperty(Grid, "propTypes", {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    outline: PropTypes.bool,
    style: PropTypes.object,
    colorMap: PropTypes.object,
    cellSize: PropTypes.number,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
  });

  _defineProperty(Grid, "defaultProps", {
    colorMap: {},
    outline: true,
    cellSize: 1
  });

  var Square =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(Square, _React$Component2);

    function Square() {
      var _getPrototypeOf3;

      var _this3;

      _classCallCheck(this, Square);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(Square)).call.apply(_getPrototypeOf3, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_gRef", React.createRef());

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onClick", function (e) {
        _this3.props.onClick(_this3.getCoords(), e);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOver", function (e) {
        _this3.props.onMouseOver(_this3.getCoords(), e);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOut", function (e) {
        _this3.props.onMouseOut(_this3.getCoords(), e);
      });

      return _this3;
    }

    _createClass(Square, [{
      key: "getCoords",
      value: function getCoords() {
        return {
          x: this.props.x,
          y: this.props.y
        };
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var element = this._gRef.current;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.eventListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;
            element.addEventListener(listener.name, listener.callback);
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
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var element = this._gRef.current;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.props.eventListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var listener = _step2.value;
            element.removeEventListener(listener.name, listener.callback);
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
      }
    }, {
      key: "render",
      value: function render() {
        var tx = this.props.x * this.props.size;
        var ty = this.props.y * this.props.size; // If no child, render a square.

        var children = React.createElement("rect", {
          style: this.props.style,
          width: this.props.size,
          height: this.props.size,
          x: 0,
          y: 0
        }); // If a child is passed, render child.

        if (this.props.children) {
          children = this.props.children;
        }

        return React.createElement("g", {
          ref: this._gRef,
          onClick: this.onClick,
          onMouseOver: this.onMouseOver,
          onMouseOut: this.onMouseOut,
          transform: "translate(".concat(tx, ", ").concat(ty, ")")
        }, children);
      }
    }]);

    return Square;
  }(React.Component);

  _defineProperty(Square, "propTypes", {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    size: PropTypes.number,
    style: PropTypes.any,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    eventListeners: PropTypes.array,
    children: PropTypes.element
  });

  _defineProperty(Square, "defaultProps", {
    size: 1,
    x: 0,
    y: 0,
    style: {
      fill: '#fff'
    },
    eventListeners: []
  });

  /**
   * Grid
   *
   * Component that will show children on a cartesian regular grid.
   *
   * Props:
   *   rows       - Number of rows (height) of the grid.
   *   cols       - Number of columns (width) of the grid.
   *   cellSize   - Size of a square.
   *   thichness  - Thichness of a square.
   *   padding    - Padding between squares.
   *   colorMap   - A map from 'x,y' => color.
   *   onClick    - (x, y) => {}
   *                Called when a square is clicked.
   *   onMouseOver    - (x, y) => {}
   *                Called when a square is mouse over.
   *   onMouseOut    - (x, y) => {}
   *                Called when a square is mouse out.
   *
   * Usage:
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2}/>
   * </Grid>
   */

  var Grid$1 = function Grid(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(GridImpl, _extends({}, props, {
        context: context
      }));
    });
  };

  var GridImpl =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(GridImpl, _React$Component);

    function GridImpl(props) {
      var _this;

      _classCallCheck(this, GridImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(GridImpl).call(this, props));
      _this.boardGroup = new THREE.Group();
      _this.tokenGroup = new THREE.Group();

      _this.boardGroup.add(_this.tokenGroup); // translate the board to center on (0,0,0)


      _this.boardGroup.translateX(-(_this.props.padding + _this.props.cellSize) * (_this.props.cols - 1) / 2);

      _this.boardGroup.translateZ(-(_this.props.padding + _this.props.cellSize) * (_this.props.rows - 1) / 2);

      return _this;
    }

    _createClass(GridImpl, [{
      key: "_getCellColor",
      value: function _getCellColor(x, y) {
        var key = "".concat(x, ",").concat(y);
        var color = '#777777';

        if (key in this.props.colorMap) {
          color = this.props.colorMap[key];
        }

        return color;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.context.remove(this.boardGroup);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        this.context = this.props.context;
        this.context.add(this.boardGroup); // when rerendering, render a new squareGroup

        this.boardGroup.remove(this.squareGroup);
        this.squareGroup = new THREE.Group();
        this.boardGroup.add(this.squareGroup); // add square base

        var _loop = function _loop(x) {
          var _loop2 = function _loop2(y) {
            var squareProps = {
              x: x,
              y: y,
              size: _this2.props.cellSize,
              color: _this2._getCellColor(x, y),
              padding: _this2.props.padding,
              thickness: _this2.props.thickness
            };
            var square = new Square$1(squareProps);

            _this2.squareGroup.add(square);

            var onEvent = function onEvent(e) {
              if (e.type == 'click') {
                if (_this2.props.onClick) _this2.props.onClick({
                  x: x,
                  y: y
                });
              } else if (e.type == 'mouseOver') {
                if (_this2.props.onMouseOver) _this2.props.onMouseOver({
                  x: x,
                  y: y
                });
              } else if (e.type == 'mouseOut') {
                if (_this2.props.onMouseOut) _this2.props.onMouseOut({
                  x: x,
                  y: y
                });
              }
            };

            _this2.context.regCall(square, onEvent);
          };

          for (var y = 0; y < _this2.props.rows; y++) {
            _loop2(y);
          }
        };

        for (var x = 0; x < this.props.cols; x++) {
          _loop(x);
        } // set tokens


        var tokens = React.Children.map(this.props.children, function (child) {
          return React.cloneElement(child, {
            three: true,
            boardSize: _this2.props.cellSize,
            parent: _this2.tokenGroup,
            padding: _this2.props.padding,
            lift: _this2.props.thickness
          });
        });

        if (tokens) {
          return tokens;
        }

        return null;
      }
    }]);

    return GridImpl;
  }(React.Component);
  /**
   * Square
   *
   * Component that renders a square inside a Grid.
   *
   * Props
   *   x          - X coordinate on grid coordinates.
   *   y          - Y coordinate on grid coordinates.
   *   size       - Square size.
   *   color      - Color of the square
   *   thichness  - Thichness of a square.
   *   padding    - Padding between squares.
   *
   * Not meant to be used by the end user directly (use Token).
   * Also not exposed in the NPM.
   */


  _defineProperty(GridImpl, "propTypes", {
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    cellSize: PropTypes.number,
    thickness: PropTypes.number,
    padding: PropTypes.number,
    colorMap: PropTypes.object,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    context: PropTypes.any,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
  });

  _defineProperty(GridImpl, "defaultProps", {
    colorMap: {},
    cellSize: 1,
    padding: 0.1,
    thickness: 0.1
  });

  var Square$1 =
  /*#__PURE__*/
  function (_THREE$Mesh) {
    _inherits(Square, _THREE$Mesh);

    function Square(props) {
      var _this3;

      _classCallCheck(this, Square);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Square).call(this));
      _this3.userData = _objectSpread({
        responsive: true,
        draggable: false
      }, props);
      props = _this3.userData;
      _this3.geometry = new THREE.BoxBufferGeometry(props.size, props.thickness, props.size);
      _this3.material = new THREE.MeshLambertMaterial({
        color: props.color
      });
      _this3.receiveShadow = true;

      _this3.translateX(_this3.userData.x * (props.size + props.padding));

      _this3.translateZ(_this3.userData.y * (props.size + props.padding));

      _this3.translateY(_this3.userData.thickness / 2);

      return _this3;
    }

    return Square;
  }(THREE.Mesh);

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var Grid$2 = function Grid$$1(props) {
    return props.three ? React.createElement(Grid$1, props, props.children) : React.createElement(Grid, props, props.children);
  };
  Grid$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };
  var Square$2 = function Square$$1(props) {
    return props.three ? React.createElement(Square$1, props, props.children) : React.createElement(Square, props, props.children);
  };
  Square$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };

  /**
   * HexGrid
   *
   * Component to display a hex grid.
   * Reference: https://www.redblobgames.com/grids/hexagons/.
   *
   * We use cube co-ordinates (see reference).
   *
   * Props:
   *   levels     - The number of levels around the central hex.
   *   style      - CSS style of the HTML element.
   *
   * Usage:
   *
   * <HexGrid levels={5}>
   *   <Token x={0} y={0} z={0}/>
   * </HexGrid>
   */

  var HexGrid =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HexGrid, _React$Component);

    function HexGrid() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, HexGrid);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HexGrid)).call.apply(_getPrototypeOf2, [this].concat(_args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_svgRef", React.createRef());

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClick", function (args) {
        if (_this.props.onClick) {
          _this.props.onClick(args);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOver", function (args) {
        if (_this.props.onMouseOver) {
          _this.props.onMouseOver(args);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMouseOut", function (args) {
        if (_this.props.onMouseOut) {
          _this.props.onMouseOut(args);
        }
      });

      return _this;
    }

    _createClass(HexGrid, [{
      key: "_getCellColor",
      value: function _getCellColor(x, y, z) {
        var key = "".concat(x, ",").concat(y, ",").concat(z);
        var color = 'white';

        if (key in this.props.colorMap) {
          color = this.props.colorMap[key];
        }

        return color;
      }
    }, {
      key: "_getGrid",
      value: function _getGrid() {
        if (!this.props.outline) {
          return null;
        }

        var hexes = [];
        var r = this.props.levels;

        for (var x = -r; x <= r; x++) {
          for (var y = -r; y <= r; y++) {
            var z = -x - y;
            if (Math.abs(z) > r) continue;
            hexes.push(React.createElement(Hex, {
              key: "".concat(x, ":").concat(y, ":").concat(z),
              style: {
                fill: this._getCellColor(x, y, z)
              },
              x: x,
              y: y,
              z: z,
              size: this.props.cellSize,
              onClick: this.onClick,
              onMouseOver: this.onMouseOver,
              onMouseOut: this.onMouseOut
            }));
          }
        }

        return hexes;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var tokens = React.Children.map(this.props.children, function (child) {
          return React.cloneElement(child, {
            template: Hex,
            onClick: _this2.onClick,
            onMouseOver: _this2.onMouseOver,
            onMouseOut: _this2.onMouseOut,
            svgRef: _this2._svgRef
          });
        });
        var t = this.props.cellSize * this.props.levels * 2;
        return React.createElement("svg", {
          ref: this._svgRef,
          viewBox: -t + ' ' + -t + ' ' + 2 * t + ' ' + 2 * t,
          style: this.props.style
        }, React.createElement("g", null, this._getGrid()), tokens);
      }
    }]);

    return HexGrid;
  }(React.Component);
  /**
   * Hex (flat-topped).
   *
   * Component that renders a hexagon inside a HexGrid.
   *
   * Props:
   *   x       - X coordinate (cube coordinates).
   *   y       - Y coordinate (cube coordinates).
   *   z       - Z coordinate (cube coordinates).
   *   size    - Hex size.
   *   style   - Custom styling.
   *   onClick - Invoked when a Hex is clicked.
   *   onMouseOver - Invoked when a Hex is mouse over.
   *   onMouseOut - Invoked when a Hex is mouse out.
   *   eventListeners - Array of objects with name and callback
   *   for DOM events.
   *
   * Not meant to be used by the end user directly (use Token).
   * Also not exposed in the NPM.
   */

  _defineProperty(HexGrid, "propTypes", {
    levels: PropTypes.number.isRequired,
    outline: PropTypes.bool,
    style: PropTypes.object,
    colorMap: PropTypes.object,
    cellSize: PropTypes.number,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
  });

  _defineProperty(HexGrid, "defaultProps", {
    levels: 5,
    colorMap: {},
    outline: true,
    cellSize: 1
  });

  var Hex =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(Hex, _React$Component2);

    function Hex(props) {
      var _this3;

      _classCallCheck(this, Hex);

      _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Hex).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "_gRef", React.createRef());

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onClick", function (e) {
        _this3.props.onClick(_this3.getCoords(), e);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOver", function (e) {
        _this3.props.onMouseOver(_this3.getCoords(), e);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this3)), "onMouseOut", function (e) {
        _this3.props.onMouseOut(_this3.getCoords(), e);
      });

      return _this3;
    }

    _createClass(Hex, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var element = this._gRef.current;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.eventListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var listener = _step.value;
            element.addEventListener(listener.name, listener.callback);
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
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var element = this._gRef.current;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.props.eventListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var listener = _step2.value;
            element.removeEventListener(listener.name, listener.callback);
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
      }
    }, {
      key: "getCoords",
      value: function getCoords() {
        return {
          x: this.props.x,
          y: this.props.y,
          z: this.props.z
        };
      }
    }, {
      key: "render",
      value: function render() {
        var tx = this.center.x;
        var ty = this.center.y; // If no child, render a hex.

        var children = React.createElement("polygon", {
          style: this.props.style,
          points: this.points,
          stroke: "#aaa",
          strokeWidth: 0.01
        }); // If a child is passed, render child.

        if (this.props.children) {
          children = this.props.children;
        }

        return React.createElement("g", {
          ref: this._gRef,
          onClick: this.onClick,
          onMouseOver: this.onMouseOver,
          onMouseOut: this.onMouseOut,
          transform: "translate(".concat(tx, ", ").concat(ty, ")")
        }, children);
      }
    }, {
      key: "width",
      get: function get() {
        return this.props.size * 2;
      }
    }, {
      key: "height",
      get: function get() {
        return (Math.sqrt(3) / 2 * this.width).toFixed(3);
      }
      /**
       * Get the co-ordinates of the hex center.
       */

    }, {
      key: "center",
      get: function get() {
        var q = this.props.x;
        var r = this.props.z;
        var x = this.props.size * 3 * q / 2.0;
        var y = this.props.size * Math.sqrt(3) * (r + q / 2.0);
        return {
          x: x,
          y: y
        };
      }
      /**
       * Get the points of the vertices.
       */

    }, {
      key: "points",
      get: function get() {
        //   b____c
        //   /    \
        // a/      \d
        //  \      /
        //   \____/
        //   f    e
        var s = this.props.size;
        var h = this.height;
        var xa = -s;
        var xb = -s / 2.0;
        var xc = +s / 2.0;
        var xd = +s;
        var xe = xc;
        var xf = xb;
        var ya = 0.0;
        var yb = h / 2.0;
        var yc = yb;
        var yd = ya;
        var ye = -h / 2.0;
        var yf = ye;
        var flatTop = ["".concat(xa, ",").concat(ya), "".concat(xb, ",").concat(yb), "".concat(xc, ",").concat(yc), "".concat(xd, ",").concat(yd), "".concat(xe, ",").concat(ye), "".concat(xf, ",").concat(yf)];
        return flatTop.join(' ');
      }
    }]);

    return Hex;
  }(React.Component);

  _defineProperty(Hex, "propTypes", {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    size: PropTypes.number,
    style: PropTypes.any,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    eventListeners: PropTypes.array,
    children: PropTypes.element
  });

  _defineProperty(Hex, "defaultProps", {
    size: 1,
    x: 0,
    y: 0,
    z: 0,
    style: {
      fill: '#fff'
    },
    eventListeners: []
  });

  var HexGrid$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(HexGrid, _React$Component);

    function HexGrid() {
      _classCallCheck(this, HexGrid);

      return _possibleConstructorReturn(this, _getPrototypeOf(HexGrid).apply(this, arguments));
    }

    _createClass(HexGrid, [{
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return HexGrid;
  }(React.Component); // Not yet implemented.

  var Hex$1 =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(Hex, _React$Component2);

    function Hex() {
      _classCallCheck(this, Hex);

      return _possibleConstructorReturn(this, _getPrototypeOf(Hex).apply(this, arguments));
    }

    _createClass(Hex, [{
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return Hex;
  }(React.Component);

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var Hex$2 = function Hex$$1(props) {
    return props.three ? React.createElement(Hex$1, props, props.children) : React.createElement(Hex, props, props.children);
  };
  Hex$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };
  var HexGrid$2 = function HexGrid$$1(props) {
    return props.three ? React.createElement(HexGrid$1, props, props.children) : React.createElement(HexGrid, props, props.children);
  };
  HexGrid$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var isSame = function isSame(a) {
    return function (b) {
      return a.x === b.x && a.y === b.y && a.z === b.z;
    };
  };

  var addPoint = function addPoint(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    };
  };

  var isContained = function isContained(a, points) {
    return points.some(isSame(a));
  };
  /**
   * Get neighbors
   *
   * A utility function which returns all neighbors for a point
   * expressed in cube coordinates
   *
   * Arguments:
   *   point      (Cube coorinates)
   *
   */


  var getAllNeighbors = function getAllNeighbors(point) {
    return [[1, -1, 0], [1, 0, -1], [0, 1, -1], [0, -1, 1], [-1, 1, 0], [-1, 0, 1]].map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 3),
          dx = _ref4[0],
          dy = _ref4[1],
          dz = _ref4[2];

      return addPoint(point, {
        x: dx,
        y: dy,
        z: dz
      });
    });
  };
  /**
   * Get distance
   *
   * A utility function which calculates the distance between two
   * points expressed in cube coordinates
   *
   * Arguments:
   *   Two objects with:
   *   x       - X coordinate (cube coordinates)
   *   y       - Y coordinate (cube coordinates)
   *   z       - Z coordinate (cube coordinates)
   *
   */

  var getDistance = function getDistance(a, b) {
    return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2;
  };
  /**
   * Get range
   *
   * A utility function which returns all points within a range
   * from the center
   *
   * Arguments:
   *   center    (Cube coordinates)
   *   distance  number
   *
   */

  var getRange = function getRange(center, distance) {
    var results = [];

    for (var x = -distance; x <= distance; x++) {
      var startY = Math.max(-distance, -x - distance);
      var stopY = Math.min(distance, -x + distance);

      for (var y = startY; y <= stopY; y++) {
        var z = -x - y;
        results.push(addPoint(center, {
          x: x,
          y: y,
          z: z
        }));
      }
    }

    return results;
  };
  /**
   * Get reachable
   *
   * A utility function which returns all reachable points given
   * a start, a movement distance, and a set of blocked points
   *
   * Arguments:
   *   start     point (Cube coordinates)
   *   movement  number
   *   blocked   array of blocked points (cube coordinates)
   *
   */

  var getReachable = function getReachable(start, movement, blocked) {
    var visited = [start];
    var fringes = [[start]];

    var _loop = function _loop(i) {
      fringes.push([]);
      fringes[i - 1].map(getAllNeighbors).reduce(function (prev, curr) {
        return prev.concat(curr);
      }, []).filter(function (neighbor) {
        return !isContained(neighbor, blocked.concat(visited));
      }).forEach(function (neighbor) {
        visited.push(neighbor);
        fringes[i].push(neighbor);
      });
    };

    for (var i = 1; i <= movement; i++) {
      _loop(i);
    }

    return visited;
  };
  var HexUtils = {
    getAllNeighbors: getAllNeighbors,
    getDistance: getDistance,
    getRange: getRange,
    getReachable: getReachable
  };

  /**
   * Token
   *
   * Component that represents a board game piece (or token).
   * Can be used by itself or with one of the grid systems
   * provided (Grid or HexGrid).
   *
   * A token renders as a square inside a Grid and a
   * hexagon inside a HexGrid. Additionally, you can pass
   * it a child if you want any other custom rendering.
   *
   * Props:
   *   x       - X coordinate on grid / hex grid.
   *   y       - Y coordinate on grid / hex grid.
   *   z       - Z coordinate on hex grid.
   *   animate - Changes in position are animated if true.
   *   animationDuration - Length of animation.
   *   onClick - Called when the token is clicked.
   *   onMouseOver - Called when the token is mouse over.
   *   onMouseOut - Called when the token is mouse out.
   *   draggable - Whether a Token is draggable or not.
   *   shouldDrag - Whether a draggable token should start drag.
   *   onDrag - Called when a token was dragged (moved).
   *            Parameter contain { x, y, originalX, originalY }.
   *   onDrop - Called when the token was dropped after dragging.
   *            Parameter contain { x, y, originalX, originalY }.
   *
   * Usage:
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2}/>
   * </Grid>
   *
   * <HexGrid>
   *   <Token x={1} y={2} z={-3}/>
   * </HexGrid>
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2}>
   *     <Knight color="white"/>
   *   </Token>
   * </Grid>
   */

  var Token =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Token, _React$Component);

    function Token(props) {
      var _this;

      _classCallCheck(this, Token);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Token).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_startDrag", function (e) {
        if (_this.props.draggable && _this.props.shouldDrag(_this.getCoords())) {
          e.preventDefault(); // Required for Safari/iOs.

          e = e.touches ? e.touches[0] : e;

          _this.setState(_objectSpread({}, _this.state, {
            dragged: {
              x: e.pageX,
              y: e.pageY
            }
          }));

          _this._addOrRemoveDragEventListeners(true);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_drag", function (e) {
        if (_this.state.dragged) {
          e.preventDefault(); // Required for Safari/iOs.

          e = e.touches ? e.touches[0] : e;

          var ctm = _this.props.svgRef.current.getScreenCTM().inverse();

          var deltaPageX = e.pageX - _this.state.dragged.x;
          var deltaPageY = e.pageY - _this.state.dragged.y;
          var deltaSvgX = ctm.a * deltaPageX + ctm.b * deltaPageY;
          var deltaSvgY = ctm.c * deltaPageX + ctm.d * deltaPageY;
          var x = _this.state.x + deltaSvgX;
          var y = _this.state.y + deltaSvgY;

          if (_this.props.onDrag) {
            _this.props.onDrag({
              x: x,
              y: y,
              originalX: _this.props.x,
              originalY: _this.props.y
            });
          }

          _this.setState(_objectSpread({}, _this.state, {
            x: x,
            y: y,
            dragged: {
              x: e.pageX,
              y: e.pageY
            }
          }));
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_endDrag", function (e) {
        if (_this.state.dragged) {
          e.preventDefault(); // Whether this is a drop or a click depends if the mouse moved after drag.
          // Android will issue very small drag events, so we need a distance.

          var dist = Math.sqrt(Math.pow(_this.state.x - _this.props.x, 2) + Math.pow(_this.state.y - _this.props.y, 2));

          if (dist > 0.2) {
            _this.props.onDrop({
              x: _this.state.x,
              y: _this.state.y,
              originalX: _this.props.x,
              originalY: _this.props.y
            });
          } else {
            _this.props.onClick({
              x: _this.state.x,
              y: _this.state.y
            });
          }

          _this.setState(_objectSpread({}, _this.state, {
            x: _this.props.x,
            y: _this.props.y,
            dragged: null
          }));

          _this._addOrRemoveDragEventListeners(false);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_onClick", function (param) {
        // Ignore onClick if the element is draggable, because desktops will
        // send both onClick and touch events, leading to duplication.
        // Whether this will be a click or a drop will be defined in _endDrag.
        if (!(_this.props.draggable && _this.props.shouldDrag(_this.getCoords()))) {
          _this.props.onClick(param);
        }
      });

      _this.state = _objectSpread({}, _this.getCoords(), {
        dragged: null,
        usingTouch: false
      });
      return _this;
    }

    _createClass(Token, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.state.dragged) {
          this._addOrRemoveDragEventListeners(false);
        }
      }
      /**
       * If there is a change in props, saves old x/y,
       * and current time. Starts animation.
       * @param {Object} nextProps Next props.
       */
      // eslint-disable-next-line react/no-deprecated

    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var oldCoord = this.getCoords();
        var newCoord = this.getCoords(nextProps); // Debounce.

        if (oldCoord.x == newCoord.x && oldCoord.y == newCoord.y) {
          return;
        }

        this.setState(_objectSpread({}, this.state, {
          originTime: Date.now(),
          originX: this.state.x,
          originY: this.state.y,
          originZ: this.state.z
        }));
        requestAnimationFrame(this._animate(Date.now()));
      }
      /**
       * Add or remove event listeners.
       * @param {boolean} shouldAdd If it should add (or remove) listeners.
       */

    }, {
      key: "_addOrRemoveDragEventListeners",
      value: function _addOrRemoveDragEventListeners(shouldAdd) {
        var svgEl = this.props.svgRef.current;
        if (!svgEl) return;
        var addOrRemoveEventListener = svgEl.addEventListener;

        if (!shouldAdd) {
          addOrRemoveEventListener = svgEl.removeEventListener;
        }

        addOrRemoveEventListener('touchmove', this._drag, {
          passive: false
        });
        addOrRemoveEventListener('mousemove', this._drag, {
          passive: false
        });
        addOrRemoveEventListener('mouseup', this._endDrag, {
          passive: false
        });
        addOrRemoveEventListener('mouseleave', this._endDrag, {
          passive: false
        });
        addOrRemoveEventListener('touchcancel', this._endDrag, {
          passive: false
        });
        addOrRemoveEventListener('touchleave', this._endDrag, {
          passive: false
        });
        addOrRemoveEventListener('touchend', this._endDrag, {
          passive: false
        });
      }
      /**
       * Recursively animates x and y.
       * @param {number} now Unix timestamp when this was called.
       */

    }, {
      key: "_animate",
      value: function _animate(now) {
        var _this2 = this;

        return function () {
          var elapsed = now - _this2.state.originTime;

          var svgCoord = _this2.getCoords();

          if (elapsed < _this2.props.animationDuration && _this2.props.animate) {
            var percentage = _this2._easeInOutCubic(elapsed, 0, 1, _this2.props.animationDuration);

            _this2.setState(_objectSpread({}, _this2.state, {
              x: (svgCoord.x - _this2.state.originX) * percentage + _this2.state.originX,
              y: (svgCoord.y - _this2.state.originY) * percentage + _this2.state.originY,
              z: (svgCoord.z - _this2.state.originZ) * percentage + _this2.state.originZ
            }));

            requestAnimationFrame(_this2._animate(Date.now()));
          } else {
            _this2.setState(_objectSpread({}, _this2.state, {
              x: svgCoord.x,
              y: svgCoord.y,
              z: svgCoord.z
            }));
          }
        }.bind(this);
      }
      /**
       * Gets SVG x/y/z coordinates.
       * @param {Object} props Props object to get coordinates from.
       * @return {Object} Object with x, y and z parameters.
       */

    }, {
      key: "getCoords",
      value: function getCoords() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
        return {
          x: props.x,
          y: props.y,
          z: props.z
        };
      }
      /**
       * Returns animation easing value. See http://easings.net/#easeInOutCubic.
       * @param {number} t Current time.
       * @param {number} b Beginning value.
       * @param {number} c Final value.
       * @param {number} d Duration.
       */

    }, {
      key: "_easeInOutCubic",
      value: function _easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }
      /**
       * Gets event listeners needed for drag and drop.
       */

    }, {
      key: "_eventListeners",
      value: function _eventListeners() {
        return [{
          name: 'mousedown',
          callback: this._startDrag
        }, {
          name: 'touchstart',
          callback: this._startDrag
        }];
      }
    }, {
      key: "render",
      value: function render() {
        var Component = this.props.template;
        return React.createElement(Component, {
          x: this.state.x,
          y: this.state.y,
          z: this.state.z,
          style: this.props.style,
          onClick: this._onClick,
          onMouseOver: this.props.onMouseOver,
          onMouseOut: this.props.onMouseOut,
          eventListeners: this._eventListeners()
        }, this.props.children);
      }
    }]);

    return Token;
  }(React.Component);

  _defineProperty(Token, "propTypes", {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    template: PropTypes.any,
    style: PropTypes.any,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.element,
    animationDuration: PropTypes.number,
    draggable: PropTypes.bool,
    shouldDrag: PropTypes.func,
    onDrag: PropTypes.func,
    onDrop: PropTypes.func,
    svgRef: PropTypes.object
  });

  _defineProperty(Token, "defaultProps", {
    animationDuration: 750,
    template: Square
  });

  /**
   * Token
   *
   * Component that represents a board game piece (or token).
   * Can be used by itself or with one of the grid systems
   * provided (Grid or HexGrid).
   *
   * A token renders as a 3D Mesh. IF no mesh prop is passed.
   * It will render a white box on the grid.
   *
   * Props:
   *   x       - X coordinate on grid / hex grid.
   *   y       - Y coordinate on grid / hex grid.
   *   z       - Z coordinate on hex grid.
   *   onClick - Called when the token is clicked.
   *   onMouseOver - Called when the token is mouse over.
   *   onMouseOut - Called when the token is mouse out.
   *
   * Usage:
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2}/>
   * </Grid>
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2} size={0.5}/>
   * </Grid>
   *
   * <HexGrid>
   *   <Token x={1} y={2} z={-3}/>
   * </HexGrid>
   *
   * <Grid rows={8} cols={8}>
   *   <Token x={1} y={2} mesh={THREE.js 3D-Object}/>
   * </Grid>
   *
   */

  var Token$1 = function Token(props) {
    return React.createElement(UIContext.Consumer, null, function (context) {
      return React.createElement(TokenImpl, _extends({}, props, {
        context: context
      }));
    });
  };

  var TokenImpl =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(TokenImpl, _React$Component);

    function TokenImpl(props) {
      var _this;

      _classCallCheck(this, TokenImpl);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TokenImpl).call(this));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_attachMesh", function (mesh) {
        var size = _this.size;
        var meshSize = new THREE.Vector3();
        var meshCenter = new THREE.Vector3();
        var bbox = new THREE.Box3().setFromObject(mesh);
        bbox.getSize(meshSize);
        bbox.getCenter(meshCenter); // determine the scale factor

        var scale = meshSize.z < meshSize.x ? meshSize.x : meshSize.z;
        scale = size / scale;
        mesh.scale.set(scale, scale, scale); // set the mesh to the ground

        if (_this.props.boardSize && _this.props.lift && _this.props.padding) {
          mesh.position.x = _this.props.x * (_this.props.boardSize + _this.props.padding);
          mesh.position.z = _this.props.y * (_this.props.boardSize + _this.props.padding);
          mesh.position.y = -bbox.min.y + _this.props.lift;
        } else {
          mesh.position.x = _this.props.x;
          mesh.position.z = _this.props.y;
          mesh.position.y = -bbox.min.y;
        }

        _this.parent.add(mesh); // register the event


        var onEvent = function onEvent(e) {
          if (e.type == 'click') {
            _this.props.onClick({
              x: _this.props.x,
              y: _this.props.y
            });
          } else if (e.type == 'mouseOver') {
            _this.props.onMouseOver({
              x: _this.props.x,
              y: _this.props.y
            });
          } else if (e.type == 'mouseOut') {
            _this.props.onMouseOut({
              x: _this.props.x,
              y: _this.props.y
            });
          }
        };

        _this.props.context.regCall(mesh, onEvent);
      });

      if (!props.size) {
        _this.size = props.boardSize;
      } else {
        _this.size = props.size;
      }

      if (props.parent) {
        _this.parent = props.parent;
      } else {
        _this.parent = props.context;
      }

      return _this;
    }

    _createClass(TokenImpl, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.parent.remove(this.prevMesh);
      }
    }, {
      key: "render",
      value: function render() {
        var mesh = this.props.mesh;
        if (this.prevMesh && this.prevMesh === mesh) return null;

        if (!mesh) {
          mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1 * 0.3, 1), new THREE.MeshLambertMaterial({
            color: '#eeeeee'
          }));

          this._attachMesh(mesh);
        } else if (mesh.isObject3D) {
          this._attachMesh(mesh);
        } else {
          console.error('Your input to tokens should be an three js 3d object');
        }

        this.parent.remove(this.prevMesh);
        this.prevMesh = mesh;
        return null;
      }
    }]);

    return TokenImpl;
  }(React.Component);

  _defineProperty(TokenImpl, "propTypes", {
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    mesh: PropTypes.any,
    padding: PropTypes.number,
    size: PropTypes.number,
    lift: PropTypes.number,
    boardSize: PropTypes.number,
    parent: PropTypes.instanceOf(THREE.Object3D),
    context: PropTypes.object,
    animate: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    children: PropTypes.element,
    animationDuration: PropTypes.number
  });

  _defineProperty(TokenImpl, "defaultProps", {
    animationDuration: 750,
    size: 1,
    padding: 0.1,
    lift: 0.1
  });

  /*
   * Copyright 2018 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var Token$2 = function Token$$1(props) {
    return props.three ? React.createElement(Token$1, props, props.children) : React.createElement(Token, props, props.children);
  };
  Token$2.propTypes = {
    three: PropTypes.bool,
    children: PropTypes.any
  };

  /*
   * Copyright 2017 The boardgame.io Authors
   *
   * Use of this source code is governed by a MIT-style
   * license that can be found in the LICENSE file or at
   * https://opensource.org/licenses/MIT.
   */
  var MAKE_MOVE = 'MAKE_MOVE';

  var css$3 = "/*\n * Copyright 2017 The boardgame.io Authors\n *\n * Use of this source code is governed by a MIT-style\n * license that can be found in the LICENSE file or at\n * https://opensource.org/licenses/MIT.\n */\n\n.gamelog {\n  display: grid;\n  grid-template-columns: 30px 1fr 30px;\n  grid-auto-rows: auto;\n  grid-auto-flow: column;\n}\n\n.gamelog .turn-marker {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  grid-column: 1;\n  background: #555;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  border: 1px solid #888;\n}\n\n.gamelog .log-event {\n  grid-column: 2;\n  cursor: pointer;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background: #fff;\n  border: 1px dotted #ccc;\n  border-left: 5px solid #ccc;\n  padding: 5px;\n  text-align: center;\n  color: #888;\n  font-size: 14px;\n  min-height: 25px;\n  line-height: 25px;\n}\n\n.gamelog .phase-marker {\n  grid-column: 3;\n  background: #555;\n  border: 1px solid #888;\n  color: #eee;\n  text-align: center;\n  font-weight: bold;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  text-orientation: sideways;\n  writing-mode: vertical-rl;\n  line-height: 30px;\n  width: 100%;\n}\n\n.gamelog.pinned .log-event {\n  opacity: 0.2;\n}\n\n.gamelog .log-event:hover {\n  border-style: solid;\n  background: #eee;\n}\n\n.gamelog .log-event.pinned {\n  border-style: solid;\n  background: #eee;\n  opacity: 1;\n}\n\n.gamelog div.player0 {\n  border-left-color: #ff851b;\n}\n\n.gamelog div.player1 {\n  border-left-color: #7fdbff;\n}\n\n.gamelog div.player2 {\n  border-left-color: #0074d9;\n}\n\n.gamelog div.player3 {\n  border-left-color: #39cccc;\n}\n\n.gamelog div.player4 {\n  border-left-color: #3d9970;\n}\n\n.gamelog div.player5 {\n  border-left-color: #2ecc40;\n}\n\n.gamelog div.player6 {\n  border-left-color: #01ff70;\n}\n\n.gamelog div.player7 {\n  border-left-color: #ffdc00;\n}\n\n.gamelog div.player8 {\n  border-left-color: #001f3f;\n}\n\n.gamelog div.player9 {\n  border-left-color: #ff4136;\n}\n\n.gamelog div.player10 {\n  border-left-color: #85144b;\n}\n\n.gamelog div.player11 {\n  border-left-color: #f012be;\n}\n\n.gamelog div.player12 {\n  border-left-color: #b10dc9;\n}\n\n.gamelog div.player13 {\n  border-left-color: #111111;\n}\n\n.gamelog div.player14 {\n  border-left-color: #aaaaaa;\n}\n\n.gamelog div.player15 {\n  border-left-color: #dddddd;\n}\n";
  styleInject(css$3);

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

  exports.UI = UI$2;
  exports.Card = Card$2;
  exports.Deck = Deck$2;
  exports.Grid = Grid$2;
  exports.HexGrid = HexGrid$2;
  exports.Token = Token$2;
  exports.HexUtils = HexUtils;
  exports.GameLog = GameLog;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
