// Allow only alphabets and space (for names)
export const isValidNameInput = (value: string): boolean => {
    return /^[a-zA-Z\s]*$/.test(value);
};

// Allow only numbers with max length (for phone numbers)
export const isValidPhoneInput = (value: string, maxLength: number = 12): boolean => {
    return /^[0-9]{0,12}$/.test(value) && value.length <= maxLength;
};