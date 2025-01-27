/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class AssetService {
  getAssetMaster = async (page: number, limit: number, status: boolean) => {
    return await axios.get<any>(
      `${API_POINT}/api/get_asset?page=${page}&limit=${limit}&status=${status}`
    );
  };

  searchAssetMaster = async (val: any) => {
    return await axios.get<any>(`${API_POINT}/api/search_asset?search=${val}`);
  };

  addAssetMaster = async (payload: any) => {
    return await axios.post<any>(`${API_POINT}/api/add_asset`, payload);
  };

  editAssetMaster = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/edit_asset?id=${id}`,
      payload
    );
  };

  deleteAssetMaster = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/delete_asset?id=${id}`,
      payload
    );
  };

  addAssetCategory = async (payload: any) => {
    return await axios.post<any>(`${API_POINT}/api/add_assetCategory`, payload);
  };
  editAssetCategory = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/edit_assetCategory?id=${id}`,
      payload
    );
  };
  deleteAssetCategory = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/delete_assetCategory?id=${id}`,
      payload
    );
  };
  getAssetCategory = async (page: number, limit: any, status: boolean) => {
    return await axios.get<any>(
      `${API_POINT}/api/get_assetCategory?page=${page}&limit=${limit}&status=${status}`
    );
  };
  getAssetCategoryDrop = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_assetCategoryDrop`);
  };
}

export default new AssetService();
