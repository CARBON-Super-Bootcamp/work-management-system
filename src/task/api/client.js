async function client(endpoint, { method, body, ...customConf } = {}) {
  const headers = {};

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  if (body) {
    config.body = body;
  }

  let data;
  try {
    console.log(endpoint, config)
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }

    // console.log(data)
    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

client.get = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'GET', ...customConf });
};

client.post = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'POST', body, ...customConf });
};

client.put = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'PUT', body, ...customConf });
};

module.exports = { client };
