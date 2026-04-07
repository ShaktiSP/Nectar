export const isConnected = async () => {
  try {
    // Send a lightweight HEAD request to check internet connectivity
    // HEAD method only fetches headers (faster, no body download)
    const response = await fetch('https://www.google.com', {
      method: 'HEAD',
    });

    // If response is successful (status 200–299), internet is working
    return response.ok;
  } catch {
    // If request fails (no network, DNS issue, etc.), return false
    return false;
  }
};