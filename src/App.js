import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import TextArea from './TextArea';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is the state txt',
      cat: 0
    };

    this.update = this.update.bind(this);
    this.mount = this.mount.bind(this);
  }
  update(e) {
    this.setState({ txt: e.target.value });
  }
  mount() {
    ReactDOM.render(<LifeCycles />, document.getElementById('a'));
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }
  render() {
    return (
      <div>
        <Title text={this.state.txt} />
        <Widget update={this.update} />
        <Button>I <Heart /> React</Button>
        <TextArea />
        <hr />
        <RefExample />
        <hr />
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>UnMount</button>
        <div id="a"></div>
      </div>
    );
  }
}

App.propTypes = {
  txt: PropTypes.string,
  cat: PropTypes.number.isRequired
};

App.defaultProps = {
  txt: 'this is the default txt'
};

const Title = (props) =>
  <h1>Title: {props.text}</h1>

Title.propTypes = {
  text(props, propName, component) {
    if (!(propName in props)) {
      return new Error(`missing ${propName}`);
    }
    if (props[propName].length < 6) {
      return new Error(`${propName} was too short`);
    }
  }
};

const Widget = (props) =>
  <input type="text" onChange={props.update} />

const Button = (props) =>
  <button>{props.children}</button>

const Heart = (props) =>
  <span>&hearts;</span>

class RefExample extends React.Component {
  constructor() {
    super();
    this.state = {
      a: '',
      b: '',
      counter: 0
    };

    this.update = this.update.bind(this);
    this.increase = this.increase.bind(this);
  }
  update() {
    this.setState({
      a: this.a.refs.input.value,
      b: this.b.value
    });
  }
  increase() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  render() {
    return (
      <div>
        <Input
        ref={ component => this.a = component }
        type="text"
        update={this.update} />
        {this.state.a}
        <input
        ref={ n => this.b = n }
        type="text"
        onChange={this.update} />
        {this.state.b}
        <Counter val={this.state.counter} />
        <button onClick={this.increase}>Increase</button>
        <hr />
        <List />
      </div>
    )
  }
}

class Input extends React.Component {
  render() {
    return <div><input type="text" ref="input" onChange={this.props.update} /></div>
  }
}

class LifeCycles extends React.Component {
  constructor() {
    super();
    this.state = { val: 0 };
    this.update = this.update.bind(this);
  }
  update() {
    this.setState({ val: this.state.val + 1 });
  }
  componentWillMount() {
    console.log('component will mount');
  }
  componentDidMount() {
    console.log('component did mount');
  }
  componentWillUnmount() {
    console.log('component will unmount');
  }
  render() {
    return <button onClick={this.update}>{this.state.val}</button>;
  }
}

class Counter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val % 5 === 0;
  }
  render() {
    return <span>{this.props.val}</span>
  }
}

Counter.defaultProps = {
  val: 0
};

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [
        'React',
        'Angular.js',
        'Vue.js',
        'Ember.js'
      ],
      filter: ''
    };

    this.filter = this.filter.bind(this);
  }
  filter(e) {
    this.setState({ filter: e.target.value });
  }
  render() {
    let items = this.state.items.filter(item => {
      return item.toLowerCase().includes(this.state.filter.toLowerCase());
    });

    return (
      <div>
        Search! <input type="text" onChange={this.filter} />
        <table>
          <tbody>{items.map(item => <Item name={item} /> )}</tbody>
        </table>
      </div>
    );
  }
}

const Item = (props) => <tr key={props.name}><td>{props.name}</td></tr>;

export default App;
