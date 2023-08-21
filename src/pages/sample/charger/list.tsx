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

ChargerListPage.getLayout = getDefaultLayout; // 사이드바 메뉴를 가져오는 코드
ChargerListPage.pageHeader = pageHeader; // 현재 메뉴의 헤더를 가져오는 코드

export default ChargerListPage;
