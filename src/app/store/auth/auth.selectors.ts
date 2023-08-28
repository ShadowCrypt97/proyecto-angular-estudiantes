import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";

export const selectorAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(selectorAuthState, (state) => state.authUser);

export const selectAuthIsAdmin = createSelector(selectorAuthState, (state) => state.authUser?.roleId === 1)