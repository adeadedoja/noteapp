import React from 'react';
import VisibleTodoList from './VisibleTodoList';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';

export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.visibilityFilters = ["ALL_TODOS", "LEFT_TODOS", "COMPLETED_TODOS"]
        this.state = {
            todos: this.props.dataInterface.getAllTodos(),
            visibilityFilter: "ALL_TODOS",
            date: moment(),
            showing: false
        };
    }

    addTodo = () => {
        if (this._todoInputField.value) {
            this.props.dataInterface.addTodo(this._todoInputField.value,this._todoInputField2.value);
            this.setState({todos: this.props.dataInterface.getAllTodos()});
            this._todoInputField.value = '';
            this._todoInputField2.value = '';
        }
    }

    archiveToggleTodo = e => {
        this.props.dataInterface.archiveToggleTodo(e.target.dataset.id);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
    }

    removeTodo = e => {
        this.props.dataInterface.removeTodo(e.target.dataset.id);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
    }

    changeVisibilityFilter = e => {
        this.setState({visibilityFilter: e.target.dataset.id});
    }

    visibleTodos = () => {
        switch (this.state.visibilityFilter) {
            case "ALL_TODOS":
                return this.state.todos;
            case "LEFT_TODOS":
                return this.state.todos.filter(todo => todo.isDone === false);
            case "COMPLETED_TODOS":
                return this.state.todos.filter(todo => todo.isDone === true);
            default:
                return this.state.todos;
        }
    }

    render() {

        let visibleTodos = this.visibleTodos();
        const { showing } = this.state;
        
        return (
            <div>
                <div className="topMenu">
                    <div className="row">
                        <div className="col-md-6 "><a className="bold2">Se</a></div>
                        <div className="col-md-6 text-right">dd</div>
                    </div>
                </div>
                <div className="cont">
                    <div className="row">
                        <div className="col-md-6 pad">
                        <Calendar
                                onChangeMonth={date => this.setState({ date })}
                                date={this.state.date}
                                onPickDate={date => this.setState({ date })}
                            />
                        </div>
                        <div className="col-md-6 pad rightpad">                          
                            <div className="pb-4">                                
                                {
                                    this.visibilityFilters.map(
                                        visibilityFilter =>
                                            <button 
                                                className="newbutton"
                                                key={visibilityFilter} 
                                                onClick={this.changeVisibilityFilter} 
                                                data-id={visibilityFilter}>
                                                    {visibilityFilter.replace("_", " ")}
                                            </button>
                                    )
                                }
                            </div>         
                            <div className="row pb-1">
                                <div className="col-1"><h1 className="m-0 p-0">{this.state.date.format('DD')}</h1></div>
                                <div className="col-8 ml-3 mt-1">
                                    <p className="m-0 p-0 bold dark">{this.state.date.format('dddd')}</p>
                                    <p className="m-0 p-0">{this.state.date.format('MMMM')}, {this.state.date.format('YYYY')}</p>
                                </div>
                                <div className="col-3"></div>
                            </div>  
                            <VisibleTodoList
                                visibleTodos={visibleTodos}
                                visibilityFilter = {this.state.visibilityFilter}
                                archiveToggleTodo={this.archiveToggleTodo}
                                removeTodo={this.removeTodo}
                            />
                              
                            
                            <button className="btn btn-block btn-pink" onClick={() => this.setState({ showing: !showing })}>Add New Task</button>             
                            <div className="pt-2 pb-2" style={{ display: (showing ? 'block' : 'none') }} >
                                <textarea
                                    className="form-control pb-1"
                                    type="text"
                                    placeholder="What do you want todo?"
                                    ref={(c => this._todoInputField = c)}
                                />
                                <input
                                    className="form-control mt-1"
                                    type="datetime-local"
                                    placeholder="What do you want todo2?"
                                    ref={(c => this._todoInputField2 = c)}
                                />
                                <button className="btn btn-primary btn-sm mt-1" onClick={this.addTodo}>Add Todo</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}