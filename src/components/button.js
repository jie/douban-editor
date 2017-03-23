import React from 'react'
import { ButtonIcons } from './icons'

const TipStyle = {
  position: 'absolute',
  padding: '4px 6px',
  top: '-25px',
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
  bottom: "-6px",
  marginLeft: "-6px",
  width: 0,
  height: 0,
  borderLeft: "6px solid rgba(0, 0, 0, 0)",
  borderRight: "6px solid rgba(0, 0, 0, 0)",
  borderTop: "8px solid rgba(0,0,0,0.8)",
}


class BaseButton extends React.Component {

    static defaultProps = {
        buttonClass: 'db-button',
        buttonIcons: ButtonIcons
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
        if(this.props.buttonIcons[this.props.label.toLowerCase()]) {
            return this.props.buttonIcons[this.props.label.toLowerCase()]
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
      className += ` actived`;
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

class PictureButton extends BaseButton {

    static defaultProps = {
        buttonClass: 'db-button',
        buttonIcons: ButtonIcons,
        fileRef: '__db_picture_field',
        fileAccept: ''
    }


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
    if (this.props.insertPicture) {
      this.props.insertPicture(pictures)
    }
  }

  clickButton(e) {
      this.refs[this.props.fileRef].click()
  }

  render() {
    let restProps = {
        accept: this.props.fileAccept,
        ref: this.props.fileRef
    }
    return (
      <span className={this.props.buttonClass}
          onClick={this.clickButton.bind(this)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          {this.getTip()}
          <input
              type="file"
              style={{display: 'none'}}
              multiple={true}
              onChange={this.onFileChange.bind(this)}
              {...restProps}
          />
          {this.getIcon()}
      </span>
      )
  }
}



class VideoButton extends BaseButton {

    static defaultProps = {
        buttonClass: 'db-button',
        buttonIcons: ButtonIcons,
        fileRef: '__db_video_field',
        fileAccept: ''
    }


  onFileChange(event) {
    event.preventDefault()
    const target = event.target
    const files = target.files
    const count = files.length
    const vfile = files[0]
    vfile.thumb = window.URL.createObjectURL(vfile)

    if (this.props.insertVideo) {
      this.props.insertVideo(vfile)
    }
  }

  clickButton(e) {
      this.refs[this.props.fileRef].click()
  }

  render() {
    const restProps = {
        accept: this.props.fileAccept,
        ref: this.props.fileRef
    }
    return (
      <span className={this.props.buttonClass}
          onClick={this.clickButton.bind(this)}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}>
          {this.getTip()}
          <input
              type="file"
              style={{display: 'none'}}
              multiple={false}
              onChange={this.onFileChange.bind(this)}
              {...restProps}
          />
          {this.getIcon()}
      </span>
      )
  }
}

class LinkButton extends BaseButton {

    static defaultProps = {
        buttonClass: 'db-button',
        buttonIcons: ButtonIcons,
    }

  clickButton(e) {
      if(this.props.toggleLinkDialog) {
          this.props.toggleLinkDialog()
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

module.exports = {
  BaseButton: BaseButton,
  InlineButton: InlineButton,
  PictureButton: PictureButton,
  VideoButton: VideoButton,
  CommandButton: CommandButton,
  LinkButton: LinkButton
}
