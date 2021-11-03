import { Role } from '../roles/roles.model';

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface LoginResponse {
    name?: string;
    email?: string;
    role?: Role;
}