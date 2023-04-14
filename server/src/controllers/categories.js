import Categories from "../models/categoryModel.js";

export const GetCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["id", "nameCategory"],
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
};

export const AddCategory = async (req, res) => {
  const { nameCategory } = req.body;
  try {
    await Categories.create({
      nameCategory: nameCategory,
    });
    res.json({ msg: "Category created successfully!" });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    await Categories.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ msg: "Categoría borrada con éxito" });
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCategory = async (req, res) => {
  const { id, name } = req.body;
  try {
    await Categories.upsert({
      id: id,
      name: name,
    });
    res.json({ msg: "Categoría editada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
