import { AxiosError } from 'axios';

export interface BackendError extends AxiosError {
  response: {
    data: {
      error: string;
    };
  };
}
