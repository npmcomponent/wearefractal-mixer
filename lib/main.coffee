if process?
  {EventEmitter} = require 'events'
else
  EventEmitter = require 'emitter'

class Module extends EventEmitter
  constructor: (o) ->
    @_ = props: {}
    @set o if o?

  get: (k) -> @_.props[k]
  getAll: -> @_.props

  set: (k, v, silent) ->
    return unless k?
    if typeof k is 'object'
      @set ky, v for ky,v of k
      return @
    else
      return unless v?
      @_.props[k] = v
      unless silent
        @emit "change", k, v
        @emit "change:#{k}", v
      return @

  has: (k) -> @_.props[k]?

  remove: (k, silent) -> 
    delete @_.props[k]
    unless silent
      @emit "change", k
      @emit "change:#{k}"

      @emit "remove", k
      @emit "remove:#{k}"
    return @

  toJSON: -> @_

mixer =
  Module: Module
  Emitter: EventEmitter

module.exports = mixer