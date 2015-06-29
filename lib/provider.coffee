fs = require 'fs'
path = require 'path'

module.exports =
  selector: '.source.mathematica'
  disableForSelector: '.source.mathematica .comment, .source.mathematica .string'
  filterSuggestions: true

  loadCompletions: ->
    @symbols = {}
    fs.readFile path.resolve(__dirname, '..', 'completions.json'), (error, content) =>
      {@symbols} = JSON.parse(content) unless error?
      return

  getSuggestions: ({bufferPosition, editor, prefix}) ->
    completions = []
    if prefix
      for symbolInfo in @symbols when firstCharsEqual(symbolInfo.name, prefix)
        completions.push(@buildCompletion(symbolInfo))
    completions

  buildCompletion: (symbolInfo) ->
    type: 'builtin'
    text: symbolInfo.name
    rightLabel: symbolInfo.context
    description: symbolInfo.description
    descriptionMoreURL: symbolInfo.help_link

firstCharsEqual = (str1, str2) ->
  str1[0].toLowerCase() is str2[0].toLowerCase()
