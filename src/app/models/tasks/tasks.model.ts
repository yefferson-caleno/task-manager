import { Status } from '../status/status.model';
import { Team } from '../teams/team.model';
import { User } from '../users/users.model';
import { State } from '../states/states.model';

export interface Task {
    id?: number;
    title?: string;
    description?: string;
    taskInit?: Date;
    taskEnd?: Date;
    created?: Date;
    updated?: Date;
    userAssigned?: User;
    userCreated?: User;
    team?: Team;
    status?: Status;
    state?: State;
}

export interface TaskRequest {
    title?: string;
    description?: string;
    taskInit?: Date;
    taskEnd?: Date;
    created?: Date;
    updated?: Date;
    userAssignedId?: number;
    userCreatedEmail?: string;
    teamId?: number;
    statusId?: number;
    stateId?: number;
}