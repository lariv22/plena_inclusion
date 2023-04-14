import CatActivity from "../models/catActivityModel.js";

export const AddCatActivity = async (req, res) => {
  const { idCategory, idActivity } = req.body;
  try {
    await CatActivity.create({
      CategoryId: idCategory,
      ActivityId: idActivity,
    });
    res.json({ msg: "Categoria añadida a actividad exitosamente!" });
  } catch (error) {
    console.log(error);
  }
};

export const DeleteCatActivity = async (req, res) => {
  try {
    await CatActivity.destroy({
      where: {
        CategoryId: req.body.id,
      },
      where: {
        ActivityId: req.body.id,
      },
    });
    res.json({ msg: "Categoría de actividad borrada con éxito" });
  } catch (error) {
    console.log(error);
  }
};
