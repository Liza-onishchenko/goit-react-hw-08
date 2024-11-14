//селектори
export const selectorContacts = (state) => state.contactsData.items;
export const getIsLoading = (state) => state.contactsData.isLoading;
export const getError = (state) => state.contactsData.error;
