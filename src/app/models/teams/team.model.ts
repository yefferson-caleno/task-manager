
import {Status} from '../status/status.model';

export interface Team {
    id?: number,
    description?: string,
    created?: Date,
    updated?: Date,
    status?: Status 
}

export interface TeamRequest {
    description?: string,
    statusId?: number 
}