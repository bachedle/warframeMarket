module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
      },
    },
    {
      timestamps: false,
    }
  );

  return Users;
};
