/** Shared by server pages and client components during a static build. */
export const isMockMode =
  process.env.NEXT_PUBLIC_ADMIN_DATA_MODE === "mock" ||
  (process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_ADMIN_DATA_MODE !== "api");

/** Only local development may bypass administrator authentication. */
export const isMockAuthMode =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ADMIN_DATA_MODE !== "api";
