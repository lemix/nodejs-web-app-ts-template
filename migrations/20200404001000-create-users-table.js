function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            unique:true,
            primaryKey:true,
            allowNull: false
        },
        firstName: {
            type: Sequelize.DataTypes.STRING(32),
            defaultValue: false,
            allowNull: false
        },
        lastName: {
            type: Sequelize.DataTypes.STRING(32),
            defaultValue: false,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING(50),
            defaultValue: false,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
}

function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
}

module.exports = { up, down }