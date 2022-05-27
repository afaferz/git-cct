export interface IState {
    show?: boolean;
    message: string;
    type: 'error' | 'info' | 'success';
    id?: null | number;
    timeout?: number;
}