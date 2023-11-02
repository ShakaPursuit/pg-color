// controllers/colorsController.js
const express = require("express");
const colors = express.Router();
const { getAllColors,getColors,createColor, deleteColor ,updateColor} = require("../queries/color");
const { checkName ,checkBoolean} = require("../validations/checkColors");

// INDEX
// colors.get("/", async (req, res) => {
// const allColors=await getAllColors();
// res.json(allColors)


// });

colors.get("/", async (req, res) => {
  const allColors = await getAllColors();
  if (allColors[0]) {
    res.status(200).json(allColors);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

colors.get("/:id", async (req,res)=>{
  const id =req.params.id
  const oneColor= await getColors(id);
  if(oneColor){
    res.status(200).json(oneColor);
  }else{
    res.status(500).json({error:"server error"})
  }

})

colors.post("/",checkName,checkBoolean, async (req,res)=>{
  const color =req.body
  const newColor= await createColor(color);
  if(newColor){
    res.status(200).json(newColor);
  }else{
    res.status(500).json({error:"server error"})
  }

})


colors.delete("/:id", async(req,res)=>{
const {id}= req.params;
const deletedColor= await deleteColor(id);
if(deletedColor.id){

  res.status(200).json(deletedColor)

}else{
  res.status(404).json('Color not found')
}


})

colors.put("/:id",checkName,checkBoolean, async (req, res) => {
  const { id } = req.params;
  const updatedColor = await updateColor(id, req.body);
  res.status(200).json(updatedColor);
});


module.exports = colors;