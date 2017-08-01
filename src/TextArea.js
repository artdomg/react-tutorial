import React from 'react';

class TextArea extends React.Component {
  constructor() {
    super();
    this.state = {
      currentEvent: '---'
    };
    this.update = this.update.bind(this);
  }
  update(e) {
    this.setState({
      currentEvent: e.type
    });
  }
  render() {
    // Synthetic Events
    // https://facebook.github.io/react/docs/events.html
    return (
      <div>
        <textarea
          onKeyPress={this.update}
          onKeyDown={this.update}
          onKeyUp={this.update}
          onCopy={this.update}
          onCut={this.update}
          onPaste={this.update}
          onFocus={this.update}
          onBlur={this.update}
          onClick={this.update}
          onDoubleClick={this.update}
          onTouchStart={this.update}
          onTouchMove={this.update}
          onTouchEnd={this.update}
          cols="30"
          rows="10" />
          <h3>{this.state.currentEvent}</h3>
      </div>
    );
  }
}

export default TextArea;
