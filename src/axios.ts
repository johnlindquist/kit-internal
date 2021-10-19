import axios from "axios"
import { AxiosInstance } from "axios"

declare global {
  var get: AxiosInstance["get"]
  var put: AxiosInstance["put"]
  var post: AxiosInstance["post"]
  var patch: AxiosInstance["patch"]

  namespace NodeJS {
    interface Global {
      get: AxiosInstance["get"]
      put: AxiosInstance["put"]
      post: AxiosInstance["post"]
      patch: AxiosInstance["patch"]
    }
  }
}

global.get = axios.get
global.put = axios.put
global.post = axios.post
global.patch = axios.patch
