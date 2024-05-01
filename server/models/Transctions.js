module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define("Transactions", {
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CustomerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  // Define association with the Products model to establish foreign key constraint
  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Customers, {
      foreignKey: "CustomerID", // Name of the foreign key column in the Transactions table
      targetKey: "ID", // Name of the primary key column in the Customers table
      onDelete: "CASCADE", // Define the onDelete behavior (optional)
    });

    Transactions.belongsTo(models.Products, {
      foreignKey: "ProductID", // Name of the foreign key column in the Transactions table
      targetKey: "ID", // Name of the primary key column in the Customers table
      onDelete: "CASCADE", // Define the onDelete behavior (optional)
    });
  };

  return Transactions;
};
