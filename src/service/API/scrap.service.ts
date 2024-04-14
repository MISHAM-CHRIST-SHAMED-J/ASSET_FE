/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class AssetScrap {
  getAssetScrap = async (page: number, limit: number) => {
    return await axios.get<any>(
      `${API_POINT}/api/get_Asset_Scrap?page=${page}&limit=${limit}`
    );
  };

  addAssetScrap = async (payload: any) => {
    return await axios.post<any>(`${API_POINT}/api/add_Asset_Scrap`, payload);
  };

  editAssetScrap = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/edit_Asset_Scrap?id=${id}`,
      payload
    );
  };

  deleteAssetScrap = async (id: number) => {
    return await axios.patch<any>(
      `${API_POINT}/api/delete_Asset_Scrap?id=${id}`
    );
  };

  searchAssetScrap = async (val: any) => {
    return await axios.get<any>(
      `${API_POINT}/api/search_Asset_Scrap?search=${val}`
    );
  };
}

export default new AssetScrap();
