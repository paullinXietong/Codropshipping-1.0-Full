/*
 * @Descripttion: 
 * @Author: Simple
 * @Date: 2022-11-02 17:06:22
 */
import * as axios from 'axios'

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}