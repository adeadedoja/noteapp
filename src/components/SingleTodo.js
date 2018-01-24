import React from 'react';
import moment from 'moment';

export default class SingleTodo extends React.Component {
    render() {
        return (
            <li className="pt-3 pb-3">
                <div className="row">
                    <div className="col-9">
                        <label className="bold dark m-0 p-0">{this.props.text} - {this.props.isDone? " - DONE": ""}</label>
                        <p className="m-0 p-0">{moment.utc(this.props.date).local().format('hh:mm A')}</p>
                    </div>
                    <div className="col-3">
                        <input 
                            data-id={this.props.todoId} 
                            checked={this.props.isDone} 
                            onChange={this.props.archiveToggleTodo} 
                            type="checkbox"
                        />
                        <button 
                            data-id={this.props.todoId} 
                            onClick={this.props.removeTodo}>
                                Delete
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}