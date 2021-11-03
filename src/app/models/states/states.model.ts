import {Status} from '../status/status.model';

export interface State {
    id?: number;
    description?: string;
    created?: Date;
    updated?: Date;
    status?: Status; 
}