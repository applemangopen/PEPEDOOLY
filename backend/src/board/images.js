module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    "Images",
    {
      Images_uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Boards_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Boards",
          key: "Boards_id",
        },
      },
      Images_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Images_uploaded_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  Images.associate = function (models) {
    Images.belongsTo(models.Boards, {
      foreignKey: "Boards_id",
      as: "Board",
      onDelete: "CASCADE",
    });
  };

  return Images;
};
