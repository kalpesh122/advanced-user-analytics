// responseUtil.ts

import { Response } from 'express';

export enum HttpStatusCode {
  // Informational
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,

  // Success
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Redirection
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,

  // Server Errors
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export type ResponseData = Record<string, any>;

export interface ResponseOptions {
  status?: HttpStatusCode;
  headers?: Record<string, string>;
  message?: string;
  data?: ResponseData;
  pagination?: PaginationOptions;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
}

export const sendResponse = (res: Response, options: ResponseOptions): void => {
  const {
    status = HttpStatusCode.OK,
    headers = {},
    message = 'Success',
    data = {},
    pagination,
  } = options;

  const response = {
    status: 'success',
    message,
    data,
    pagination,
  };

  res.status(status);

  // Set custom headers if provided
  Object.keys(headers).forEach(key => {
    res.setHeader(key, headers[key]);
  });

  res.json(response);
};

export const sendError = (res: Response, options: ResponseOptions): void => {
  const {
    status = HttpStatusCode.INTERNAL_SERVER_ERROR,
    headers = {},
    message = 'Internal Server Error',
  } = options;

  const response = {
    status: 'error',
    message,
  };

  res.status(status);

  // Set custom headers if provided
  Object.keys(headers).forEach(key => {
    res.setHeader(key, headers[key]);
  });

  res.json(response);
};

export const sendNotFound = (res: Response, options: ResponseOptions): void => {
  const {
    status = HttpStatusCode.NOT_FOUND,
    headers = {},
    message = 'Not Found',
  } = options;

  const response = {
    status: 'error',
    message,
  };

  res.status(status);

  // Set custom headers if provided
  Object.keys(headers).forEach(key => {
    res.setHeader(key, headers[key]);
  });

  res.json(response);
};
