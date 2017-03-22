import React from 'react'
import {Entity} from 'draft-js'


class MediaBlock extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
        const entity = Entity.get(this.props.block.getEntityAt(0))
        const {src} = entity.getData()
        const type = entity.getType()
        let media
        if (type === 'audio') {
            media = <audio controls src={src} className="db-media db-video" />
        } else if (type === 'image') {
            media = <img src={src} className="db-media db-image" />
        } else if (type === 'video') {
            media = <video controls src={src} className="db-media db-audio" />
        }
        return media
    }
}

function mediaBlockRenderer(block) {
  if (block.getType() === 'atomic') {
    return {
      component: MediaBlock,
      editable: false,
    }
  }
  return null
}

module.exports = {
    MediaBlock: MediaBlock,
    mediaBlockRenderer: mediaBlockRenderer
}
