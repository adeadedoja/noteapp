import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import 'font-awesome/css/font-awesome.min.css';
import TodoDataInterface from './lib/TodoDataInterface';
import TodoApp from './components/TodoApp';

const todoDataInterface = new TodoDataInterface();
ReactDOM.render(
  <TodoApp dataInterface={todoDataInterface}/>, 
  document.getElementById('app')
);