export type Role = 'USER' | 'SHOP_OWNER';

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
}
