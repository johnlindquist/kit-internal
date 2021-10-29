export { default as Convert } from "ansi-to-html"

export { config } from "dotenv-flow"

export { default as enquirer } from "enquirer"
export { default as minimist } from "minimist"

export { merge, NEVER, Observable, of } from "rxjs"
export {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  share,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs/operators"

export { default as stripAnsi } from "strip-ansi"

export {
  compareAsc,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  parseISO,
} from "date-fns"

export type Locale = {
  code?: string
  formatDistance?: (...args: Array<any>) => any
  formatRelative?: (...args: Array<any>) => any
  localize?: {
    ordinalNumber: (...args: Array<any>) => any
    era: (...args: Array<any>) => any
    quarter: (...args: Array<any>) => any
    month: (...args: Array<any>) => any
    day: (...args: Array<any>) => any
    dayPeriod: (...args: Array<any>) => any
  }
  formatLong?: {
    date: (...args: Array<any>) => any
    time: (...args: Array<any>) => any
    dateTime: (...args: Array<any>) => any
  }
  match?: {
    ordinalNumber: (...args: Array<any>) => any
    era: (...args: Array<any>) => any
    quarter: (...args: Array<any>) => any
    month: (...args: Array<any>) => any
    day: (...args: Array<any>) => any
    dayPeriod: (...args: Array<any>) => any
  }
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7
  }
}

export { Octokit } from "scriptkit-octokit"
export { default as generate } from "project-name-generator"
