function buildFormData(data) {
  let formData = '';

  Object.keys(data).forEach((key, index) => {
    if (index !== 0) {
      formData += '&';
    }
    formData += `${key}=${data[key]}`;
  });

  return formData;
}

export default buildFormData;
