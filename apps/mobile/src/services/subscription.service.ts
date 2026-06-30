import api from "./api";

export const SubscriptionService = {
  getPlans: (): Promise<any> => api.get(`/subscription/plans`),
  getMySubscription: (): Promise<any> => api.get(`/subscription/me`),
  subscribe: (planId: string): Promise<any> =>
    api.post(`/subscription/subscribe`, { planId }),
  cancel: (): Promise<any> => api.post(`/subscription/cancel`, {}),
};
