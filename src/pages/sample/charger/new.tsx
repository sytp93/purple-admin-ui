import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ChargerForm from "@/components/page/sample/charger/charger-form";

const pageHeader: IPageHeader = {
  title: "충전기 등록",
};

const ChargerNewPage: IDefaultLayoutPage = () => {
  return <ChargerForm initialValues={{ chargerStatus: "STOP" }} />;
};

ChargerNewPage.getLayout = getDefaultLayout;
ChargerNewPage.pageHeader = pageHeader;

export default ChargerNewPage;
