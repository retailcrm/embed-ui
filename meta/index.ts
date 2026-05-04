import type { TranslationList } from '@retailcrm/embed-ui-v1-types/doc'

export const pageListDocumentation: Array<{
  id: string;
  description: TranslationList;
}> = [{
  id: 'customer/card',
  description: {
    'en-GB': 'Customer page',
    'es-ES': 'Página del cliente',
    'ru-RU': 'Страница клиента',
  },
}, {
  id: 'order/card',
  description: {
    'en-GB': 'Page with the order creation/editing form',
    'es-ES': 'Página con el formulario de creación/edición de pedidos',
    'ru-RU': 'Страница с формой создания/редактирования заказа',
  },
}, {
  id: 'order/mg',
  description: {
    'en-GB': 'Page with the order creation/editing form in chats',
    'es-ES': 'Página con el formulario de creación/edición de pedidos en los chats',
    'ru-RU': 'Страница с формой создания/редактирования заказа в чатах',
  },
}]
