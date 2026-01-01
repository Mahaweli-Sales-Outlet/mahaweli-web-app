import type { AppStore } from "@/redux/store";

let store: AppStore | null = null;

/**
 * Injects the Redux store into the API client
 * This function should be called in main.tsx immediately after creating the store
 * and BEFORE rendering the app. This allows the response interceptor to access
 * the store for dispatching logout actions without causing circular dependencies.
 *
 * @param _store - The Redux store instance
 */
export function injectStore(_store: AppStore) {
  store = _store;
}

/**
 * Gets the injected Redux store
 * Returns null if store hasn't been injected yet
 */
export function getStore(): AppStore | null {
  return store;
}
