import PropTypes from 'prop-types';
import React from 'react';

interface ICheckBox {
  label: string;
  checked?: boolean;
  onChange?: (e: HTMLInputElement | null) => void;
}

const Checkbox = (props: ICheckBox) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (props.onChange) {
      props.onChange(inputRef.current);
    }
  };

  return (
    <label className="custom-checkbox">
      <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
      <span className="custom-checkbox__checkmark">
        <i className="bx bx-check"></i>
      </span>
      {props.label}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
