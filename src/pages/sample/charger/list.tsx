import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import ChargerList from "@/components/page/sample/charger/charger-list";
import ChargerSearch from "@/components/page/sample/charger/charger-search";

const pageHeader: IPageHeader = {
  title: "충전기 목록",
};

const ChargerListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <ChargerSearch />
      <ChargerList />
    </>
  );
};

ChargerListPage.getLayout = getDefaultLayout;
ChargerListPage.pageHeader = pageHeader;

export default ChargerListPage;
