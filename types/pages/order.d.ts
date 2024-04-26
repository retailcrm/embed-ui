export type OrderCardMethods = {
  getCustomerEmail: () => string | null,
  setCustomerEmail: (value: string) => void,

  getCustomerPhone: () => string | null,
  setCustomerPhone: (value: string) => void,

  getDeliveryAddress: () => string | null,
  setDeliveryAddress: (value: string) => void,
  parseDeliveryAddress: () => void,
}