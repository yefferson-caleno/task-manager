import { Status } from '../status/status.model';
import { Role } from '../roles/roles.model';
import { Team } from '../teams/team.model';

export interface User {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    created?: Date;
    updated?: Date;
    role?: Role;
    team?: Team;
    status?: Status;
}

export interface UserRequest {
    name?: string;
    email?: string;
    password?: string;
    roleId?: number;
    teamId?: number;
    statusId?: number;
}