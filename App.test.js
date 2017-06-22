import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('adds and finds items from trie-search component', () => {
  const app = mount(<App />).node;
  app.add('apple');
  app.add('banana');
  app.add('orange');
  app.add('grape');
  app.add('cherry');
  expect(app.search('a')).toHaveLength(0);
  expect(app.search('ap')).toHaveLength(1);
  expect(app.search('app')).toHaveLength(1);
  expect(app.search('appl')).toHaveLength(1);
  expect(app.search('apple')).toHaveLength(1);
  expect(app.search('ap')[0].label).toEqual('apple');
  app.add('apple pie', 6);
  expect(app.search('a')).toHaveLength(0);
  expect(app.search('ap')).toHaveLength(2);
  expect(app.search('app')).toHaveLength(2);
  expect(app.search('appl')).toHaveLength(2);
  expect(app.search('apple')).toHaveLength(2);
  expect(app.search('apple ')[0].label).toEqual('apple');
  expect(app.search('apple p')[0].label).toEqual('apple');
  expect(app.search('apple pi')).toHaveLength(0);
  expect(app.search('apple pie')).toHaveLength(0);
});

it('renders autocomplete child component, which finds and adds items via the trie-search component', () => {
  const app = mount(<App />)
  const trie = app.find('AutocompleteTrie').node;
  trie.props.add('apple');
  trie.props.add('banana');
  trie.props.add('orange');
  trie.props.add('grape');
  trie.props.add('cherry');
  expect(trie.props.currentMatches('a')).toHaveLength(0);
  expect(trie.props.currentMatches('ap')).toHaveLength(1);
  expect(trie.props.currentMatches('app')).toHaveLength(1);
  expect(trie.props.currentMatches('appl')).toHaveLength(1);
  expect(trie.props.currentMatches('apple')).toHaveLength(1);
  expect(trie.props.currentMatches('ap')[0].label).toEqual('apple');
  trie.props.add('apple pie', 6);
  expect(trie.props.currentMatches('a')).toHaveLength(0);
  expect(trie.props.currentMatches('ap')).toHaveLength(2);
  expect(trie.props.currentMatches('app')).toHaveLength(2);
  expect(trie.props.currentMatches('appl')).toHaveLength(2);
  expect(trie.props.currentMatches('apple')).toHaveLength(2);
  expect(trie.props.currentMatches('apple ')[0].label).toEqual('apple');
  expect(trie.props.currentMatches('apple p')[0].label).toEqual('apple');
  expect(trie.props.currentMatches('apple pi')).toHaveLength(0);
  expect(trie.props.currentMatches('apple pie')).toHaveLength(0);
});

it('renders an input box with a default value initialized to match the 1st item on the list', () => {
  const app = mount(<App />)
  const trie = app.find('AutocompleteTrie');
  let input = app.find('input').node;
  let defaultItem = trie.node.props.defaultValue;
  expect(input.value).toEqual(defaultItem.label);
});

it('renders a list of multiple search results, each result has a prefix equals to the input box value', () => {
});

it('renders a list of exactly one search result, the result has a prefix equals to the input box value, and the trie-search component was initialized to have the result as the only item with the matching prefix', () => {
});

it('renders a list of exactly one search result, the result matches the entire word of the input box value', () => {
});

it('renders a list of multiple search results, where exactly one of the results match the entire word of the input box value, and one or more of the results are partial prefix matches', () => {
});

it('renders a list of multiple search results, the results do not include any items that are partial suffic matches, and the trie-search component was initialized to have one or more of those suffix-matching items', () => {
});

it('renders an empty list of search results when the trie-search component finds no partial prefix matches to the input box value', () => {
});

it('renders an empty list of search results when the input box is empty', () => {
});

it('renders an input box with a value equals to a highlighted item on a list when a TAB key is pressed', () => {
});

it('renders an input box with a same unchanged value when an UP/DOWN arrow key is pressed to scroll a list', () => {
});

it('renders a list with an increment of one additional item when an ENTER key is pressed, where the one additional item equals to the input box value, and size of the list has not exceeded a maximum display threshold defined in the autocomplete component', () => {
});

it('renders a list with a same number of search results when an ENTER key is pressed, where the one additional item added as a result of the key pressing is not shown on the list, and size of the list has already reached a maximum display thresdhold defined in the autocomplete component', () => {
});

it('renders a list with a same number of search results when an ENTER key is pressed, where the trie-search component finds an existing item matches the input box value, and no new item creation as a result`', () => {
});
