import React from 'react';
import PropTypes from "introspectable-proptypes";

function Button(
  {
    onClick,
    onMouseDown,
    onKeyDown,
    onFocus,
    autoFocus,
    className,
    title,
    size,
    disabled,
    status,
    children,
    invert,
    id
  }
) {

  const classes = ["Button " + size];

  if (className) {
    classes.push(className);
  }

  if (invert) {
    classes.push("invert");
  }

  if (status) {
    classes.push(status);
  }

  return (
    <button
      type="button"
      id={id}
      className={classes.join(" ")}
      autoFocus={autoFocus}
      disabled={disabled}
      title={title}
      tabIndex="0"
      onClick={onClick}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  confirmMessageKey: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  /**
   * Additional class names
   */
  className: PropTypes.string,
  /**
   * Available size: <code>heavy</code>, <code>light</code>, <code>regular</code>
   */
  size: PropTypes.oneOf(["heavy", "light", "regular"]),
  /**
   * Available status: <code>info</code>, <code>warning</code>, <code>danger</code>, <code>plain</code>
   */
  status: PropTypes.oneOf(["info", "warning", "danger", "plain"]),
  /**
   * Get inverted button layout (white background, colored border and text)
   */
  invert: PropTypes.bool,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onKeyDown: PropTypes.func
};

Button.defaultProps = {
  id: undefined,
  title: null,
  className: null,
  size: "regular",
  autoFocus: false,
  disabled: false,
  invert: false,
  onFocus: null,
  onClick: null,
  status: null,
  onMouseDown: null,
  onKeyDown: null
};

Button.description = `
  A basic html button supporting several styles.
`

Button.examples = [
  {
    title: "Tooltip text",
    children: "Engage"
  },

  {
    children: "Engage",
    disabled: true,
    invert: true,
    status: "warning",
    size: "heavy"
  }
];

export default Button;
