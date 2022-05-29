import { useAuthA } from "../context/auth-context";
import { Form, Input } from "antd";
import { LoginButton } from "./index";
import { useAsync } from "../utils/use-async";

export const LoginPage = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuthA();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
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
        <LoginButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LoginButton>
      </Form.Item>
    </Form>
  );
};
