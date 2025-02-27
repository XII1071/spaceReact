import {Action} from 'redux'

export type SetTodayAction = Action & {today: Date}

export type Actions = SetTodayAction & {}
