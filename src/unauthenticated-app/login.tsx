import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./index";

export const LoginPage = () => {
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? (
        <div>
          登录成功,用户名:{user?.name}
          token:{user?.token}
        </div>
      ) : (
        ""
      )}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LoginButton type={"primary"} htmlType={"submit"}>
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};
