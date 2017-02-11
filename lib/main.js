'use babel'

import AutocompleteProvider from './autocomplete'

export default {
  activate () {
  },

  getAutocompleteProvider () {
    this.autocomplete = new AutocompleteProvider()
    return this.autocomplete
  }
}
