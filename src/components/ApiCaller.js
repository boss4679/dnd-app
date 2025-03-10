const API_BASE_URL = 'http://localhost:5000'; // Adjust based on your backend

export const ApiCaller = async (selectedOption, data) => {
  let endpoint = '';

  // Determine API endpoint based on the selected dropdown option
  switch (selectedOption) {
    case 'campaign':
      endpoint = '/campaigns';
      break;
    case 'session':
      endpoint = '/sessions';
      break;
    case 'character':
      endpoint = '/characters';
      break;
    case 'location':
      endpoint = '/locations';
      break;
    default:
      throw new Error('Invalid selection');
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}
export default ApiCaller;
