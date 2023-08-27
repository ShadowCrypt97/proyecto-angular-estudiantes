import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User, UserWithRole } from '../models/user.model';
import { Role } from '../models/roles.model';

export const userFeatureKey = 'user';

export interface State {
  data: UserWithRole[],
  roleOptions: Role[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  roleOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false
    }
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
  on(UserActions.loadRoles, state => {
    return {
      ...state,
      loading: true
    }
  }),
  on(UserActions.loadRolesSuccess, (state, action) => {
    return {
      ...state,
      roleOptions: action.data,
      loading: false
    }
  }),
  on(UserActions.loadRolesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

