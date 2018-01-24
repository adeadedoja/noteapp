import React from 'react';
import SingleTodo from './SingleTodo';

export default class VisibleTodoList extends React.Component {
    render() {
        return (
            <div>
            {/*<h3>{this.props.visibilityFilter.replace("_", " ")}</h3>*/}
            {this.props.visibleTodos.length > 0?
                (
                    <ul className="pt-1 listnew">
                        {this.props.visibleTodos.map(
                            (todo) =>
                                <SingleTodo
                                    key={todo.id}
                                    todoId={todo.id}
                                    text={todo.descriptionText}
                                    date={todo.todoDate}
                                    isDone={todo.isDone}
                                    archiveToggleTodo={this.props.archiveToggleTodo}
                                    removeTodo={this.props.removeTodo}
                                />
                        )}
                    </ul>
                ):
                (
                    "No Todos to show"
                )
            }
            </div>
        );
    }
}