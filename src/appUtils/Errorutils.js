export const parseApiError = error => {
  // ── Case 1: Server responded with an error (status code outside 2xx)
  if (error.response) {
    const status = error.response.status; // HTTP status code
    const serverMessage = error.response.data?.message; // Optional message from API

    // Handle common HTTP error codes
    switch (status) {
      case 400:
        // Bad request (invalid input, validation error, etc.)
        return serverMessage || 'Invalid request. Please check your input.';

      case 401:
        // Unauthorized (wrong credentials, expired token, etc.)
        return 'Incorrect username or password.';

      case 403:
        // Forbidden (user does not have permission)
        return 'You are not authorized to perform this action.';

      case 404:
        // Resource not found
        return 'Service not found. Please try again later.';

      case 429:
        // Too many requests (rate limiting)
        return 'Too many requests. Please slow down.';

      case 500:
      case 502:
      case 503:
        // Server-side errors
        return 'Server error. Please try again later.';

      default:
        // Fallback for any other status codes
        return serverMessage || `Something went wrong (Error ${status}).`;
    }
  }

  // ── Case 2: Request was sent but no response received
  if (error.request) {
    // Timeout error (request took too long)
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your connection.';
    }

    // General network issue
    return 'No response from server. Please check your internet.';
  }

  // ── Case 3: Something else went wrong (e.g., coding error, setup issue)
  return error.message || 'An unexpected error occurred.';
};