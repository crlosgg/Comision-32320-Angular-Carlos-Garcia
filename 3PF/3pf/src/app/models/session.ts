import { UserSession } from "./user-session";

export interface Session {
    activeSession: boolean;
    activeUser?: UserSession;
}