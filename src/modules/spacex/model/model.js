// models/Launch.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/config');

const Launch = sequelize.define('Launch', {
    fairings: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    links: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    static_fire_date_utc: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    static_fire_date_unix: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    net: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    window: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rocket: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    success: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    failures: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    crew: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ships: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    capsules: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    payloads: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    launchpad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    flight_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_utc: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_unix: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_local: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_precision: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    upcoming: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    cores: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    auto_update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    tbd: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    launch_library_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
});

module.exports = Launch;
