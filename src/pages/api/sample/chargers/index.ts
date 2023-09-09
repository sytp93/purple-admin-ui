import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const apiUrl = 'http://localhost:8888/api/chargers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page ? Number(req.query.page) : 1;
  console.log("req", req.query);
  switch (req.method) {
    case "GET":
      const chargerList = await axios.get(apiUrl, {
        params: {
          productCode: req.query.productCode,
          searchType: req.query.searchType,
          searchText: req.query.searchText,
        } // 이 부분의 params를 req.query로 보내는거랑 현재 형태랑 어느 방식이 더 좋을까?
      });
      return res.status(200).json({
        code: 0,
        message: "OK",
        data: {
          items: chargerList.data,
          page: {
            currentPage: page,
            pageSize: 5,
            totalPage: 1,
            totalCount: chargerList.data.length,
          }
        }
      });

    case "POST":
      const createCharger = await axios.post(apiUrl, req.body);
      return res.status(200).json({
        code: 0,
        mesaage: "OK",
      })


    default:
      return res.status(405).json({
        code: -1,
        message: "Method Not Allowed",
        data: {},
      });
  }
}
