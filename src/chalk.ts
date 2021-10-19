let { default: chalkDefault }: any = await import("chalk")
import { ChalkFunction } from "chalk"

global.chalk = chalkDefault

declare global {
  var chalk: ChalkFunction

  namespace NodeJS {
    interface Global {
      chalk: ChalkFunction
    }
  }
}

export {}
