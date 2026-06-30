import api from "./api";

export const LeagueService = {
  getMyLeague: (): Promise<any> => api.get(`/league/me`),
  getTiers: (): Promise<any> => api.get(`/league/tiers`),
};
