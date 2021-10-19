import test from "ava"
import { format } from "../dist/index.js"

test(`axios`, async t => {
  t.truthy(format, `Get repos`)
})
