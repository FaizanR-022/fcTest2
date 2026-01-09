export const getErrorMessage = (err, msg = "Something went Wrong") => {
  if (err.response) {
    return err.response.data?.message || err.response.data?.error || msg;
  } else if (err.request) {
    console.log(err);
    return "Network Error. Check your connection";
  } else {
    return err.message || msg;
  }
};

export const handleApiCall = async (apiCall, errMsg) => {
  try {
    const response = await apiCall();
    return response.data.data; // data: {success:true/false, data: {token, user}}
  } catch (err) {
    throw new Error(getErrorMessage(err, errMsg));
  }
};
