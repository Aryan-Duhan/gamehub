import { db } from "@/lib/db"

export const getUserByUsername = async (username:string) => {
    console.log("getUserByUsername called with:", username);
    try {
        const user = await db.user.findUnique({
            where : {
                username,
            },
            include : {
                stream : true,
            }
        });
        console.log("Database query result:", user);
        return user ;
    } catch (error) {
        console.error("Database error in getUserByUsername:", error);
        throw error;
    }
}

export const getUserById = async (id:string) => {
    const user = await db.user.findUnique({
        where : { id },
        include : {
            stream : true,
        },
    });
    return user ;
}