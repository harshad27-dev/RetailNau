import prisma from "../config/prisma";
import { CreateProfileDTO, UpdateProfileDTO } from "../types/types";

export const userService = {

    async createProfile(data: CreateProfileDTO) {
        return prisma.userProfile.create({
            data,
        });
    },

    async updateProfile(userId: string, data: UpdateProfileDTO) {
        return prisma.userProfile.upsert({
            where: { userId },
            create: { userId, ...data },
            update: data,
        });
    },

    async getProfile(userId: string) {
        const profile = await prisma.userProfile.findUnique({
            where: { userId },
        });

        if (!profile) {
            const error: any = new Error("Profile not found");
            error.statusCode = 404;
            throw error;
        }
        return profile;
    },
};