import { h, onMounted, ref } from 'vue'

import { defineRunner as defineRemoteRunner, runEndpoint } from '../../src/remote'

const DELAY_WIDGET_MOUNT = 'test:delay-widget-mount'
const CONTINUE_WIDGET_MOUNT = 'test:continue-widget-mount'
const WIDGET_MOUNT_PENDING = 'test:widget-mount-pending'

let delayWidgetMount = false
let continueWidgetMount = () => undefined

self.addEventListener('message', event => {
  if (event.data?.type === DELAY_WIDGET_MOUNT) {
    delayWidgetMount = true
  } else if (event.data?.type === CONTINUE_WIDGET_MOUNT) {
    continueWidgetMount()
  }
})

const waitBeforeWidgetMount = async (): Promise<void> => {
  if (!delayWidgetMount) {
    return
  }

  delayWidgetMount = false
  self.postMessage({ type: WIDGET_MOUNT_PENDING })

  await new Promise<void>(resolve => {
    continueWidgetMount = resolve
  })
}

runEndpoint(defineRemoteRunner({
  pages: [{
    props: {
      code: {
        type: String,
        required: true,
      },
    },

    setup (props: { code: string }) {
      const count = ref(0)

      onMounted(() => {
        setTimeout(() => {
          count.value += 1
        }, 0)
      })

      return () => h('section', [
        h('div', {
          'data-qa': `worker-page:${props.code}`,
        }, `${props.code}:${count.value}`),

        h('button', {
          'data-qa': `worker-page:inc:${props.code}`,
          onClick: () => {
            count.value += 1
          },
        }, 'inc page'),
      ])
    },
  }],

  widgets: [{
    props: {
      target: {
        type: String,
        required: true,
      },
    },

    setup (props: { target: string }) {
      const count = ref(0)

      onMounted(() => {
        setTimeout(() => {
          count.value += 1
        }, 0)
      })

      return () => h('section', [
        h('div', {
          'data-qa': 'worker-widget',
        }, `${props.target}:${count.value}`),

        h('button', {
          'data-qa': 'worker-widget:inc',
          onClick: () => {
            count.value += 1
          },
        }, 'inc widget'),
      ])
    },
  }, waitBeforeWidgetMount],
}))
