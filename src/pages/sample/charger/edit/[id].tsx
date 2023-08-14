import { useCharger } from "@/client/sample/charger";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ChargerForm from "@/components/page/sample/charger/charger-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "충전기 수정",
};

const ChargerEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useCharger(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <ChargerForm id={router.query.id as string} initialValues={data.data} />;
};

ChargerEditPage.getLayout = getDefaultLayout;
ChargerEditPage.pageHeader = pageHeader;

export default ChargerEditPage;
