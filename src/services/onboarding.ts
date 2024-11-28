import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const userOnboarding = async (phoneNumber: string) => {
  try {
    // Validate phone number format
    if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    // Send verification request
    const response = await api.post('/onboarding/verify-phone', { phoneNumber });

    // Handle different response scenarios
    switch (response.status) {
      case 200:
        return {
          verified: true,
          message: 'Phone number verified successfully',
          data: response.data
        };
      case 201:
        return {
          verified: true,
          newUser: true,
          message: 'New user registration initiated',
          data: response.data
        };
      default:
        throw new Error('Unexpected response from verification service');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific API error responses
      switch (error.response?.status) {
        case 400:
          throw new Error('Invalid phone number');
        case 429:
          throw new Error('Too many verification attempts. Please try again later.');
        case 500:
          throw new Error('Server error. Please try again.');
        default:
          throw new Error(error.response?.data?.message || 'Verification failed');
      }
    }
    throw error;
  }
};

// Verification code validation
export const verifyVerificationCode = async (phoneNumber: string, code: string) => {
  try {
    const response = await api.post('/onboarding/verify-code', { phoneNumber, code });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('Invalid verification code');
        case 401:
          throw new Error('Code has expired. Request a new code.');
        default:
          throw new Error('Verification failed');
      }
    }
    throw error;
  }
};
