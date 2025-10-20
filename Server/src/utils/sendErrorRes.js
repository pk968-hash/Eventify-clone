export const sendErrorRes = (res, statusCode, isSuccess, successMessage) => {
  res.status(statusCode).json({ success: isSuccess, message: successMessage });
};
