export interface CreateProfileDTO {
    userId: string;
    name?: string;
    email?: string;
    avatar?: string;
    address?: string;
}

export interface UpdateProfileDTO {
    name?: string;
    email?: string;
    avatar?: string;
    address?: string;
}