import {config} from '../config'

const baseURL = config.baseUrl+config.apiV1

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractApiData = any

export interface IHttpRequestOptions {
  useCredentials: boolean
}

export const defaultHttpRequestOptions = {
  useCredentials: false
}

export const changedHttpRequestOptions = {
  useCredentials: true
}

export interface IHttpClient {
  post: <Payload, Response>(url:string, payload: Payload, options?: IHttpRequestOptions) => Promise<Response>
  put: <Payload, Response>(url:string, payload: Payload, options?: IHttpRequestOptions) => Promise<Response>
  get: <Response>(url:string, options?: IHttpRequestOptions) => Promise<Response>
}

export class HttpClient {
  private async execute (url:string, method: string, payload?: AbstractApiData, 
    options: IHttpRequestOptions = defaultHttpRequestOptions
    ) {
     const token = localStorage.getItem('token')
     const header = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    }
    if (token&&!options.useCredentials) {
      header.Authorization = `Bearer ${token}`
    }
        const response = await fetch(`${baseURL}/${url}/`, {
          method: method,
          headers: header,
          body: JSON.stringify(payload),
        })
        if (response.ok) {
          return await response.json()
        }
        const e = await response.text()
        throw new Error(e)
      }
    /*
    * We're using Promise<any> here, to avoid extra code
    * for casting from 'unknown' to required type.
    * */

    // eslint-disable-next-line
    async post(url:string, payload: AbstractApiData, options?: IHttpRequestOptions): Promise<AbstractApiData> {
      return await this.execute(url, 'POST',  payload, options)
    }

    // eslint-disable-next-line
    async get(url:string, options?: IHttpRequestOptions): Promise<AbstractApiData> {
        return await this.execute(url, 'GET', options)
    }

    async put(url:string, payload: AbstractApiData, options?: IHttpRequestOptions): Promise<AbstractApiData> {
      return await this.execute(url, 'PUT',  payload, options)
  }
}