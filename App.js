import React, { Component } from 'react';
import './App.css';
import TrieSearch from 'trie-search';
import Autocomplete from './PureReactAutocomplete';

const AutocompleteTrie = (props) =>
  <Autocomplete {...props} className="AutocompleteTrie" />

class App extends Component {
  constructor(props) {
    super(props);

    this.ts3 = new TrieSearch('key', {min: 2});

    this.add('item1!');
    this.add('item2!');
  }

  contains = (text) => {
    return this.search(text).length > 0;
  }

  search = (text) => {
    return this.ts3.get(text);
  }

  add = (text) => {
    if (this.contains(text)) {
      return false;
    } else {
      this.ts3.add({label: text, value: text}, ['label']);
      return true;
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-intro">
          <AutocompleteTrie currentMatches={this.search} add={this.add} defaultValue={''} />
        </div>
      </div>
    );
  }
}

export default App;
