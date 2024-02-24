/*
------------------------------------------------------------------------------------------------------------------------
AgenCentric Post Login
------------------------------------------------------------------------------------------------------------------------
*/ 
/*
------------------------------------------------------------------------------------------------------------------------
EasyIntros Get UserInfo
------------------------------------------------------------------------------------------------------------------------
*/ 
export const fetchEasyIntrosUserInfo = async (UserToken) => {
  //console.log('Easy Intros UserToken API file:', UserToken);
  try {
    const response = await fetch('https://easyintros.com/api/1.1/wf/getuserinfo', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + UserToken }
    });
  
      const data = await response.json();
      //console.log('Easy Intros data:', data);
      if (data.status === 'success') {
        return data.response;
      } else {
        throw new Error('EasyIntros UserInfo call failed');
      }
    } catch (error) {
      throw new Error('Error during EasyIntros UserInfo API call: ' + error.message);
    }
  };
  /*
------------------------------------------------------------------------------------------------------------------------
EasyIntros Post Login
------------------------------------------------------------------------------------------------------------------------
*/ 
export const fetchEasyIntrosToken = async (EasyIntrosUsername, EasyIntrosPassword) => {
    try {
      const response = await fetch('https://easyintros.com/api/1.1/wf/loginapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: EasyIntrosUsername,
          password: EasyIntrosPassword,
        }),
      });
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.response; // Return the API response data
      } else {
        throw new Error('Agencentric API call failed');
      }
    } catch (error) {
      throw new Error('Error during Agencentric API call: ' + error.message);
    }
  };

  /*
------------------------------------------------------------------------------------------------------------------------
EasyIntros Get Tasks
------------------------------------------------------------------------------------------------------------------------
*/ 
export const fetchEasyIntrosTasks = async (UserToken) => {
  //console.log('Easy Intros UserToken API file:', UserToken);
  try {
    const response = await fetch('https://easyintros.com/api/1.1/wf/getorgtasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + UserToken }
    });
  
      const data = await response.json();
      //console.log('Easy Intros data:', data);
      if (data.status === 'success') {
        return data;
      } else {
        throw new Error('EasyIntros UserInfo call failed');
      }
    } catch (error) {
      throw new Error('Error during EasyIntros UserInfo API call: ' + error.message);
    }
  };