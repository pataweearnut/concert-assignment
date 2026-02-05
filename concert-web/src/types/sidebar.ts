import { Role } from ".";

export interface SidebarItem {
    label: string;
    href?: string;
    icon: string;
    roles: Role[];
    onClick?: () => void;
}