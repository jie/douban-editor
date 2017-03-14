import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DoubanEditor } from 'douban-editor';


class MyDoubanEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="container">
            <DoubanEditor titlePlaceholder={'添加标题...'} placeholder={'写文章...'}/>
        </div>
    }
}

ReactDOM.render(<MyDoubanEditor />, document.getElementById('target'));
