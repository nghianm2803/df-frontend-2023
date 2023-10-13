/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  LoginResponse,
  LoginRequest,
  MessageResponse,
  SignupRequest
} from '.././model'


  
  /**
 * Login to portal by email
 * @summary Login to portal
 */
export const login = (
    loginRequest: LoginRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<LoginResponse>> => {
    return axios.post(
      `/auth/login`,
      loginRequest,options
    );
  }


/**
 * Signup
 * @summary Signup
 */
export const signup = (
    signupRequest: SignupRequest, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<MessageResponse>> => {
    return axios.post(
      `/auth/signup`,
      signupRequest,options
    );
  }


