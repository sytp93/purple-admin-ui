import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";

export const chargerSampleItems = [
  {
    id: 1,
    code: "A0001",
    brand: "SK시그넷",
    name: "완속충전기",
    price: 1550000,
    status: "USE",
    createdAt: dayjs("2023-08-07T10:00:00+09:00"),
    updatedAt: dayjs("2023-08-07T10:00:00+09:00"),
  },
  {
    id: 2,
    code: "A0002",
    brand: "나이스차저",
    name: "급속충전기",
    price: 230000,
    status: "USE",
    createdAt: dayjs("2023-08-02T11:00:00+09:00"),
    updatedAt: dayjs("2023-08-02T11:00:00+09:00"),
  },
  {
    id: 3,
    code: "A0003",
    brand: "한화모티브",
    name: "완속",
    price: 1290000,
    status: "WAIT",
    createdAt: dayjs("2023-08-02T12:00:00+09:00"),
    updatedAt: dayjs("2023-08-02T12:00:00+09:00"),
  },
  {
    id: 4,
    code: "A0004",
    brand: "이피트",
    name: "급속",
    price: 47000,
    status: "STOP",
    createdAt: dayjs("2023-08-02T13:00:00+09:00"),
    updatedAt: dayjs("2023-08-02T13:00:00+09:00"),
  },
  {
    id: 5,
    code: "A0005",
    brand: "휴맥스이브이",
    name: "완속",
    price: 60000,
    status: "STOP",
    createdAt: dayjs("2023-08-02T14:00:00+09:00"),
    updatedAt: dayjs("2023-08-02T14:00:00+09:00"),
  },
  {
    id: 6,
    code: "A0006",
    brand: "하이차저",
    name: "급속",
    price: 25000,
    status: "WAIT",
    createdAt: dayjs("2023-08-02T15:00:00+09:00"),
    updatedAt: dayjs("2023-08-02T15:00:00+09:00"),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page ? Number(req.query.page) : 1;

  res.status(200).json({
    code: 0,
    message: "OK",
    data: {
      items: page === 1 ? chargerSampleItems.slice(0, 5) : [chargerSampleItems[5]],
      page: {
        currentPage: page,
        pageSize: 5,
        totalPage: 1,
        totalCount: chargerSampleItems.length,
      },
    },
  });
}
