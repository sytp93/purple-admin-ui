import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export const apiData = async () => {
  try {
    const response = await axios.get('http://localhost:8888/get/charger')
    console.log(response.data[0]);
    return response.data;
  }
  catch (err) {
    console.log(err);
    throw err;
  }

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = req.query.page ? Number(req.query.page) : 1;
  const dataFromApi = await apiData();
  console.log("data", await apiData());
  res.status(200).json({
    code: 0,
    message: "OK",
    data: {
      items: page === 1 ? dataFromApi.slice(0, 5) : [dataFromApi[5]],
      page: {
        currentPage: page,
        pageSize: 5,
        totalPage: 1,
        totalCount: dataFromApi.length,
      },
    },
  });
}
