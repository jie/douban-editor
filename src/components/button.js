import React from 'react';
import octicons from 'octicons'

const btnIcons = {
  bold: <i className="fa fa-bold" aria-hidden="true"></i>,
  italic: <i className="fa fa-italic" aria-hidden="true"></i>,
  underline: <i className="fa fa-underline" aria-hidden="true"></i>,
  header: <i className="fa fa-header" aria-hidden="true"></i>,
  blockquote: <i className="fa fa-quote-left" aria-hidden="true"></i>,
  code: <i className="fa fa-code" aria-hidden="true"></i>,
  ol: <i className="fa fa-list-ol" aria-hidden="true"></i>,
  ul: <i className="fa fa-list" aria-hidden="true"></i>,
  header: <i className="fa fa-header" aria-hidden="true"></i>,
  link: <i className="fa fa-link" aria-hidden="true"></i>,
  picture: <i className="fa fa-picture-o" aria-hidden="true"></i>,
  video: <i className="fa fa-video-camera" aria-hidden="true"></i>,
  times: <i className="fa fa-times" aria-hidden="true"></i>,
  commenting: <i className="fa fa-commenting-o" aria-hidden="true"></i>,
  share: <i className="fa fa-share-alt" aria-hidden="true"></i>,
  upload: <i className="fa fa-upload" aria-hidden="true"></i>,
  book: <i className="fa fa-book" aria-hidden="true"></i>,
  text: <i className="fa fa-file-text-o" aria-hidden="true"></i>,
  save: <i className="fa fa-floppy-o" aria-hidden="true"></i>
}


const TipStyle = {
  position: 'absolute',
  padding: '4px 6px',
  top: '-20px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0,0,0,0.8)',
  lineHeight: 1.2,
  fontSize: '12px',
  color: '#fff',
  whiteSpace: 'nowrap',
  borderRadius: '2px',
}

const TipAfter = {
  content: "",
  position: 'absolute',
  left: "50%",
  bottom: "-5px",
  marginLeft: "-3px",
  width: "5px",
  height: "5px",
  width: 0,
  height: 0,
  borderLeft: "4px solid rgba(0, 0, 0, 0)",
  borderRight: "4px solid rgba(0, 0, 0, 0)",
  borderTop: "5px solid rgba(0,0,0,0.8)",
}


class BaseButton extends React.Component {

    static defaultProps = {
        buttonClass: 'db-button'
    }

    constructor(props) {
        super(props);
        this.state = {
            showTip: false
        }
    }

    onMouseEnter = e => {
        this.setState({
            showTip: true
        })
    }
    onMouseLeave = e => {
        this.setState({
            showTip: false
        })
    }

    getTip() {
        if (this.state.showTip) {
            return <div style={TipStyle}>{this.props.tip || this.props.label}
                <span style={TipAfter}></span>
            </div>
        }
    }

    getIcon() {
        if(btnIcons[this.props.label.toLowerCase()]) {
            return btnIcons[this.props.label.toLowerCase()]
        }
    }
}

BaseButton.propTypes = {
    tip: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
}


class InlineButton extends BaseButton {
  constructor(props) {
    super(props)
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = this.props.buttonClass;
    if (this.props.active) {
      className += ' actived';
    }
    return (
      <span className={className}
          onMouseDown={this.onToggle}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
        {this.getTip()}
        {this.getIcon()}
      </span>
    )
  }
}


class CommandButton extends BaseButton {

  clickButton() {
    if (this.props.clickButton) {
      this.props.clickButton()
    }
  }
  render() {
    return (
      <span className={this.props.buttonClass}
          onClick={this.clickButton.bind(this)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          {this.getTip()}
          {this.getIcon()}
      </span>
    )
  }
}

class UploadButton extends BaseButton {

  onFileChange(event) {
    event.preventDefault()
    let target = event.target
    let files = target.files
    let count = files.length

    for (let i = 0; i < count; i++) {
      files[i].thumb = window.URL.createObjectURL(files[i])
    }

    files = Array.prototype.slice.call(files, 0)
    files = files.filter(function(file) {
      return /image/i.test(file.type)
    })

    let pictures = []
    for (let item of files) {
      pictures.push(item)
    }
    if (this.props.addImage) {
      this.props.addImage(pictures)
    }
  }

  render() {
    return (
      <span className={this.props.buttonClass}>
        <input type="file" accept="image/*" multiple={true} onChange={this.onFileChange.bind(this)}/>
        {this.getIcon()}
      </span>
      )
  }
}



module.exports = {
  BaseButton: BaseButton,
  InlineButton: InlineButton,
  UploadButton: UploadButton,
  CommandButton: CommandButton
}
