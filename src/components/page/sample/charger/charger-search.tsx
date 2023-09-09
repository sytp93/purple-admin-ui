import { IProductFormValue } from "@/client/sample/product";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Checkbox, Form, Input, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const statusOptions = [
  { label: "전체", value: "ALL" },
  { label: "사용중", value: "USE" },
  { label: "사용중지", value: "STOP" },
  { label: "사용대기", value: "WAIT" },
];

const ChargerSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    // 검색폼에 원하는 내용을 입력한 내용을 검색 버튼 클릭 시 url 파라메터로 보낸다.
    // 현재 코드 상으로는 초기화 버튼에도 submit이 걸려있어서 해당 함수를 실행 시킨다.
    (formValue: IProductFormValue) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  return (
    // 해당 컴포넌트는 DefaultSearchForm을 사용하고 있습니다.
    // FieldInline 컴포넌트를 이용해 요소들을 정렬 시켜주고 있습니다.
    // onFinish props로 submit 기능이 발생되었을때 해당 함수를 실행 시킨다.
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <FieldInline>
          <Form.Item label="기간" name="searchDateType" initialValue="created">
            <Select dropdownMatchSelectWidth={false}>
              <Select.Option value="created">등록일자</Select.Option>
              <Select.Option value="updated">수정일자</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="searchDatePeriod">
            <DateRangeField />
          </Form.Item>
        </FieldInline>
        <div>
          <Form.Item name="status" label="판매상태">
            <Checkbox.Group options={statusOptions} />
          </Form.Item>
        </div>
        <div>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="chargerCode">
              <Select dropdownMatchSelectWidth={false}>
                <Select.Option value="chargerCode">충전기 코드</Select.Option>
                <Select.Option value="chargerName">충전기 모델명</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="searchText" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
        <div>
          <Form.Item name="productCode" label="상품번호">
            <Input.TextArea placeholder="복수입력시 쉼표(,) 또는 엔터(Enter)로 구분해주세요" />
          </Form.Item>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button htmlType="submit" className="btn-with-icon" onClick={() => form.resetFields()}>
          초기화
        </Button>
      </div>
    </DefaultSearchForm>
  );
};

export default React.memo(ChargerSearch);

