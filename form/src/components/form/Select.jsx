import { useState } from "react";
import FieldError from "./FieldError";

function Select({
  name,
  onChange,
  value,
  label,
  validation,
  disabled = false,
  options = [],
  optionMap,
  counter = true,
}) {
  const [untouched, setUntouched] = useState(true);
  const handleOnChange = (event) => {
    setUntouched(false);
    onChange(event);
  };
  return (
    <>
      <div className="select is-fullwidth">
        <select
          name={name}
          onChange={handleOnChange}
          value={value}
          disabled={disabled}
        >
          <option value="">
            {label} {counter ? `(${options.length})` : ""}
          </option>
          {options.map((option, index) => (
            <option value={option[optionMap.value]} key={index}>
              {option[optionMap.label]}
            </option>
          ))}
        </select>
        <FieldError
          fieldName={name}
          validation={validation}
          untouched={untouched}
        />
      </div>
    </>
  );
}

export default Select;
