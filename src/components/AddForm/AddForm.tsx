import React from 'react';
import { Modal, Form, Input } from 'antd';

export interface IAddFormValues {
  name: string;
  description: string;
}

interface IAddFormProps {
  isModalOpen: boolean;
  onSave: (values: IAddFormValues) => void;
  onCancel: () => void;
}

const AddForm: React.FC<IAddFormProps> = ({ isModalOpen, onCancel, onSave }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Add a new task"
      visible={isModalOpen}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSave({ name: values.name, description: values.description });
            console.log(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} name="add task">
        <Form.Item
          name="name"
          label="Enter the title"
          rules={[{ required: true, message: 'Please input the title of task' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="description" label="Enter description">
          <Input></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddForm;