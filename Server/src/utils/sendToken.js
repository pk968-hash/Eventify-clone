export const sendToken = (user, statusCode, message, res, req) => {
  const token = user.generateToken();
  const { password: pass, ...rest } = user._doc;
  const isProduction = process.env.NODE_ENV === "production";

  //first clear cookie if have
  const oldToken = req.cookies.eventfyToken;
  if (oldToken) {
    res.clearCookie("eventfyToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    });
  }

  //send new token
  res
    .status(statusCode)
    .cookie("eventfyToken", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : "Lax",
    })
    .json({
      success: true,
      user: rest,
      message,
    });
};
