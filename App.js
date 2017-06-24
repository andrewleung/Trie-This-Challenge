import React, { Component } from 'react';
import './App.css';
import Autocomplete from './PureReactAutocomplete';

class TrieSearch {
  constructor() {
    //each node (i.e. hash) stores a copy of matches for performance reason, to avoid traversing when searchin for matches subsequently
    this.node = { matches: [] }
  }

  //main method in response to the Trie This Challenge
  //returns true if the trie contains word and false if it does not.
  contains(text) {
    return this.search(text).length > 0;
  }

  //main method in response to the Trie This Challenge
  //returns the list of all words in the trie that begin with prefix.
  search(text) {
    //extend 'base' method to provide search support per specification
    this.nextNotMatching = function(hash, i, text) {
      if (text.length > i) {
        return [];
      } else {
        return hash['matches'];
      }
    };
    return this.iterate(this.node, 0, text);
  }

  //main method in response to the Trie This Challenge
  //adds word to the trie, returning true if the word was successfully added and false if the word was already present.
  add(text) {
    //extend 'base' method to optimize performance by caching matching results
    this.origNextMatching = this.nextMatching;
    this.nextMatching = function(hash, i, text) {
      this.origNextMatching(hash, i, text);
      if (this.isWordAdded) {
        hash['matches'].push(text);
      }
    };

    //extend 'base' method to create new nodes
    this.origNextNotMatching = this.nextNotMatching;
    this.nextNotMatching = function(hash, i, text) {
      this.textToTrie(hash, i, text);
      return this.origNextNotMatching(hash, i, text);
    };

    this.iterate(this.node, 0, text);
    this.nextMatching = this.origNextMatching;
    this.nextNotMatching = this.origNextNotMatching;
    return this.isWordAdded;
  }

  //private method
  iterate(hash, i, text) {
    if ((text.length > 0) && (text[i] in hash)) {
      return this.nextMatching(hash, i, text);
    } else {
      return this.nextNotMatching(hash, i, text);
    }
  }

  //private method
  nextMatching(hash, i, text) {
    return this.iterate(hash[text[i]], i+1, text);
  }

  //private method
  nextNotMatching(hash, i, text) {
    return hash;
  }

  //private method for creating new nodes
  textToTrie(hash, i, text) {
    if ((text.length > i) && (text[i] != null)) {
      let child = { matches: [] };
      hash[text[i]] = child;
      this.textToTrie(child, i+1, text);
    } else {
      //'word' is an internal indicator to mark boundary; to assist subsequent searches for matching of an entire word
      if (hash['word']) {
        this.isWordAdded = false;
      } else {
        hash['word'] = text;
        this.isWordAdded = true;
      }
    }
    if (this.isWordAdded) {
      hash['matches'].push(text);
    }
  }
}

const AutocompleteTrie = (props) =>
  <Autocomplete {...props} className="AutocompleteTrie" />

class App extends Component {
  constructor(props) {
    super(props);

    this.ts3 = new TrieSearch();
    this.ts3.add('item1!');
    this.ts3.add('item2!');
  }

  contains = (text) => {
    return this.ts3.contains(text);
  }

  search = (text) => {
    return this.ts3.search(text).map(function(x) {
      return {label: x, value: x};
    })
  }

  add = (text) => {
    if (this.contains(text)) {
      return false;
    } else {
      this.ts3.add(text);
      return true;
    }
  }
    
  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-intro">
          <AutocompleteTrie currentMatches={this.search} add={this.add} defaultValue={this.search('item1!')[0]} />
        </div>
      </div>
    );
  }
}

export default App;
