module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
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
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ModRank: {
      type: DataTypes.INTEGER, // Corrected to lowercase "integer"
      allowNull: true,
    },
    Rarity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Duncat: {
      type: DataTypes.INTEGER, // Corrected to lowercase "integer"
      allowNull: true,
    },
    MasteryRank: {
      type: DataTypes.INTEGER, // Corrected to lowercase "integer"
      allowNull: true,
    },
    Tax: {
      type: DataTypes.DOUBLE, // Corrected to uppercase "DOUBLE"
      allowNull: true,
    },
  });

  return Products;
};
