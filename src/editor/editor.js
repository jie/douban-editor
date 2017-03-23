import React from 'react'
import {
    Entity,
    Editor,
    EditorState,
    RichUtils,
    AtomicBlockUtils,
    ContentState,
    convertToRaw,
    convertFromHTML,
    getSafeBodyFromHTML,
    CompositeDecorator
} from 'draft-js'

import {
    BUTTON_ITEMS,
    Controlbar,
    blockRenderMap,
    extendedBlockRenderMap,
    MediaBlock,
    mediaBlockRenderer,
    keyBindingFn
} from '../components'

function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'code-block') {
        return 'db-code'
    } else if (type == 'blockquote') {
        return 'db-blockquote'
    } else if (type == 'atomic') {
        return 'db-picture'
    } else {
        return 'db-unstyle'
    }
}

class DoubanEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      title: this.props.title || '',
      showURLInput: false,
      url: '',
      urlType: '',
      prefaceStatus: false,
      summary: this.props.summary || '',
      mentions: [],
      placeholder: this.props.placeholder || ''
    }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => this.setState({
      editorState
    })

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.onTab = (e) => this._onTab(e)
    this.onFocus = (e) => this._onFocus(e)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
    this.toggleUploadType = (type) => this._toggleUploadType(type)
    this.onURLChange = (e) => this.setState({
      urlValue: e.target.value
    })

    this.logState = () => {
      const content = this.state.editorState.getCurrentContent()
    }

    this.addAudio = this._addAudio.bind(this)
    this.confirmMedia = this._confirmMedia.bind(this)
    this.addVideo = this._addVideo.bind(this)
    this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this)
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state
    let newState;
    if(command == 'soft-enter') {
        newState = RichUtils.insertSoftNewline(editorState)
    } else {
        newState = RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
        this.onChange(newState)
        return true
    }

    return false
  }

  _onFocus(e) {
    this.setState({
      editorFocused: true
    })
  }

  _onTab(e) {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleUploadType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  _pictureAppendCallback(blockType, pictures) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _onURLInputKeyDown(e) {
    if (e.which === 13) {
      this._confirmMedia(e)
    }
  }

  _promptForMedia(type) {
    const {editorState} = this.state
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => {
        this.refs.url.focus()
      }, 0)
    })
  }

  _confirmPictureMedia(pictures) {
    const {editorState} = this.state
    pictures.map(pic => {
      let {editorState} = this.state
      let contentState = editorState.getCurrentContent()
      let _contentState = contentState.createEntity('image', 'IMMUTABLE', {
        src: pic.thumb,
        file: pic
      })
      this.setState({
        editorState: AtomicBlockUtils.insertAtomicBlock(
          editorState,
          _contentState.getLastCreatedEntityKey(),
          pic.thumb
        )
      }, () => {
        setTimeout(() => this.focus(), 0)
      })
    })
  }

  _addAudio() {
    this._promptForMedia('audio')
  }

  addImage = (pictures) => {
    this._confirmPictureMedia(pictures)
  }

  _addVideo() {
    this._promptForMedia('video')
  }

  _confirmMedia(e) {
    e.preventDefault()
    const {editorState, urlValue, urlType} = this.state
    const entityKey = Entity.create(urlType, 'IMMUTABLE', {
      src: urlValue
    })

    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      )
    }, () => {
      setTimeout(() => this.focus(), 0)
    })
  }

  showNotification(type, message) {
      if(this.props.showNotification) {
          this.props.showNotification(type, message)
      }
  }

  handleReturn =(e)=> {
      console.log(e)
      e.stopPropagation()
  }

  getEditor() {
    const {editorState} = this.state
    return <Editor
        spellCheck={false}
        editorState={editorState}
        blockRendererFn={mediaBlockRenderer}
        blockStyleFn={myBlockStyleFn}
        blockRenderMap={extendedBlockRenderMap}
        handleKeyCommand={this.handleKeyCommand}
        keyBindingFn={keyBindingFn}
        onChange={this.onChange}
        onTab={this.onTab}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref="editor"
        placeholder={this.props.placeholder}
    />
  }

  handleTitleChange = e => {
      this.setState({title: e.target.value})
  }

  render() {
    return <div className="db-editor">
        <div className="title">
            <input
                type="text"
                placeholder={this.props.titlePlaceholder || ''}
                dir="auto"
                value={this.state.title}
                onChange={this.handleTitleChange}
            />
        </div>
        <Controlbar
            toggleInlineStyle={this.toggleInlineStyle}
            toggleBlockType={this.toggleBlockType}
            editorState={this.state.editorState}
            addImage={this.addImage}
            updateState={this.onChange}
            buttonItems={this.props.buttonItems}
            buttonIcons={this.props.buttonIcons}
        />
        <div className="content">
            {this.getEditor()}
        </div>
    </div>
  }
}


DoubanEditor.propTypes = {
    buttonItems: React.PropTypes.array,
    buttonIcons: React.PropTypes.object,
}


module.exports = {
  DoubanEditor: DoubanEditor
}
