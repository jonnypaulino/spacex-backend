const Rocket = require("../../rockets/model/model");
const Launch = require("../model/model")

const RocketsController = () => {


    const getRocket = async (req, res) => {
        try {

            const allLaunches = await Rocket.findAll();


            return res.status(200).json({
                result: allLaunches,
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    }

    
    return {
        getRocket
    }
}

module.exports = RocketsController