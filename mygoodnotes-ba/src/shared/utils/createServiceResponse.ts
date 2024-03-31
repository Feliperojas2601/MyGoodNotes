import { ServiceResponse } from '../interfaces/serviceResponse.interface';

export function createServiceResponse<T>(
  data: T,
  message: string,
  success: boolean,
): ServiceResponse<T> {
  return {
    data,
    message,
    success,
  };
}
