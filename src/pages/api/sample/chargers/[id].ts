import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const apiUrl = 'http://localhost:8888/api/chargers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chargerId = req.query.id;

  switch (req.method) {
    case "GET":
      try {
        const response = await axios.get(`${apiUrl}/${chargerId}`, {
          params: {
            chargerId: chargerId,
          },
        });

        const item = response.data;

        if (!item) {
          return res.status(400).json({
            code: -1,
            message: "상품 정보를 찾을 수 없습니다.",
            data: {},
          });
        }

        return res.status(200).json({
          code: 0,
          message: "OK",
          data: item,
        });

      } catch (error) {
        console.error(error);
      }

    case "PUT":
      await axios.put(`${apiUrl}/${chargerId}`, req.body, {
        params: {
          chargerId: chargerId,
        }
      })
      // 수정
      return res.status(200).json({
        code: 0,
        message: "OK",
      });

    case "DELETE":
      await axios.delete(`${apiUrl}/${chargerId}`, {
        params: {
          chargerId: chargerId
        }
      });
      return res.status(200).json({
        code: 0,
        message: "OK",
      });

    default:
      return res.status(500).json({
        code: -1,
        message: "서버 오류",
        data: {},
      });
  }
}
