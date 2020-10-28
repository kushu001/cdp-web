import React from 'react';
import { Modal } from 'antd';
import { UserListItem } from '../data';

export interface FormValueType extends Partial<UserListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<UserListItem>;
}

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { onCancel: handleUpdateModalVisible, updateModalVisible } = props;

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑用户"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
    />
  );
};

export default UpdateForm;
