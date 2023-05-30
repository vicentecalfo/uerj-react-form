function FieldError({ fieldName, validation, untouched }) {
  const hasError = validation.hasOwnProperty(fieldName);
  if (!hasError || untouched) return "";
  return (
    <span className="has-text-danger is-size-7 p-2">
      {validation[fieldName]}
    </span>
  );
}

export default FieldError;
