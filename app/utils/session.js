const sessionDebug = false;

function getSession() {
  // Get and parse the session from app storage.
  let session;
  const sessionString = localStorage.getItem('ItasGolfToken');
  if (sessionString) {
    session = JSON.parse(sessionString);
  }
  if (sessionDebug) {
    console.log('getSession', session);
  }
  // Return undefined if no session data.
  return session;
}

function setSession(session) {
  // Set the session in app storage as a string.
  localStorage.setItem('ItasGolfToken', JSON.stringify(session));
  if (sessionDebug) {
    console.log('setSession', session);
  }
}

function patchSession(field, value) {
  // Update a single value in app storage.
  const session = getSession();
  if (!session) {
    return;
  }
  session[field] = value;
  setSession(session);
  if (sessionDebug) {
    console.log('patchSession', field, value);
  }
}

function clearSession() {
  // Remove the session from app storage.
  localStorage.removeItem('ItasGolfToken');
  if (sessionDebug) {
    console.log('clearsSession');
  }
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

async function refreshSession(result, user) {
  const loginData = {
    token: result.token,
  };
  const loginObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  };

  const requestLoginURL = `${process.env.API_LOCATION}/public/login`;

  const userData = await fetch(requestLoginURL, loginObj)
    .then(checkStatus)
    .then(parseJSON);

  setSession({
    id: userData.user.uuid,
    email: user.user.email,
    displayName: userData.user.username,
    googleToken: result.token,
    itasToken: userData.token,
    refreshToken: user.user.refreshToken,
  });
}

export { getSession, setSession, patchSession, clearSession, refreshSession };
