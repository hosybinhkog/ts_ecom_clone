import React from 'react';
import PropTypes from 'prop-types';

interface ButtonProps {
  backgroundColor: string;
  size?: string;
  icon?: string;
  animate?: boolean;
  onclick?: () => void;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const bg = props.backgroundColor ? 'bg-' + props.backgroundColor : 'bg-main';

  const size = props.size ? 'btn-' + props.size : '';

  const animate = props.animate ? 'btn-animate' : '';

  const check = props.onclick && true;

  return (
    <button
      style={{
        backgroundColor: props.backgroundColor === 'blue' ? '#4267b2' : props.backgroundColor,
      }}
      className={`btn ${bg} ${size} ${animate}`}
      onClick={check && props.onclick}
    >
      <span className="btn__txt">{props.children}</span>
      {props.icon && (
        <span className="btn__icon">
          <i className={`${props.icon} bx-tada`}></i>
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  animate: PropTypes.bool,
  onclick: PropTypes.func,
};

export default Button;
