import React from 'react'
import {Entity} from 'draft-js'


class PrefaceTextarea extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
          content: props.content,
          styleHeight: {height: 43},
          isShowPreface: props.isShowPreface || 'none'
      }
    }

    onKeyPress = e => {
      if (e.charCode == 13) {
        e.preventDefault()
      }
    }

    onKeyUp = e => {
        if(this.state.content && this.state.content.gblen() > 70) {
            this.setState({styleHeight: {height: 66}})
        } else {
            this.setState({styleHeight: {height: 43}})
        }
    }

    onChange = e => {
        this.setState({content: e.target.value})
    }

    toggle = () => {
        if(this.state.isShowPreface && this.state.isShowPreface === 'none') {
            console.log('1')
            this.setState({isShowPreface: 'block'})
        } else {
            console.log('2')
            this.setState({isShowPreface: 'none', content: '1'})
        }
    }

    render() {
        return <div className="db-preface" style={{display: this.state.isShowPreface}}>
            <span>
                <textarea className="db-preface-textarea"
                    tabIndex="2"
                    maxLength="140"
                    onKeyPress={this.onKeyPress}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                    placeholder={this.props.placeholder}
                    style={this.state.styleHeight}
                    defaultValue={this.state.content}
                    rows="1"></textarea>
            </span>
        </div>
    }
}

module.exports = {
    PrefaceTextarea: PrefaceTextarea
}
