/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class AssetHistory {
  getAssettHistory = async (id:number) => {
    return await axios.get<any>(`${API_POINT}/api/get_Asset_tHistory?id=${id}`);
  };
}

export default new AssetHistory();
