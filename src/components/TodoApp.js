import React from 'react';
import VisibleTodoList from './VisibleTodoList';
import { Calendar } from 'react-calendar-component';
import moment from 'moment';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import logo from '.././img/logo.png'
export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.visibilityFilters = ["ALL_TODOS", "LEFT_TODOS", "COMPLETED_TODOS"]
        this.state = {
            todos: this.props.dataInterface.getAllTodos(),
            visibilityFilter: "ALL_TODOS",
            today: moment(),
            date: moment(),
            showing: false
        };
        this.date = moment();
    }

    addTodo = () => {
        if (this._todoInputField.value) {
            this.props.dataInterface.addTodo(this._todoInputField.value,this._todoInputField2.value);
            this.setState({todos: this.props.dataInterface.getAllTodos()});
            this.setState({date:  moment(this._todoInputField2.value)});
            this._todoInputField.value = '';
            this._todoInputField2.value = '';
        }
    }

    archiveToggleTodo = e => {
        this.props.dataInterface.archiveToggleTodo(e.target.dataset.id);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
        this.setState({date:  this.props.dataInterface.getTodoDate(e.target.dataset.id)});
    }

    removeTodo = e => {
        this.props.dataInterface.removeTodo(e.target.dataset.id);
        this.setState({todos: this.props.dataInterface.getAllTodos()});
        localStorage.setItem('curdate', JSON.stringify(this.date));
        this.setState({date:  moment(JSON.parse(localStorage.getItem('curdate') || '{}'))});
    }

    changeVisibilityFilter = e => {
        const dd = this.state.date;
        this.setState({visibilityFilter: e.target.dataset.id});
        this.setState({date:  this.state.date});
        console.log(dd);
    }

    changeShowing = e => {        
        const { showing } = this.state;
        //const { date } = this.date;
        localStorage.setItem('curdate', JSON.stringify(this.date));
        this.setState({ showing: !showing });
        this.setState({date:  moment(JSON.parse(localStorage.getItem('curdate') || '{}'))});
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

    changeDate = () => {

    }

    filterTodos = () => {
        return this.visibleTodos().filter(todo => todo.day === this.state.date.format('DD'));
    }

    render() {

        let visibleTodos = this.visibleTodos();
        let filterTodos = this.filterTodos();
        const { showing } = this.state;
        
        return (
            <div>
                <div className="topMenu">
                    <div className="row">
                        <div className="col-md-6 "><img src={logo} /></div>
                        <div className="col-md-6 text-right">
                        <FontAwesome
                        className='super-crazy-colors'
                        name='cog'
                        size='2x'
                        spin
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                      />
                
                        </div>
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
                           {/* <div className="pb-4">                                
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
                            </div>         */}
                             <div className="row">
                                    <div className="col-1"><h2 className="m-0 p-0">{this.state.date.format('DD')}</h2></div>
                                    <div className="col-8 ml-1 mt-0">
                                        <p className="m-0 p-0 bold dark">{this.state.date.format('dddd')}</p>
                                        <p className="m-0 p-0">{this.state.date.format('MMMM')}, {this.state.date.format('YYYY')}</p>
                                    </div>
                                    <div className="col-3"></div>
                                </div> 
                            <VisibleTodoList
                                visibleTodos={filterTodos}
                                visibilityFilter = {this.state.visibilityFilter}
                                archiveToggleTodo={this.archiveToggleTodo}
                                removeTodo={this.removeTodo}
                            />
                              
                            
                            <button className="btn btn-block btn-pink" onClick={this.changeShowing}>Add New Task</button>             
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