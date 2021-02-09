async function client(endpoint, { method, body, ...customConf } = {}) {
    const headers = { 'Content-Type': 'application/json' };
  
    const config = {
      method,
      ...customConf,
      headers: {
        ...headers,
        ...customConf.headers,
      },
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    let data;
    try {
      const response = await window.fetch(endpoint, config);
      data = await response.json();
      if (!response.ok) {
        throw new Error(data.statusText);
      }
  
      return data;
    } catch (err) {
      return Promise.reject(err.message || data);
    }
  }
  
  client.get = (endpoint, customConf = {}) => {
    return client(endpoint, { method: 'GET', ...customConf });
  };
  
  module.exports = { client };
  