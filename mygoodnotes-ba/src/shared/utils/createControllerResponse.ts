import { ControllerResponse } from '../interfaces/controllerResponse.interface';

export function createControllerResponse<T>(
  data: T,
  status: number,
  message: string,
  success: boolean,
): ControllerResponse<T> {
  return {
    data,
    message,
    success,
    status,
  };
}
