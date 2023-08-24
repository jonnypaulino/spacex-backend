const Rocket = require("../../rockets/model/model");
const Launch = require("../model/model")

const SpacexController = () => {

    const getLaunches = async (req, res) => {
        try {
            const PAGE_SIZE = parseInt(req.query.limit) || 4;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * PAGE_SIZE;

            const allLaunches = await Launch.findAll({
                include: {
                    model: Rocket,
                    as: 'associatedRocket',
                },
            });

            

            const filterName = req.query.search ? allLaunches.filter(filt => filt?.name?.toLowerCase()?.includes(req.query.search)) : allLaunches

            const count = filterName.length;

            const launches = filterName.splice(offset, PAGE_SIZE);

            const totalPages = Math.ceil(count / PAGE_SIZE);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;


            return res.status(200).json({
                totalDocs: totalPages,
                results: launches,
                page,
                totalPages,
                hasNext,
                hasPrev,
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    };

    const getLaunchesStats = async (req, res) => {
        try {

            const allLaunches = await Launch.findAll();

            const LaunchesSucces = allLaunches.filter(props => props.rocket === "5e9d0d95eda69955f709d1eb");
            const LaunchesFails = allLaunches.filter(props => props.success === false);


            return res.status(200).json({
                success: LaunchesSucces.length,
                fails: LaunchesFails.length,
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    }
    return {
        getLaunches, getLaunchesStats
    }
}

module.exports = SpacexController