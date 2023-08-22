import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models/user.model';

export const userFeatureKey = 'user';

export interface State {
  data: User[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
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
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

