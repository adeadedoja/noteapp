import Todo from './Todo';
import { findIndex } from 'lodash';
import moment from 'moment';

export default class TodoDataInterface {
    constructor() {
        this.todos = [];
        this.addTodo("Call Dami",moment());
        this.addTodo("Tell Dami to go to school", moment());
    }

    addTodo(descriptionText, todoDate) {
        const newTodo = new Todo(descriptionText, todoDate);
        this.todos.push(newTodo);
        return newTodo;
    }

    archiveToggleTodo(todoId) {
        const todoIndex = findIndex(this.todos, (todo) => todo.id === todoId);
        if (todoIndex > -1) {
            this.todos[todoIndex].isDone = !this.todos[todoIndex].isDone
        }
    }

    removeTodo(todoId) {
        const todoIndex = findIndex(this.todos, (todo) => todo.id === todoId);
        if (todoIndex > -1) {
            this.todos.splice(todoIndex, 1);
        }
    }

    getAllTodos() {
        return this.todos.map(todo => todo);
    }

    
    getTodoDate(todoId) {
        const todoIndex = findIndex(this.todos, (todo) => todo.id === todoId);
        return moment(this.todos[todoIndex].todoDate);
    }
}