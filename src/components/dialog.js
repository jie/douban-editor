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
          text: props.text || '',
          link: props.link || '',
          dialogStyle: {
              display: 'none'
          },
          disabled: false
      }
    }

    insertLink =(e)=> {
        e.preventDefault()
        if(this.props.insertLink) {
            this.props.insertLink({
                text: this.state.text,
                link: this.state.link
            })
            this.setState({
                dialogStyle: {'display': 'none'}
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

    initLinkDialog =(link)=> {
        let state = {
            dialogStyle: {}
        }
        if(link.text) {
            state.text = link.text
        }
        if(link.link) {
            state.link = link.link
        }

        if(link.disabled) {
            state.disabled = true
        }
        this.setState(state)
    }

    toggleLinkDialog =()=> {
        if(this.state.dialogStyle.display) {
            this.setState({
                dialogStyle: {}
            })
        } else {
            this.setState({
                text: '',
                link: '',
                disabled: false,
                dialogStyle: {
                    display: 'none',
                }
            })
        }
    }

    render() {
        return <div className="db-dialog" style={this.state.dialogStyle}>
            <div className="db-dialog-wrapper">
                <div className="db-dialog-panel">
                    <a className="db-dialog-close" onClick={this.toggleLinkDialog}>×</a>
                    <div className="db-dialog-content">
                        <div className="db-dialog-hd">{this.props.title}</div>
                        <div className="db-dialog-bd">
                            <div className="db-popup-form db-popup-form-link">
                                <div className="db-popup-form-item">
                                    <input type="text"
                                        value={this.state.text}
                                        onChange={this.onTextChange}
                                        placeholder={this.props.textPlaceholder}
                                        disabled={this.state.disabled}
                                    />
                                </div>
                                <div className="db-popup-form-item">
                                    <input type="text"
                                        value={this.state.link}
                                        onChange={this.onLinkChange}
                                        placeholder={this.props.linkPlaceholder}
                                    />
                                </div>
                                <div className="db-popup-form-submit">
                                    <button className="db-popup-form-button-main"
                                        type="submit"
                                        onMouseDown={this.insertLink}>{this.props.submitLabel}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

module.exports = {
    BeanLinkDialog: BeanLinkDialog
}
