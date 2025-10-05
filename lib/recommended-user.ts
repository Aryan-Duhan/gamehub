import { db } from "./db";
import { getSelf } from "./auth-service";

export const getRecommendedUsers = async () => {
    await new Promise (resolve => setTimeout( resolve , 1000));
    let userId;

    try{
        const self = await getSelf();
        userId = self.id;
    }
    catch{
        userId = null;
    }
    let users = [];

    if (userId){
        users = await db.user.findMany({
            where : {
                NOT:{
                    id : userId,
                },
            },
            orderBy :{
                CreatedAt : "desc"

            }
        })
    }
    else{
        users = await db.user.findMany({
            orderBy: { CreatedAt: "desc" },
        });
    }
    return users;    
}