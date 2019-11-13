import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TextInput extends Component {

  render () {
    const { name, label, placeholder, fieldClassNames = "", type, value = "", readOnly, fieldIcon, min = null } = this.props;
    const fieldProperties = {
      id: name,
      name,
      className: classNames(`form-control ${fieldClassNames ? fieldClassNames : ""}`, {
        "form-control--with-icon": fieldIcon,
      }),
      autoComplete: "off",
      min
    };
    const field = <input
                    type={ type || "text" }
                    { ...fieldProperties }
                    value={value}
                    onChange={this.props.onFieldChange ? e => this.props.onFieldChange(e) : undefined}
                    readOnly={readOnly}
                    placeholder={placeholder}
                  />;

    return (
      <div className="form-group">
        {
          label &&
          <label htmlFor={ name }>
            { label }
          </label>
        }
        {
          fieldIcon &&
          <div className="form-control-icon">
            <i className={`font-icon ${fieldIcon}`}></i>
          </div>
        }
        { field }
      </div>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fieldClassNames: PropTypes.string,
  fieldIcon: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onFieldChange: PropTypes.func
};

export default TextInput;