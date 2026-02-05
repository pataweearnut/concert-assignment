import { Role } from "./role";

export interface SidebarItem {
    label: string;
    href?: string;
    icon: string;
    roles: Role[];
    onClick?: () => void;
}