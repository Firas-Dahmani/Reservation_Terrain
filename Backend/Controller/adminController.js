const User = require('../models/user')
const Ville = require('../models/Ville')
const Stade = require('../models/stade')


// Add Ville 
exports.addVille = async (req, res) => {
    if (!(req.body.ville)){
        res.status(404).json({message : "Ville not found"});
    }

    try {
        const ville = await new Ville({
            villeName : req.body.ville
        })
        await ville.save(); 
        res.json({message : "Ville added"});
    } catch (error) {
        res.status(404).json({message : "some error while adding Ville by admin"});
    }
}

//update ville 
exports.updateVille = async (req, res) => {
  
    const ville = await Ville.findById(req.params.id);
  
    if (ville.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (ville) {
        ville.villeid = req.body.villeid 
  
      const updatedStade = await stade.save();
      res.json(updatedStade);
    } else {
      res.status(404);
      throw new Error("Stade not found");
    }
  };

// Show Ville 
exports.showVille =  async (req, res ) => {
    try {
        await Ville.find({}).then(v => res.json(v))
    } catch (error) {
        console.log(error);
        res.status(404).json({message : "some error while finding Ville by admin"});
    }
}

// Add Stade 
exports.addStade =  async (req, res) => {
     await Ville.find({_id : req.body.villeid})
     .catch(result => res.status(404).json({ messsage: "some error in finding ville id!" }))
        
        await Stade.find({ villeid: req.body.villeid }, async (err, s) => {
            if (err) {
                res.json({ msg: "some error in finding stade!" });
            }
        else {
            let stade = new Stade ({
                userId : req.user._id,
                villeid : req.body.villeid, 
                stadeId : s.length + 1,
                stadeName : req.body.stadename, 
                stadetel : req.body.stadetel
            })

            await stade.save((error, st) => {
                if (error){
                    console.log(error);
                    res.json({ messsage: "some error in save!" });
                }
                else {
                    res.status(200).json({ message: "Stade added!!" })
                }
            })
        }
    })
}

// update Stade
exports.updateStade = async (req, res) => {
  
    const stade = await Stade.findById(req.params.id);
  
    if (stade.userId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (stade) {
        stade.villeid = req.body.villeid
        stade.stadeName = req.body.stadename 
        stade.stadetel = req.body.stadetel
  
      const updatedStade = await stade.save();
      res.json(updatedStade);
    } else {
      res.status(404);
      throw new Error("Stade not found");
    }
  };

exports.getAllStade = async (req, res) => {

    try {
        await Stade.find({ villeid: req.body.id })
        .then(result => res.json({ message: result }))
    } catch (error) {
        console.log(error);
        res.json({ message: "some error!" })
    } 
}

exports.deleteVille =  async (req, res) => {
    const id = req.body.id
     try {
        await Ville.deleteOne({ _id: id })
        await Stade.deleteMany({ villeid: id })

        res.status(200).json({ msg: "yes deleted user by admin" })
    } catch (error) {
        res.json({ message: "Somthing went wrong in delete Ville!!" })
    }   
}

exports.deleteStade =  async (req, res) => {
    const id = req.body.id
     try {
        await Stade.deleteOne({ _id: id })

        res.status(200).json({ msg: "yes deleted user by admin" })
    } catch (error) {
        res.json({ message: "Somthing went wrong in delete Stade!!" })
    }   
}

exports.seeUser = async (req, res) => {

    try {
        await User.find({ role: "User" , isAvail: false})
        .then(result => res.json({ user: result }))
    } catch (error) {
        res.json({ message: "Somthing went wrong in finding User!!" })
    }
}

exports.seeOwners = async (req, res) => {

    try {
        await User.find({ role: "Owner" , isAvail: false})
        .then(result => res.json({ user: result }))
    } catch (error) {
        res.json({ message: "Somthing went wrong in finding User!!" })
    }
}

exports.acceptUser = async (req, res) => {
    var id = req.body.id
    try {
        await User.updateOne({ _id: id }, { isAvail: true })
        .then(result => res.status(201).json({ message: " user Accepted!" }))
    } catch (error) {
        res.json({ message: "Somthing went wrong in finding User!!" })
    }
}