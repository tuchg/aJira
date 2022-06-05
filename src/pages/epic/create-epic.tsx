import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { Container } from "../project-list/project-modal";
import { ErrorBox } from "../../components/lib";
import React, { useEffect } from "react";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useProjectIdInUrl } from "../kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        <h1>创建任务组</h1>
        <ErrorBox error={error} />
        <Form
          form={form}
          layout={"vertical"}
          style={{ width: "40rem" }}
          onFinish={onFinish}
        >
          <Form.Item
            label={"名称"}
            name={"name"}
            rules={[{ required: true, message: "请输入任务组名" }]}
          >
            <Input placeholder={"请输入任务组名"} />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button loading={isLoading} type={"primary"} htmlType={"submit"}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </Drawer>
  );
};
