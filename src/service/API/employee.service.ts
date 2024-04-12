/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class EmployeeService {
  addEmployeeMaster = async (payload: any) => {
    return await axios.post<any>(`${API_POINT}/api/add_employee`, payload);
  };

  EditEmployeeMaster = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/edit_employee?id=${id}`,
      payload
    );
  };

  deleteEmployeeMaster = async (id: number, payload: any) => {
    return await axios.patch<any>(
      `${API_POINT}/api/delete_employee?id=${id}`,
      payload
    );
  };

  searchEmployeeMaster = async (val: any) => {
    return await axios.get<any>(
      `${API_POINT}/api/search_employee?search=${val}`
    );
  };

  getEmployeeMaster = async (page: number, limit: number, status: boolean) => {
    return await axios.get<any>(
      `${API_POINT}/api/get_employee?page=${page}&limit=${limit}&status=${status}`
    );
  };
}

export default new EmployeeService();
