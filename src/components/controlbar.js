import React from 'react';
import { InlineButton, UploadButton, CommandButton } from './button'

const BUTTON_ITEMS = [
  {
    label: 'BOLD',
    style: 'BOLD',
    tip: '粗体',
    type: 'inline'
  },
  {
    label: 'ITALIC',
    style: 'ITALIC',
    tip: '斜体',
    type: 'inline'
  },
  {
    label: 'UNDERLINE',
    style: 'UNDERLINE',
    tip: '下划线',
    type: 'inline'
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    tip: '列表',
    type: 'block'
  },
  {
    label: 'OL',
    style: 'ordered-list-item',
    tip: '有序列表',
    type: 'block'
  },
  {
    type: 'sep'
  },
  {
    label: 'Blockquote',
    style: 'blockquote',
    tip: '引用',
    type: 'block'
  },
  {
    label: 'Code',
    style: 'code-block',
    tip: '代码',
    type: 'block'
  },
  {
    type: 'sep'
  },
  {
    label: 'Picture',
    style: 'picture-block',
    tip: '上传照片',
    type: 'upload'
  },
  {
    type: 'sep'
  },
  {
    label: 'text',
    tip: '前言',
    type: 'command',
    command: 'showPreface'
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
        buttonItems: []
    }

    constructor(props) {
        super(props)
    }

    getInlineButton(type) {
        const {editorState} = this.props;
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        return <InlineButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            onToggle={this.props.toggleInlineStyle}
            style={type.style}
        />
    }

    getBlockButton(type) {
        let isActive = false;
        if(this.props.editorState) {
            let currentStyle = this.props.editorState.getCurrentInlineStyle();
            isActive = currentStyle.has(type.style)
        }

        return <InlineButton
            key={type.label}
            active={isActive}
            label={type.label}
            tip={type.tip}
            onToggle={this.props.toggleBlockType}
            style={type.style}
        />
    }

    getUploadButton(type) {
        const {editorState} = this.props
        const selection = editorState.getSelection()
        const blockType = editorState.getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType()

        return <UploadButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            tip={type.tip}
            addImage={this.props.addImage}
            style={type.style}
        />
    }

    getButtons() {
        let buttons = [];
        for(let i=0;i<this.props.buttonItems.length;i++) {
            let item = this.props.buttonItems[i]
            if(item.type == 'sep') {
                buttons.push(<div className="db-sep" key={i}></div>)
            } else if(item.type == 'inline') {
                buttons.push(this.getInlineButton(item))
            } else if(item.type == 'block') {
                buttons.push(this.getBlockButton(item))
            } else if(item.type =='upload') {
                buttons.push(this.getUploadButton(item))
            } else if(item.type == 'command') {
                buttons.push(<CommandButton
                            key={i}
                            label={item.label}
                            tip={item.tip || item.label}
                            clickButton={this.props[item.command]}
                            style={item.style}
                        />)
            }
        }
        return buttons
    }

    render() {
        return <div className={this.props.className}>{this.getButtons()}</div>
    }
}


module.exports = {
  BUTTON_ITEMS: BUTTON_ITEMS,
  Controlbar: Controlbar
}
