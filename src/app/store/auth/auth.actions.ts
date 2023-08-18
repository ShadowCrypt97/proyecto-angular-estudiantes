import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/auth/models/authPayload.model";


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'set auth user': props<{ payload: User | null }>()
    }
})