import React, { Component } from 'react';
// import logo from './logo.svg';
import JSONEditorReact from './components/JSONEditorReact';
import './App.css';
import fetch from 'isomorphic-fetch';
import Plot from 'react-plotly.js';


const schema = {
  title: 'Example Schema',
  type: 'object',
  properties: {
    array: {
      type: 'array',
      items: {
        type: 'number'
      }
    },
    boolean: {
      type: 'boolean'
    },
    number: {
      type: 'number'
    }
  },
  required: ['array', 'string', 'boolean']
};

const json = {
  'array': [1, 2, 3],
  'boolean': true,
  'null': null,
  'number': 'four',
  'object': { 'a': 'b', 'c': 'd' },
  'string': 'Hello World'
};

const modes = ['tree', 'form', 'view', 'code', 'text'];

class App extends Component {
  state = {
    schema,
    text: JSON.stringify(json, null, 2),
    mode: 'tree',
    data: [
      {
        x: [1, 2, 3],
        y: [2, 5, 3],
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'red' },
      },
      { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
    ],
    layout: { width: 320, height: 240, title: 'A Fancy Plot' },
    frames: [],
    config: {}
  };

  render() {
    return (
      <div className="app">
        <h1>JSONEditor React advanced demo</h1>
        <div className="contents">
          <div className="mode">
            mode: <select value={this.state.mode} onChange={this.onModeChangeSelect}>
              {
                modes.map(mode => <option key={mode} value={mode}>{mode}</option>)
              }
            </select>
          </div>
          <JSONEditorReact
            schema={this.state.schema}
            text={this.state.text}
            mode={this.state.mode}
            modes={modes}
            indentation={4}
            onChangeText={this.onChangeText}
            onModeChange={this.onModeChange}
          />
          <div className="code">
            <pre>
              <code>
                {this.state.text}
              </code>
            </pre>
          </div>
          <div className="plot">
            <Plot
              data={this.state.data}
              layout={this.state.layout}
              frames={this.state.frames}
              config={this.state.config}
              onInitialized={(figure) => this.setState(figure)}
              onUpdate={(figure) => this.setState(figure)}
            />
          </div>
        </div>
      </div>
    );
  }

  onChangeText = (text) => {
    this.setState({ text });
  };

  onModeChangeSelect = (event) => {
    this.setState({ mode: event.target.value });
  };

  onModeChange = (mode) => {
    this.setState({ mode });
  };
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//          <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

