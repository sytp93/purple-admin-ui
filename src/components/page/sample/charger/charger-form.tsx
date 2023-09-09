import { createCharger, IChargerFormValue, updateCharger } from "@/client/sample/charger";
import CodemirrorEditor from "@/components/shared/form/control/codemirror-editor";
import QuillEditor from "@/components/shared/form/control/quill-editor";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Button, Divider, Form, Input, message, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";

interface IChargerFormProps {
  id?: string;
  initialValues?: Partial<IChargerFormValue>;
}

const ChargerForm = ({ id, initialValues }: IChargerFormProps) => {
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IChargerFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateCharger(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createCharger(formValue);
        messageApi.success("생성되었습니다");
      }
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다");
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IChargerFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="충전기 기본 정보를 입력해주세요">
          <FormGroup title="충전기 상태*">
            <Form.Item name="chargerStatus" rules={[{ required: true, message: "필수값입니다" }]}>
              <Radio.Group>
                <Radio value="USE">사용중</Radio>
                <Radio value="STOP">사용중지</Radio>
                <Radio value="WAIT">사용대기</Radio>
              </Radio.Group>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="브랜드*">
            <Form.Item name="chargerBrand" rules={[{ required: true, message: "필수값입니다" }]}>
              <Select style={{ maxWidth: 200 }} placeholder="브랜드를 선택하세요">
                <Select.Option value="SK시그넷">SK시그넷</Select.Option>
                <Select.Option value="나이스차저">나이스차저</Select.Option>
                <Select.Option value="한화모티브">한화모티브</Select.Option>
                <Select.Option value="이피트">이피트</Select.Option>
                <Select.Option value="휴맥스이브이">휴맥스이브이</Select.Option>
                <Select.Option value="하이차저">하이차저</Select.Option>
              </Select>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="충전기 모델명*">
            <Form.Item name="chargerName" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="충전기 모델명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="충전기 코드*">
            <Form.Item name="chargerCode" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="충전기 코드를 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="금액*">
            <Form.Item name="chargerPrice" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="금액을 입력하세요" />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="충전기 상세" description="충전기 상세 정보를 입력해주세요">
          <FormGroup title="충전기 상세">
            <Form.Item name="description">
              <QuillEditor />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="CSS/JS">
            <Form.Item name="css">
              <CodemirrorEditor />
            </Form.Item>
            <Form.Item name="js">
              <CodemirrorEditor />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(ChargerForm);
