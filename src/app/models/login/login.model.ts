import { Role } from '../roles/roles.model';
import { Team } from '../teams/team.model';

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface LoginResponse {
    name?: string;
    email?: string;
    role?: Role;
    team?: Team;
}