import Categories from '../models/categoryModel.js';

export const GetCategories = async(req, res) => {
    try{
        const categories = await Categories.findAll({
            attributes:['id', 'nameCategory']
        });
        res.json(categories);
    } catch (error){
        console.log(error);
    }
}

export const AddCategory = async(req, res) => {
    const { nameCategory } = req.body;
    try{
        await Categories.create({
            nameCategory: nameCategory,
        });
        res.json({msg: "Category created successfully!"});
    } catch(error){
        console.log(error);
    }
}