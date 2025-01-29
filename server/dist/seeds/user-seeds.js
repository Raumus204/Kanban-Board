import { User } from '../models/user.js';
export const seedUsers = async () => {
    await User.bulkCreate([
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
        { username: 'Cory', password: 'password' },
    ], { individualHooks: true });
};
//# sourceMappingURL=user-seeds.js.map