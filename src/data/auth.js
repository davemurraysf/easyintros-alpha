// auth.js
export const saveUserData = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  export const getUserData = () => {
    const userDataString = localStorage.getItem('userData');
    return userDataString ? JSON.parse(userDataString) : null;
  };
  
  export const clearUserData = () => {
    localStorage.removeItem('userData');
  };
  export const refreshToken = async () => {
    const userData = getUserData();
    if (!userData) return;
  
    const { email, password, userTokenExpiration } = userData;
    const currentTime = Math.floor(Date.now() / 1000);
  
    // Check if the token is about to expire or has expired
    if (currentTime >= userTokenExpiration) {
      try {
        const response = await fetch('https://easyintros.com/api/1.1/wf/refreshTokenApi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), // or use current token if the API supports it
        });
  
        const data = await response.json();
  
        if (data.status === 'success') {
          const newExpirationTime = currentTime + data.response.expires;
          saveUserData({ ...userData, userToken: data.response.token, userTokenExpiration: newExpirationTime });
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        // Handle error (e.g., redirect to login)
      }
    }
  };
  
