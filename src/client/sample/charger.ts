import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "../base";

// export interface ICharger {
//   id: number;
//   code: string;
//   brand: string;
//   name: string;
//   price: number;
//   status: string;
//   description?: string;
//   css?: string;
//   js?: string;
//   createdAt: ISO8601DateTime;
//   updatedAt: ISO8601DateTime;
// }

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

export const useCharger = (id: string | number) => {
  return useSWR<IChargerResponse>(`api/sample/chargers/${id}`);
};

export const createCharger = (value: IChargerFormValue) => {
  return fetchApi.post(`api/sample/chargers`, { body: JSON.stringify(value) });
};

export const updateCharger = (id: string, value: IChargerFormValue) => {
  return fetchApi.put(`api/sample/chargers/${id}`, { body: JSON.stringify(value) });
};
