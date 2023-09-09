import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "../base";

export interface ICharger {
  chargerId: number;
  chargerCode: string;
  chargerName: string;
  chargerPrice: string;
  chargerBrand: string;
  chargerStatus: string;
  chargerCreateDate: string;
  chargerUpdateDate: string;
}

export interface IChargerFormValue extends Omit<ICharger, "id" | "createdAt" | "updatedAt"> { }

interface IChargersParams {
  page?: number;
  productCode?: string;
  searchDatePeriod?: string;
  searchDateType?: string;
  searchText?: string;
  searchType?: string;
  status?: string;
}

export interface IChargersResponse {
  code: number;
  message: string;
  data: {
    items: ICharger[];
    page: {
      currentPage: number;
      pageSize: number;
      totalPage: number;
      totalCount: number;
    };
  };
}

export interface IChargerResponse {
  code: number;
  message: string;
  data: ICharger;
}

export const useChargers = (params: IChargersParams = {}) => {
  return useSWR<IChargersResponse>(`api/sample/chargers?${qs.stringify(params)}`);
};

export const useCharger = (chargerId: string | number) => {
  return useSWR<IChargerResponse>(`api/sample/chargers/${chargerId}`);
};

export const createCharger = (value: IChargerFormValue) => {
  return fetchApi.post(`api/sample/chargers`, { body: JSON.stringify(value) });
};

export const updateCharger = (id: string, value: IChargerFormValue) => {
  return fetchApi.put(`api/sample/chargers/${id}`, { body: JSON.stringify(value) });
};

export const deleteCharger = (id: number) => {
  return fetchApi.delete(`api/sample/chargers/${id}`);
}
