module.exports = (sequelize, Sequelize) => {
  return sequelize.define("drum", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    size: {
      type: Sequelize.STRING
    },
    wood_type: {
      type: Sequelize.STRING
    },
    color: {
      type: Sequelize.STRING
    },
    drum_type: {
      type: Sequelize.STRING
    },
    brand: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,

    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });
};
