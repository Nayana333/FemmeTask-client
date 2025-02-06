console.log(import.meta.env.VITE_APP_BASEURL);

const config = {
    baseURL: import.meta.env.VITE_APP_BASEURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  export const baseURL = config.baseURL;
  export default config;
  