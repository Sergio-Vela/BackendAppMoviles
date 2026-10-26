import { User } from "./userModel"
import { UserProfile } from "./userProfileModel";
import { Censo } from "./censoModel";

export const registerModels = () => {

    User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });
    UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    User.hasMany(Censo, { foreignKey: "creadoPor", as: "censos" });
    Censo.belongsTo(User, { foreignKey: "creadoPor", as: "creador" });

    return { User, UserProfile, Censo };
}