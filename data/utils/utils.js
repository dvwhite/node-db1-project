/**
 * @function formatFieldsString: Create a string using the fields in an array
 * @param {*} fields: An array of fields
 * @returns {String}: The fields joined or returned directly (if only one)
 */
const formatFieldString = fields => {
  // Work around empty array
  if (fields.length < 1) return "";
  
  // If the length is one, use singular, e.g., "Missing a"
  if (fields.length === 1) {
    return fields[0];
    // Plural, e.g., "Missing a and b" or "Missing a, b, and c"
  } else {
    fields[fields.length - 1] = "and " + fields[fields.length - 1];
    // Separate with a space if two items, or a comma with >= 3
    if (fields.length === 2) {
      return fields.join(" ");
    } else {
      return fields.join(", ");
    }
  }
}

/**
 * @function getMissingFields: Check which fields, if any, are missing in an array
 * @param {*} expectedFields: The fields expected by the API
 * @param {*} actualFields: The fields sent in the request.body
 * @returns {Array} fieldsNotFound: The fields not found, if any.
 */
const getMissingFields = (expectedFields, actualFields) => {
  const fieldsNotFound = [];
  while (expectedFields.length) {
    fieldToValidate = expectedFields.pop();
    if (!actualFields.includes(fieldToValidate)) {
      fieldsNotFound.push(fieldToValidate);
    }
  }
  return formatFieldString(fieldsNotFound);
}

module.exports = getMissingFields;
