import Professionals from '../models/professionalModel.js';

export const GetProfessionals = async(req, res) => {
    try{
        const professionals = await Professionals.findAll({
            attributes:['id', 'professionalId', 'speciality']
        });
        res.json(professionals);
    } catch (error){
        console.log(error);
    }
}

export const AddProfessional = async(req, res) => {
    const { professionalId, speciality } = req.body;
    try{
        await Professionals.create({
            professionalId: professionalId,
            speciality: speciality
        });
        res.json({msg: "Professional created successfully!"});
    } catch(error){
        console.log(error);
    }
}