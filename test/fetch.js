/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
// Helper to mock a success response (only once)
fetch.mockResponseSuccess = body => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(JSON.parse(body)) })
  );
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.reject({ errors: 'mock errors' })
    })
  );
};

const apiTestHelper = {
  JSON_PARSE_TIME: 100,
  MOCK_ERROR: { errors: 'mock errors' },

  fetchSuccess: body => {
    fetch.mockResponseSuccess(body);
  },

  fetchFailure: () => {
    fetch.mockResponseFailure();
  }
};

export default apiTestHelper;
