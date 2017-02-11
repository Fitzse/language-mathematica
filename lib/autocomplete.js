'use babel'

import fs from 'fs'
import path from 'path'
import _ from 'underscore-plus'
import {filter} from 'fuzzaldrin'

export default class AutocompleteProvider {
  constructor () {
    this.selector = '.source.mathematica'
    this.disableForSelector = '.source.mathematica .comment, .source.mathematica .string'
    this.filterSuggestions = true
    this.inclusionPriority = 0
    this.suggestionPriority = 1
    this.loadCompletions()
  }

  loadCompletions () {
    fs.readFile(path.resolve(__dirname, '..', 'completions.json'), (error, content) => {
      if (error) {
        atom.notifications.addError('Unable to load mathematica autocomplete list', {detail: error})
      } else {
        this.completionMap = JSON.parse(content)
        this.symbols = _.keys(this.completionMap)
      }
    })
  }

  getSuggestions ({bufferPosition, editor, prefix}) {
    if (prefix.length < 3) {
      return []
    }
    const symbols = filter(this.symbols, prefix, {maxResults: 3})
    return _.map(symbols, (symbol) => {
      return this.completionMap[symbol]
    })
  }
}
