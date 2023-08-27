import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUser = createSelector(selectUserState, (state) => state.data)

export const selectRole = createSelector(selectUserState, (state) => state.roleOptions)
