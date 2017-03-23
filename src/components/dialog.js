import React from 'react'
import {Entity} from 'draft-js'


class BeanLinkDialog extends React.Component {

    static defaultProps = {
        title: '插入链接',
        submitLabel: '确定',
        textPlaceholder: '文字',
        linkPlaceholder: '链接'
    }

    constructor(props) {
      super(props)
      this.state = {
          text: props.text,
          link: props.link,
          isVisiable: false
      }
    }

    insertLink =()=> {
        if(this.props.insertLink) {
            this.props.insertLink({
                text: this.state.text,
                link: this.state.link
            })
        }
    }

    onTextChange =(e)=> {
        this.setState({
            text: e.target.value
        })
    }

    onLinkChange =(e)=> {
        this.setState({
            link: e.target.value
        })
    }

    toggleLinkDialog =()=> {
        if(this.state.isVisiable) {
            this.setState({
                isVisiable: false
            })
        } else {
            this.setState({
                isVisiable: true
            })
        }
    }

    render() {
        let dialog = ''
        if(this.state.isVisiable) {
            dialog = (<div className="db-dialog">
                <div className="db-dialog-wrapper">
                    <div className="db-dialog-panel">
                        <a className="db-dialog-close">×</a>
                        <div className="db-dialog-content">
                            <div className="db-dialog-hd">{this.props.title}</div>
                            <div className="db-dialog-bd">
                                <div className="db-popup-form db-popup-form-link">
                                    <div className="db-popup-form-item">
                                        <input type="text"
                                            value={this.state.text}
                                            onChange={this.onTextChange}
                                            placeholder={this.props.textPlaceholder}
                                        />
                                    </div>
                                    <div className="db-popup-form-item">
                                        <input type="text"
                                            value={this.state.link}
                                            onChange={this.onTextChange}
                                            placeholder={this.props.linkPlaceholder}
                                        />
                                    </div>
                                    <div className="db-popup-form-submit">
                                        <button className="db-popup-form-button-main"
                                            type="submit"
                                            onClick={this.insertLink}>{this.props.submitLabel}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
        return <br />
    }
}

module.exports = {
    BeanLinkDialog: BeanLinkDialog
}
