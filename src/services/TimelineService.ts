import UserError from "@/errors/User/UserError";
import UserService from "./UserService";
import PostService from "./PostService";

class TimelineSerivice{
    async getTimeline(userId: number){
        if(!userId) throw new UserError('Invalid user');

        const user = await UserService.getUserById(userId);
        if(!user) throw new UserError('User not found');

        const followed = await UserService.getListOfFollowers(userId);
        if(followed.length === 0) throw new UserError('No followers found');
        
        const followedIds = followed.map(follower => follower.id);
        const timeline = await PostService.getUserTimeLine(userId, followedIds);
        
        return timeline;
    }
}

export default new TimelineSerivice();
