import { User, UserRole } from "../models/user.model.js";
import { sequelize } from "../sequelize.js";
import { hashPassword } from "../../shared/utils/password.js";

const adminSeedData = {
  name: process.env.ADMIN_NAME ?? "Admin",
  email: process.env.ADMIN_EMAIL ?? "admin@example.com",
  password: process.env.ADMIN_PASSWORD ?? "Admin123!",
};

export const seedDefaultAdmin = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  const existingAdmin = await User.findOne({
    where: { email: adminSeedData.email },
  });

  if (existingAdmin) {
    if (existingAdmin.role !== UserRole.ADMIN) {
      existingAdmin.role = UserRole.ADMIN;
      existingAdmin.isVerified = true;
      await existingAdmin.save();
    }

    return existingAdmin;
  }

  const hashedPassword = await hashPassword(adminSeedData.password);

  const adminUser = await User.create({
    name: adminSeedData.name,
    email: adminSeedData.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    coins: 500,
    isVerified: true,
  });

  return adminUser;
};

const isDirectExecution = require.main === module;

if (isDirectExecution) {
  seedDefaultAdmin()
    .then((user) => {
      console.log(`Admin user seeded successfully: ${user.email}`);
    })
    .catch((error) => {
      console.error("Failed to seed admin user", error);
      process.exitCode = 1;
    });
}
