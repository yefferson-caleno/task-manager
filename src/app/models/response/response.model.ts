export interface Response {
    status: number,
    message: string,
    data?: any,
    errors?: Array<String>
}