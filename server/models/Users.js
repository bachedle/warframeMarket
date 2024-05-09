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
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure username is unique
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
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
