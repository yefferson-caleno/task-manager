import {Status} from '../status/status.model';

export interface Role {
    id?: number;
    description?: string;
    created?: Date;
    updated?: Date;
    status?: Status; 
}