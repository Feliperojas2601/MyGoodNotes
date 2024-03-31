export interface ControllerResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}
