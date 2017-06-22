import React, { Component } from 'react';
import './PureReactAutocomplete.css';
import PropTypes from 'prop-types';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: props.defaultValue,
      highlightedValue: props.defaultValue,
      showItems: false
    };
  }

  render() { 
    return <div>
      <input
        ref={(element) => { this.input = element; }}
        onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onInputClick}
         />
      {this.state.showItems?
         <ol style={{position: 'absolute', width:'100%', backgroundColor:'white', color:'black', listStyle: 'none', padding: 0, margin: 0}}
            onMouseLeave={this.onMouseLeave}>
           {this.renderMatches()}
         </ol>:
         null}
    </div>;
  }

  renderMatches = () => {
    return this.currentMatches()
      .map(function(item, i){
        return <AutocompleteItem highlighted={item.value === this.state.highlightedValue.value}
          key={i} label={item.label} value={item.value}
          onItemClick={this.onItemClick}
          onItemMouseOver = {this.onItemMouseOver} />
      }.bind(this));
  }

  currentMatches = () => {
    return this.props.currentMatches(this.input.value).slice(0, this.props.maxItemsShown);
  }

  addInputToMatches = () => {
    this.props.add(this.input.value);
  }

  highlightedIndex = () => {
    return (this.currentMatches())
      .findIndex( (item) => {
        return item.value === this.state.highlightedValue.value;
      }, this);
  }

  componentDidUpdate = () => {    
    this.setInputFromValue();
    this.input.focus();
  }

  componentDidMount = () => {
    this.setInputFromValue();

    document.onkeydown = function(e){
      switch (e.keyCode){
        case 13: // enter
          this.addInputToMatches();
          this.setValueFromInput();       
          break;
        case 9: // tab
          this.setFromHighlighted();
          break;
        case 27: // escape
          
          break;
        case 38: {// up
          let hIndex = this.highlightedIndex();
          if (hIndex > 0){
            this.setState({highlightedValue: this.currentMatches()[hIndex - 1]});
          }      
          break;
        }
        case 40: {// down
          let hIndex = this.highlightedIndex();
          if (hIndex < this.currentMatches().length - 1){
            this.setState({highlightedValue: this.currentMatches()[hIndex + 1]});
          }
          break;
        }
        default:
      }
    }.bind(this);
    this.highlightedIndex();
  }

  setInputFromValue = () => {
    this.input.value = this.state.currentValue.label;
  }

  //called by onChange only, triggered by editing textbox
  setValueFromInput = () => {
    var inputText = this.input.value;
    var foundItems = this.currentMatches();
    if (foundItems.length > 0) {
      let foundItem = foundItems[0];
      if (inputText === foundItem.value) {
        //exact match
        this.setState({
          //if match prefix, don't change current value, wait until enter or tab or click
          currentValue: foundItem, highlightedValue: foundItem
        });
      } else {
        //prefix
        this.setState({
          //if match prefix, don't change current value, wait until enter or tab or click
          currentValue: {label: inputText, value: inputText }, highlightedValue: foundItem
        });
      }
    } else {
      this.props.onNoMatch(this.state);
      this.setState({
        currentValue: { label: inputText, value: inputText }, highlightedValue: this.props.defaultValue
      });
    }
  }

  setFromHighlighted = () => {
    this.setState({
      currentValue: this.state.highlightedValue
    });
  }

  onChange = () => {
    this.setValueFromInput();
  }

  onFocus = () => {
    this.setState({ showItems: true });
  }

  //called when click on list
  onBlur = () => {
    this.setFromHighlighted();
    this.setState({ showItems: true });
  }

  onItemClick = (item) => {
    this.setState({
      currentValue: item
    });
  }

  onItemMouseOver = (item) => {
    this.setState({ highlightedValue: item });
  }

  onMouseLeave = (item) => {
    this.setState((prevState, props) => { 
      return {highlightedValue: prevState.currentValue}
    });
  }

  onInputClick = () => {
    this.input.select();
  }
}

Autocomplete.propTypes = {
  className: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
  currentMatches: PropTypes.func.isRequired
};

Autocomplete.defaultProps = {
      maxItemsShown: 8,
      sourceUrl: null,
      defaultList: [
        { value: 1, label: 'apple' },
        { value: 2, label: 'banana' },
        { value: 3, label: 'orange' },
        { value: 4, label: 'grape' } ,
        { value: 5, label: 'cherry' } ,
        { value: 'orange' } ,
        { label: 'watermelon' }
      ],
      get defaultValue() { return this.defaultList[1] },
      get currentMatches() { this.defaultList.get(this.input.text)
        .filter( (item) => {
          return item.label.indexOf(this.input.text) > -1;
        })
      },
      alsoSearchValues: false,
      loadUrlOnce: true,
      selectAllTextOnClick: true,
      onNoMatch: function(){}
}

class AutocompleteItem extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    return <li 
      style={{backgroundColor: this.props.highlighted? 'hsl(90,50%,50%)':'', zIndex: 9999}}
      onMouseDown={this.onClick} onMouseOver={this.onMouseOver}>{this.props.label}
    </li>;
  }

  onClick = () => {
    if (this.props.selectAllTextOnClick){
      this.props.onItemClick(this.props);      
    }
  }

  onMouseOver = () => {
    this.props.onItemMouseOver(this.props);
  }
}

AutocompleteItem.defaultProps = {
  value: null, label: null,
  onItemClick: function(){}, onItemMouseOver: function(){}, onItemMouseLeave: function(){}
};

export default Autocomplete;
