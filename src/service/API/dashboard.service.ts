/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */

import axios from "axios";
import { API_POINT } from "../config";

class DashboardService {
  getDashboardDetails = async () => {
    return await axios.get<any>(`${API_POINT}/api/get_dashboard`);
  };
}

export default new DashboardService();
