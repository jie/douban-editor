import React from 'react';
import { RichUtils } from 'draft-js'
import { InlineButton, PictureButton, CommandButton, VideoButton, LinkButton } from './button'


const BUTTON_ITEMS = [
  {
    label: 'BOLD',
    style: 'BOLD',
    tip: '粗体',
    type: 'inline'
  },
  {
    label: 'Blockquote',
    style: 'blockquote',
    tip: '引用',
    type: 'block'
  },
  {
    label: 'header',
    style: 'header-four',
    tip: '小标题',
    type: 'block'
  },
  {
    type: 'sep'
  },
  {
    label: 'Picture',
    style: 'picture',
    tip: '上传照片',
    type: 'picture',
    fileAccept: 'image/jpeg,image/jpg,image/gif,image/png'
  },
  {
    label: 'Video',
    style: 'video',
    tip: '插入视频',
    type: 'video',
    command: 'insertVideo',
    fileAccept: 'video/*'
  },
  {
    label: 'Link',
    style: 'link',
    tip: '插入链接',
    type: 'link',
    command: 'showLinkDialog'
  },
  {
    type: 'sep'
  },
  {
    label: 'Dash',
    style: 'dash',
    tip: '分割线',
    type: 'command',
    command: 'insertDashLine',
  },
  {
    label: 'Enter',
    style: 'enter',
    tip: '分行 Shift+回车',
    type: 'command',
    command: 'insertSoftNewLine',
  },
  {
    type: 'sep'
  },
  {
    label: 'preface',
    tip: '前言',
    type: 'command',
    command: 'togglePreface'
  },
  {
    label: 'save',
    tip: '保存',
    type: 'command',
    command: 'showSaveDialog'
  }
]


class Controlbar extends React.Component {

    static defaultProps = {
        className: 'db-controlbar',
        buttonItems: BUTTON_ITEMS
    }

    constructor(props) {
        super(props)
    }

    getInlineButton(type) {
      let isActive = false;
      if(this.props.editorState) {
          let currentStyle = this.props.editorState.getCurrentInlineStyle();
          isActive = currentStyle.has(type.style)
      }

       return <InlineButton
           buttonItems={this.props.buttonItems}
           key={type.label}
           active={isActive}
           label={type.label}
           tip={type.tip}
           onToggle={this.props.toggleInlineStyle}
           style={type.style}
        />
    }

    getBlockButton(type) {
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        return <InlineButton
            buttonItems={this.props.buttonItems}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            onToggle={this.props.toggleBlockType}
            style={type.style}
        />
    }

    getPictureButton(type) {
        const {editorState} = this.props
        const selection = editorState.getSelection()
        const blockType = editorState.getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        return <PictureButton
            buttonItems={this.props.buttonItems}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            insertPicture={this.props.insertPicture}
            style={type.style}
            fileAccept={type.fileAccept}
        />
    }

    getVideoButton(type) {
        const {editorState} = this.props
        const selection = editorState.getSelection()
        const blockType = editorState.getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        return <VideoButton
            buttonItems={this.props.buttonItems}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            insertVideo={this.props.insertVideo}
            style={type.style}
            fileAccept={type.fileAccept}
        />
    }

    getLinkButton(type) {
        const {editorState} = this.props
        const selection = editorState.getSelection()
        const blockType = editorState.getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()
        return <LinkButton
            buttonItems={this.props.buttonItems}
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            toggleLinkDialog={this.props.toggleLinkDialog}
            showLinkDialog={this.props.showLinkDialog}
            insertLink={this.props.insertLink}
            style={type.style}
        />
    }

    getButtons() {
        let buttons = [];
        for(let i=0;i<this.props.buttonItems.length;i++) {
            let item = this.props.buttonItems[i]
            switch(item.type) {
                case 'sep':
                    buttons.push(<div className="db-sep" key={i}></div>)
                    break
                case 'block':
                    buttons.push(this.getBlockButton(item))
                    break
                case 'inline':
                    buttons.push(this.getInlineButton(item))
                    break
                case 'picture':
                    buttons.push(this.getPictureButton(item))
                    break
                case 'video':
                    buttons.push(this.getVideoButton(item))
                    break
                case 'link':
                    buttons.push(this.getLinkButton(item))
                    break
                case 'command':
                    buttons.push(<CommandButton
                        buttonItems={this.props.buttonItems}
                        key={i}
                        label={item.label}
                        tip={item.tip || item.label}
                        clickButton={this.props[item.command]}
                        style={item.style} />)
                    break
                default:
                    console.warn('unsupported button type:', item.type)

            }
        }
        return buttons
    }

    render() {
        return <div className={this.props.className}>{this.getButtons()}</div>
    }
}


Controlbar.propTypes = {
    buttonIcons: React.PropTypes.object,
    buttonItems: React.PropTypes.array,
}


module.exports = {
  BUTTON_ITEMS: BUTTON_ITEMS,
  Controlbar: Controlbar
}
