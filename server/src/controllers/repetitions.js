import Repetitions from '../models/repetitionModel.js';

export const GetRepetitions = async(req, res) => {
    try{
        const repetitions = await Repetitions.findAll({
            attributes:['id', 'nameRepetition', 'startDateRepetition', 'durationRepetition', 'locationRepetition', 'professionalId', 'activityId']
        });
        res.json(repetitions);
    } catch (error){
        console.log(error);
    }
}

export const AddRepetition = async(req, res) => {
    const { nameRepetition, startDateRepetition, durationRepetition, locationRepetition, professionalId, activityId } = req.body;
    try{
        await Repetitions.create({
            nameRepetition: nameRepetition,
            startDateRepetition: startDateRepetition,
            durationRepetition: durationRepetition,
            locationRepetition: locationRepetition,
            professionalId: professionalId,
            activityId: activityId
        });
        res.json({msg: "Repetition created successfully!"});
    } catch(error){
        console.log(error);
    }
}