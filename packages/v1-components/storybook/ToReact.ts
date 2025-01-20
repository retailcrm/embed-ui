import React from 'react'
import ReactDOM from 'react-dom'

import { createApp, h, ref } from 'vue'
import { v4 } from 'uuid'
import { ImageWorkersKey } from '../src/common/preview'

export default ({ is, children, tag, ...props }) => {
  const el = React.useRef(null)

  React.useEffect(() => {
    const id = v4()
    const app = createApp({
      mounted () {
        if (children) {
          ReactDOM.render(
            React.createElement(React.Fragment, {}, children),
            document.getElementById(id)
          )
        }
      },

      render: () => h(is, props),
    })

    app.provide(ImageWorkersKey, ref(['worker1.retailcrm.tech']))
    app.mount(el.current)

    return () => app.unmount()
  })

  return React.createElement(tag ?? 'div', {
    className: 'sb-unstyled',
    ref: el,
  })
}
