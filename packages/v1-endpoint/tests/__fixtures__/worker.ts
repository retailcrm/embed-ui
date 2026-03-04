import { h, onMounted, ref } from 'vue'

import { defineRunner as defineRemoteRunner, runEndpoint } from '../../src/remote'

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
  }],
}))
