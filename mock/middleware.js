module.exports = (req, resp, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return resp.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return resp.status(400).json({ message: "登录失败" });
    }
  }
  next();
};
