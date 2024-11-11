import { create } from '@storybook/theming/create'
import { name } from '../package.json'

export default create({
  base: 'light',
  appBg: '#F4F6F8',
  appBorderColor: '#DEE2E6',
  appBorderRadius: 4,
  appContentBg: '#F4F6F8',
  appPreviewBg: '#F4F6F8',
  barBg: '#F4F6F8',
  barHoverColor: 'hsl(220, 49%, 57%)',
  barSelectedColor: '#6528D7',
  barTextColor: '#6528D7',
  brandImage: 'https://s3-s1.retailcrm.tech/eu-central-1/retailcrm-static/branding/retailcrm/logo/logo_horiz.svg',
  brandTitle: name,
  colorPrimary: '#005EEB',
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, Courier, monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  inputBg: '#FFFFFF',
  inputBorder: '#DEE2E6',
  inputBorderRadius: 4,
  inputTextColor: '#1E2248',
  textColor: '#1E2248',
  textInverseColor: 'red',
})
