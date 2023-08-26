const Rocket = require("../../rockets/model/model");
const Launch = require("../model/model")

const SpacexController = () => {

    const getLaunches = async (req, res) => {
        try {
            const PAGE_SIZE = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * PAGE_SIZE;

            const allLaunches = await Launch.findAll({
                include: {
                    model: Rocket,
                    as: 'associatedRocket',
                },
            });



            const filterName = req.query.search ? allLaunches.filter(filt => filt?.name?.toLowerCase()?.includes(req.query.search)) || allLaunches.filter(filt => filt?.associatedRocket?.name.toLowerCase()?.includes(req.query.search)) : allLaunches

            const count = filterName.length;

            const launches = filterName.splice(offset, PAGE_SIZE);

            const totalPages = Math.ceil(count / PAGE_SIZE);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;


            return res.status(200).json({
                totalDocs: count,
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

            const LaunchesSucces = allLaunches.filter(props => props.success === true);
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

    const getLaunchesRockets = async (req, res) => {
        try {
            const allLaunches = await Launch.findAll({
                include: {
                    model: Rocket,
                    as: 'associatedRocket',
                },
            });

            const contagemLancamentos = {};
            allLaunches.forEach(lancamento => {
                const tipoFoguete = lancamento.dataValues.associatedRocket.name; // Suponhamos que o campo seja 'foguete'
                contagemLancamentos[tipoFoguete] = (contagemLancamentos[tipoFoguete] || 0) + 1;
            });

            // Criando um array de objetos com o nome do foguete e quantidade de lançamentos
            const resultadoFinal = Object.keys(contagemLancamentos).map(foguete => ({
                rocket: foguete,
                count: contagemLancamentos[foguete]
            }));

            return res.status(200).json({
                result: resultadoFinal,
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    }

    const getLaunchesRocketsYear = async (req, res) => {
        try {
            const allLaunches = await Launch.findAll({
                include: {
                    model: Rocket,
                    as: 'associatedRocket',
                },
            });

            const contagemLancamentos = {};

            allLaunches.forEach(lancamento => {
                const ano = new Date(lancamento.dataValues.date_local).getFullYear();
                const foguete = lancamento.dataValues.associatedRocket.name; // Suponhamos que o campo seja 'foguete'

                if (!contagemLancamentos[ano]) {
                    contagemLancamentos[ano] = [];
                }

                const fogueteIndex = contagemLancamentos[ano].findIndex(item => item.nome === foguete);

                if (fogueteIndex !== -1) {
                    contagemLancamentos[ano][fogueteIndex].quantidade++;
                } else {
                    contagemLancamentos[ano].push({
                        nome: foguete,
                        quantidade: 1
                    });
                }
            });

            const resultadoFinal = Object.keys(contagemLancamentos).map(ano => ({
                ano: parseInt(ano),
                foguetes: contagemLancamentos[ano]
            }));

            return res.status(200).json({
                result: resultadoFinal,
            });
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    }
    return {
        getLaunches, getLaunchesStats, getLaunchesRockets, getLaunchesRocketsYear
    }
}

module.exports = SpacexController