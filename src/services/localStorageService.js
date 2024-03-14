const localStorageService = {
    // Create or Update an item
    setItem: function (key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    },

    // Read an item
    getItem: function (key) {
        try {
            const serializedValue = localStorage.getItem(key);
            return serializedValue ? JSON.parse(serializedValue) : null;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return null;
        }
    },

    // Delete an item
    removeItem: function (key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage', error);
        }
    },

    // Clear all items
    clear: function () {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage', error);
        }
    }
};

export default localStorageService;