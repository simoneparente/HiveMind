export interface AuthStatus{
    username: string | null;
    token: string | null;
    isAuthenticated: boolean;
}