export default interface BackServerResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  payload: T;
}
