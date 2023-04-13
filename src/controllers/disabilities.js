import Disabilities from '../models/disabilityModel.js';

export const GetDisabilities = async(req, res) => {
    try{
        const disabilities = await Disabilities.findAll({
            attributes:['id', 'nameDisability', 'descriptionDisability']
        });
        res.json(disabilities);
    } catch (error){
        console.log(error);
    }
}

export const AddDisability = async(req, res) => {
    const { nameDisability, descriptionDisability } = req.body;
    try{
        await Disabilities.create({
            nameDisability: nameDisability,
            descriptionDisability: descriptionDisability
        });
        res.json({msg: "Disability created successfully!"});
    } catch(error){
        console.log(error);
    }
}