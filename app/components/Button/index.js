import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ethIcon from './eth.svg';
import dollarIcon from './dollar.svg';

const Button = props => (
  <button
    type="button"
    className={classnames(
      'mb-2 btn font-body font-bold text-base text-center',
      {
        'w-auto': !props.width,
        [props.width]: props.width,
        'flex items-center p-2': props.icon,
        'text-white': props.textwhite,
        'bg-green-golf-green hover:bg-viridian active:bg-viridian': props.green,
        'bg-purple-200': props.dark,
      },
    )}
    disabled={props.isLoading}
    {...props}
  >
    {/* {props.isLoading ? ( */}
    {/*  <Spinner className="w-10 relative mx-auto block h-6 text-center" /> */}
    {/* ) : ( */}
    {props.icon && (
      <img
        className="w-8 mr-2 font-display"
        src={props.icon === 'eth' ? ethIcon : dollarIcon}
        alt=""
      />
    )}
    {props.children}
    {/* )} */}
  </button>
);

Button.propTypes = {
  width: PropTypes.string,
  textwhite: PropTypes.any,
  icon: PropTypes.string,
  dark: PropTypes.any,
  green: PropTypes.any,
  children: PropTypes.any,
  isOutline: PropTypes.any,
  isNarrow: PropTypes.any,
  isBlock: PropTypes.any,
  isLink: PropTypes.any,
  isMuted: PropTypes.any,
  isDanger: PropTypes.any,
  secondary: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
