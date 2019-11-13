

import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Select extends Component {

  render () {
    const {
      name,
      label = false,
      fieldClassNames = "",
      value = "",
      options,
      onFieldChange,
      onRemove,
      disabled
    } = this.props;
    const fieldProperties = {
      id: name,
      name,
      value,
      disabled,
      className: classNames("form-control form-control-select", {
        "form-control-select--not-selected": !value,
        "form-control-select--icon-left": onRemove,
      }),
      onChange: e => onFieldChange(e)
    };

    return (
      <div className={ `form-group form-group--relative${fieldClassNames.length ? " " + fieldClassNames : ""}` }>
        {
          label &&
          <label htmlFor={name}>{label}</label>
        }
        <div className="select-input-wrapper">
          {
            onRemove &&
            <div className="select-remove" onClick={onRemove}>
              <i className="font-icon icon-close"></i>
            </div>
          }
          <select { ...fieldProperties }>
            {
              options.map((option, i) => (
                <option value={option.value} key={i} disabled={option.disabled}>{ option.name }</option>
              ))
            }
          </select>
          <div className="select-down-arrow">
            <i className="font-icon icon-ibm-arrow-down"></i>
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  fieldClassNames: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onFieldChange: PropTypes.func
};

export default Select;