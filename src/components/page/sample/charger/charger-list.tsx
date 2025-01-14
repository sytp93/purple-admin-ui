import { deleteCharger, ICharger, useChargers } from "@/client/sample/charger";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Dropdown, MenuProps, message, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";
import React, { useCallback, useMemo, useState } from "react";

// 데이터 목록을 테이블 형태로 조회 하는 컴포넌트

const ChargerList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  console.log("router", router.query.searchType);

  const { data, error, isLoading } = useChargers(
    {
      page: router.query.page ? Number(router.query.page) : 1,
      productCode: router.query.productCode ? String(router.query.productCode) : "",
      searchType: router.query.searchType ? String(router.query.searchType) : "",
      searchText: router.query.searchText ? String(router.query.searchText) : ""
    }
  );

  // 페이징 기능
  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteCharger(id);
      messageApi.success("삭제되었습니다.");
    } catch (e: unknown) {
      messageApi.error("에러가 발생했습니다.");
    }
  };

  // 로우의 셀렉트 박스를 클릭 시 해당 로우의 id를 가져온다.
  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    // set을 해줘도 해당 변수의 값이 바뀌지 않는 이유?
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);


  // 체크박스 선택 후 일괄수정 버튼 활성화 되었을때 드롭다운 메뉴 기능
  const modifyDropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "statusUpdate",
        label: <a onClick={() => console.log(selectedRowKeys)}>상태수정</a>,
      },
    ],
    [selectedRowKeys]
  );

  // 테이블 로우를 클릭하는 변수
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // 로우가 클릭 되었을 때 일괄수정 버튼을 활성화 되게하는 조건을 만드는 변수
  const hasSelected = selectedRowKeys.length > 0;

  //테이블의 컬럼을 헤더 생성하는 변수
  const columns: ColumnsType<ICharger> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: ICharger) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/sample/charger/edit/${record.chargerId}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="충전기를 삭제하시겠습니까?"
              onConfirm={() => handleDelete(record.chargerId)}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    },
    {
      title: "충전기코드",
      dataIndex: "chargerCode",
      width: 100,
    },
    {
      title: "충전기 모델명",
      dataIndex: "chargerName",
      render: (value: string, record: ICharger) => {
        return (
          <span>
            <span className="px-2 py-1 mr-1 bg-gray-100 rounded">{record.chargerBrand}</span>
            <span>{value}</span>
          </span>
        );
      },
    },
    {
      title: "금액",
      dataIndex: "chargerPrice",
      align: "center",
      width: 100,
      render: (value: number) => {
        return <p>{numeral(value).format("0,0")}원</p>;
      },
    },
    {
      title: "충전기 상태",
      dataIndex: "chargerStatus",
      align: "center",
      width: 100,
    },
    {
      title: "생성일시",
      dataIndex: "createdAt",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
    {
      title: "수정일시",
      dataIndex: "updatedAt",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("hh:mm")}</span>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }
  // DefaultTableBtn 테이블 상단의 버튼을 정렬해주는 컴포넌트
  // DefaultTable 기본 테이블 레이아웃 컴포넌트
  return (
    <>
      {contextHolder}
      <DefaultTableBtn className="justify-between">
        <div>
          <Dropdown disabled={!hasSelected} menu={{ items: modifyDropdownItems }} trigger={["click"]}>
            <Button>일괄수정</Button>
          </Dropdown>

          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list">
          <Button className="btn-with-icon" icon={<Download />}>
            엑셀 다운로드
          </Button>
          <Button type="primary" onClick={() => router.push("/sample/charger/new")}>
            충전기 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<ICharger>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.data.items || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 5,
          total: data?.data.page.totalCount || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.data.page.totalCount}
      />
    </>
  );
};
// 해당 컴포넌트는 빠른 조회를 위해 React.memo로 감싸준다.
export default React.memo(ChargerList);
