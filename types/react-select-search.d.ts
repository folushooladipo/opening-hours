declare module "react-select-search/dist/cjs/index.js" {
  export default SelectSearch
}

declare type SelectSearchOption = {
  name: string;
  value: string | number;
  type?: string;
  items?: SelectSearchOption[];
  disabled?: boolean;
  photo?: string;
}

declare type SelectedOptionValue = {
  name: string;
  value: string | number;
  index: number;
  photo?: string;
  disabled?: boolean;
}

declare type SelectedOption = {
  defaultOptions: SelectedOptionValue[][];
  focus: boolean;
  highlighted: null | SelectedOptionValue;
  options: SelectedOptionValue[][];
  search: string;
  value: string;
}

declare type OptionSnapshot = {
  selected: boolean;
  highlighted: boolean;
}

declare type DomProps = {
  tabIndex: string;
  onMouseDown: (event: MouseEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyPress: (event: KeyboardEvent) => void;
  onBlur: (event: Event) => void;
  value: string;
  disabled: boolean;
}

declare type ValueProps = {
  tabIndex: string;
  readonly: boolean;
  onMouseDown: (event: MouseEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
  onKeyPress: (event: KeyboardEvent) => void;
  onBlur: (event: Event) => void;
  value: string;
  disabled: boolean;
}

declare type ValueSnapshot = {
  value: SelectedOptionValue;
  highlighted: boolean;
  options: SelectedOptionValue[];
  disabled: boolean;
  displayValue: string;
  focus: boolean;
  search: string;
  searching: boolean;
}

declare type PrintOptions = "auto" | "always" | "never" | "on-focus"

declare type SelectSearchProps = {
  options: SelectSearchOption[];
  value?: string | string[];
  multiple?: boolean;
  search?: boolean;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  autoComplete?: "on" | "off";
  autoFocus?: boolean;
  className?: ((classes: string) => string) | string;
  onChange?: (
    selectedValue: SelectedOptionValue | SelectedOptionValue[],
    selectedOption: SelectedOption | SelectedOption[],
    optionSnapshot: SelectSearchProps
  ) => void;
  printOptions?: PrintOptions
  closeOnSelect?: boolean
  renderOption?: (
    domProps: DomProps,
    option: SelectedOption,
    snapshot: OptionSnapshot,
    className: string
  ) => ReactNode;
  filterOptions?: (options: SelectSearchOption[]) => (query: string) => SelectSearchOption[];
  renderValue?: (valueProps: ValueProps, snapshot: ValueSnapshot, className: string) => ReactNode;
  renderGroupHeader?: (name: string) => string;
  getOptions?: (query: string) => Promise<SelectSearchOption[]>;
  debounce?: number;
  ref?: Ref<Component>;
  emptyMessage?: string | (() => string);
}

declare const SelectSearch: FunctionComponent<SelectSearchProps>

declare function useSelect(Options: {
  value?: string | string[];
  disabled?: boolean;
  multiple?: boolean;
  search?: boolean;
  options?: SelectSearchOption[];
  onChange?: (
    selectedValue: SelectedOptionValue | SelectedOptionValue[],
    selectedOption: SelectedOption | SelectedOption[],
    optionSnapshot: SelectSearchProps
  ) => void;
  getOptions?: (query: string) => Promise<SelectSearchOption[]>;
  filterOptions?: (options: SelectSearchOption[]) => (query: string) => SelectSearchOption[];
  allowEmpty?: boolean;
  closeOnSelect?: boolean;
  closable?: boolean;
}): [
    ValueSnapshot,
    {
      tabIndex: string;
      readOnly: boolean;
      onChange: (
        selectedValue: SelectedOptionValue | SelectedOptionValue[],
        selectedOption: SelectedOption | SelectedOption[],
        optionSnapshot: SelectSearchProps
      ) => void;
      disabled: boolean;
      onMouseDown: (event: MouseEvent) => void;
      onKeyDown: (event: KeyboardEvent) => void;
      onKeyUp: (event: KeyboardEvent) => void;
      onKeyPress: (event: KeyboardEvent) => void;
      onBlur: () => void;
      onFocus: () => void;
      ref: MutableRefObject<unknown>;
    },
    {
      tabIndex: string;
      onMouseDown: (event: MouseEvent) => void;
      onKeyDown: (event: KeyboardEvent) => void;
      onKeyPress: (event: KeyboardEvent) => void;
      onBlur: () => void;
    },
    (value: string) => void
  ]

declare function fuzzySearch(
  options: SelectSearchOption[]
): (query: string) => SelectSearchOption[];
