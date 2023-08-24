const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/config');

const Rocket = sequelize.define('Rocket', {
    height: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    diameter: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    mass: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    first_stage: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    second_stage: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    engines: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    landing_legs: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    payload_weights: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    flickr_images: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    stages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    boosters: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cost_per_launch: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    success_rate_pct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    first_flight: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wikipedia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
});

module.exports = Rocket;
