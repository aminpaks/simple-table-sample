import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Column } from './components/table';
import './styles.css';

const items = Array(300)
  .fill(0)
  .map((_, idx) => ({
    id: idx + 1,
    title: `item ${idx + 1}`,
    price: 100 + idx ** 2
  }));

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Table data={items}>
        <Column title="Title" value="title" />
        <Column title="Price" value="price" />
      </Table>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
