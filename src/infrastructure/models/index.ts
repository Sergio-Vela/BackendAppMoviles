import { User } from "./userModel"
import { UserProfile } from "./userProfileModel";

export const registerModels = () => {

    User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
    UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' })


    return {User, UserProfile}
}