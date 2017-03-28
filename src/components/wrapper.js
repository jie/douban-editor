import React from 'react'
import Immutable from 'immutable'
import {
    TipAfter,
    TipStyle
} from './button'
import {
    DefaultDraftBlockRenderMap
} from 'draft-js'
class BaseWrapper extends React.Component {
    constructor(props) {
      super(props)
    }
}

class CodeWrapper extends BaseWrapper {
  render() {
    return (
      <pre style={{maxWidth:'100%', overflowX:'auto'}}>
          <code>
              {this.props.children}
          </code>
      </pre>
    )
  }
}

class BlockquoteWrapper extends BaseWrapper {
  render() {
    return (
      <blockquote>{this.props.children}</blockquote>
    )
  }
}

class AtomicWrapper extends BaseWrapper {
  render() {
    return (
      <figure>{this.props.children}</figure>
    )
  }
}



class LinkWrapper extends BaseWrapper {

    render() {
      const {url} = this.props.contentState.getEntity(this.props.entityKey).getData()
      return <a href={url} className="db-link">{this.props.children}</a>
    }
}

const blockRenderMap = Immutable.Map({
    'code-block': {
        wrapper: <CodeWrapper />,
    },
    blockquote :{
        wrapper: <BlockquoteWrapper />
    },
    atomic: {
        wrapper: <AtomicWrapper />,
    }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

module.exports = {
    CodeWrapper: CodeWrapper,
    BlockquoteWrapper: BlockquoteWrapper,
    AtomicWrapper:    AtomicWrapper,
    blockRenderMap: blockRenderMap,
    extendedBlockRenderMap: extendedBlockRenderMap,
    LinkWrapper: LinkWrapper
}
