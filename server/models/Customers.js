module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "Customers",
    {
      ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );

  Customers.associate = (models) => {
    Customers.belongsTo(models.Users, {
      foreignKey: "UserID", // Name of the foreign key column in the Customers table
      targetKey: "ID", // Name of the primary key column in the Users table
      onDelete: "CASCADE", // Define the onDelete behavior (optional)
    });
  };

  return Customers;
};
