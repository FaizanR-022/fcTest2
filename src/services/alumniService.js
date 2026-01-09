// services/alumniService.js
import api from "./api";
import { API_ENDPOINTS } from "../constants/constants";
import { handleApiCall } from "../utils/apiHandler";

export const alumniService = {
  getAllAlumni: async (query) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_ALL_ALUMNI, { params: query }),
      "Failed to fetch alumni. Please try again."
    );
  },

  getAlumniById: async (id) => {
    return handleApiCall(
      () => api.get(API_ENDPOINTS.GET_ALUMNI_BY_ID.replace(":id", id)),
      "Failed to fetch alumni details. Please try again."
    );
  },
};

export default alumniService;
