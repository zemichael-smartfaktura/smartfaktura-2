/**
 * Shared types for SmartFaktura (API contracts, domain types).
 * Used by apps/backend and apps/frontend.
 */

export type HealthResponse = {
  status: string;
  /** Present when env loaded and validated; confirms deployment env is OK */
  env?: "valid";
};
