export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = "userToken";

  const expirationDays = 7;
  const cookieExpirationDate = new Date(
    Date.now() + expirationDays * 24 * 60 * 60 * 1000
  );

  return res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: cookieExpirationDate,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
