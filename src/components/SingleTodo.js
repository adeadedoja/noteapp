import React from 'react';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

export default class SingleTodo extends React.Component {


    render() {
        return (
            <li className="pt-3 pb-3" style={{ opacity: (this.props.isDone ? 0.3 : 1) }}>
                <div className="row">
                    <div className="col-9">
                        <label className="bold dark m-0 p-0">{this.props.text}</label>
                        <p className="m-0 p-0">{moment.utc(this.props.date).local().format('hh:mm A | dddd, DD MMMM YYYY')}</p>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-6">
                            <div className="round">
                                <input 
                                    data-id={this.props.todoId} 
                                    checked={this.props.isDone} 
                                    onChange={this.props.archiveToggleTodo} 
                                    type="checkbox"
                                    id="checkbox"
                                />
                                </div>
                            </div>
                            <div className="col-6">
                                <FontAwesome
                                className='super-crazy-colors'
                                name='trash-o'
                                size='2x'
                                data-id={this.props.todoId} 
                                    onClick={this.props.removeTodo}
                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}