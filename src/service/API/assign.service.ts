/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class AssetIssueService {
  getEmployeeDropDown = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_Employee_DropDown`);
  };

  getAssetDropDown = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_Asset_DropDown`);
  };

  getAssetDropForScrap = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_Asset_Drop_Scrap`);
  };

  getAssetDropHistory = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_Asset_Drop_History`);
  };

  addAssetIssue = async (payload: any) => {
    return await axios.post<any>(`${API_POINT}/api/add_assetIssue`, payload);
  };

  editAssetIssue = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/edit_assetIssue?id=${id}`,
      payload
    );
  };

  returnAssetIssue = async (id: number, payload: any, assetRef_id: number) => {
    return await axios.patch<any>(
      `${API_POINT}/api/return_assetIssue?id=${id}&assetRef_id=${assetRef_id}`,
      payload
    );
  };

  getAssetIssue = async (page: number, limit: number) => {
    return await axios.get<any>(
      `${API_POINT}/api/get_assetIssue?page=${page}&limit=${limit}`
    );
  };

  searchAssetIssue = async (val: any) => {
    return await axios.get<any>(
      `${API_POINT}/api/search_assetIssue?search=${val}`
    );
  };
}

export default new AssetIssueService();
