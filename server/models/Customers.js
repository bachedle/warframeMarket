module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "Customers",
    {
      ID: {
        type: DataTypes.INTEGER, // Corrected to lowercase "integer"
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Reputation: {
        type: DataTypes.INTEGER, // Corrected to lowercase "integer"
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  return Customers;
};
