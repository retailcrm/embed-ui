<script lang="ts">
import type { PropType } from 'vue'
import type { UiButtonMethods } from '@/common/components/button'

import {
  defineComponent,
  h,
  ref,
} from 'vue'

import { isURL } from '@/common/predicate'
import { normalize } from '@/host/render'

import {
  APPEARANCE,
  SIZE,
  VARIANT,
} from '@/common/components/button'

export default defineComponent({
  props: {
    /** Устанавливает тип кнопки */
    type: {
      type: String,
      default: 'button',
    },

    /** Устанавливает атрибут href якоря */
    href: {
      type: null as unknown as PropType<string | null>,
      validator: (href: unknown) => (typeof href === 'string' && isURL(href as string)) || href === null,
      default: null,
    },

    /** Регулирует внешний вид кнопки: primary, secondary, tertiary or outlined */
    appearance: {
      type: String as PropType<APPEARANCE | `${APPEARANCE}`>,
      default: APPEARANCE.PRIMARY,
    },

    /** Регулирует цветовую схему кнопки: default, success or danger */
    variant: {
      type: String as PropType<VARIANT | `${VARIANT}`>,
      default: VARIANT.DEFAULT,
    },

    /** Размер */
    size: {
      type: String as PropType<SIZE | `${SIZE}`>,
      default: SIZE.SM,
    },

    /** Если кнопка активна */
    active: {
      type: Boolean,
      default: false,
    },

    /** Если кнопка отключена */
    disabled: {
      type: Boolean,
      default: false,
    },

    /** Если кнопка заблокирована */
    locked: {
      type: Boolean,
      default: false,
    },
  },

  setup (props, { attrs, expose, slots }) {
    const root = ref<HTMLAnchorElement | HTMLButtonElement | null>(null)

    expose({
      click: () => root.value?.click(),
      focus: () => root.value?.focus(),
      blur: () => root.value?.blur(),
    } as UiButtonMethods)

    return () => {
      const content = normalize('default' in slots ? slots.default?.() ?? [] : [])

      const hasText = content.some(([, isIcon]) => !isIcon)
      const [, hasLeadingIcon] = content[0] ?? [null, false]
      const [, hasTrailingIcon] = content[content.length - 1] ?? [null, false]

      return h(props.href ? 'a' : 'button', {
        ref: root,
        ...attrs,
        ...(props.href
          ? { href: props.href }
          : { type: props.type }
        ),
        class: [attrs.class, {
          ['ui-v1-button']: true,
          [`ui-v1-button_${props.appearance}`]: true,
          [`ui-v1-button_${props.size}`]: true,
          [`ui-v1-button_${props.variant}`]: props.variant !== VARIANT.DEFAULT,
          ['ui-v1-button_has-leading-icon']: hasText && hasLeadingIcon,
          ['ui-v1-button_has-trailing-icon']: hasText && hasTrailingIcon,
          ['ui-v1-button_square']: hasLeadingIcon && content.length === 1,
          ['ui-v1-button_active']: props.active,
          ['ui-v1-button_disabled']: props.disabled,
          ['ui-v1-button_locked']: props.locked,
        }],
        disabled: props.disabled,
      }, h('span', { class: 'ui-v1-button__content' }, content.map(([node, isIcon]) => {
        const props = node.props ?? {}

        return h('span', {
          class: {
            'ui-v1-button__icon': isIcon,
            'ui-v1-button__text': !isIcon,
          },
          ...('aria-hidden' in props ? { 'aria-hidden': props['aria-hidden'] } : {}),
        }, node)
      })))
    }
  },
})
</script>

<style lang="less" src="./button.less" />
