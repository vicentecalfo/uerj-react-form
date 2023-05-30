function validationFormFields(config, formValues) {
  const out = {};
  Object.keys(config).forEach((field) => {
    const validators = Object.keys(config[field]);
    for (let i = 0; i < validators.length; i++) {
      const notValid = !config[field][validators[i]].check(formValues[field]);
      if (notValid) {
        out[field] = config[field][validators[i]].message;
        break;
      }
    }
  });
  out.submitDisabled = Object.keys(out).length > 0;
  return out;
}


export default validationFormFields;