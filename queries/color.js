const db = require("../db/dbConfig.js");

const getAllColors = async () => {
    try {
      const allColors = await db.any("SELECT * FROM colors");
      return allColors;
    } catch (error) {
      return error;
    }
  };


  const getColors = async (id)=>{
    try{

      const oneColor= await db.one("SELECT * FROM colors WHERE id=$1", id)
      return oneColor
    }catch(error){

    }


  }
//insert into colors(name,is favorite)VALUES ('red',true)
  const createColor = async (color)=>{
    try{
      const newColor=await db.one(
        "INSERT INTO colors (name, is_favorite) VALUES($1,$2) RETURNING *",
        [color.name, color.is_favorite]
      );
      return newColor




    }catch(error){
      return error
    }




  }

  const deleteColor = async (id)=>{
    try{
      const deleteIndex=await db.one(
        'DELETE FROM colors  WHERE id=$1 RETURNING *',id
        );
        // color.splice(0,1)
      return deleteIndex
      }catch(error){
      return error
    }
}

const updateColor = async (id,color )=>{

  try{
    const updatedColor = await db.one ("UPDATE colors SET name=$1, is_favorite=$2 where id=$3 RETURNING *",
    [color.name,color.is_favorite,id])
    return updatedColor

  }catch(error){
    return error


  }


}
module.exports = { getAllColors,getColors ,createColor,deleteColor,updateColor};