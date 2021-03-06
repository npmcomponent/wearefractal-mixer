// Generated by CoffeeScript 1.5.0
(function() {
  var EventEmitter, Module, mixer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (typeof process !== "undefined" && process !== null) {
    EventEmitter = require('events').EventEmitter;
  } else {
    EventEmitter = require('component-emitter');
  }

  Module = (function(_super) {

    __extends(Module, _super);

    function Module(o) {
      this._props = {};
      this.set(o);
    }

    Module.prototype.get = function(k) {
      return this._props[k];
    };

    Module.prototype.getAll = function() {
      return this._props;
    };

    Module.prototype.set = function(k, v, silent) {
      var ky, vy;
      if (k == null) {
        return;
      }
      if (typeof k === 'object') {
        silent = v;
        for (ky in k) {
          vy = k[ky];
          this.set(ky, vy, silent);
        }
        return this;
      } else {
        this._props[k] = v;
        if (!silent) {
          this.emit("change", k, v);
          this.emit("change:" + k, v);
        }
        return this;
      }
    };

    Module.prototype.clear = function(silent) {
      var k, v, _ref;
      _ref = this._props;
      for (k in _ref) {
        v = _ref[k];
        this.remove(k, silent);
      }
      return this;
    };

    Module.prototype.has = function(k) {
      return this._props[k] != null;
    };

    Module.prototype.remove = function(k, silent) {
      delete this._props[k];
      if (!silent) {
        this.emit("change", k);
        this.emit("change:" + k);
        this.emit("remove", k);
        this.emit("remove:" + k);
      }
      return this;
    };

    Module.prototype.toJSON = function() {
      return this.getAll();
    };

    return Module;

  })(EventEmitter);

  mixer = {
    Module: Module,
    Emitter: EventEmitter
  };

  module.exports = mixer;

}).call(this);
