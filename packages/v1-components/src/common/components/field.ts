export type UiFieldProperties = {
  id: string;
  label?: string;
  hint?: string;
  hintAriaLabel?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export type UiFieldSlotProps = {
  id: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  invalid: boolean;
  ariaLabelledby?: string;
  ariaInvalid?: 'true';
}
