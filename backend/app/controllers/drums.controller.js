const db = require("../models");
const Drum = db.drums;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const drum = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    wood_type: req.body.wood_type,
    color: req.body.color,
    drum_type: req.body.drum_type,
    brand: req.body.brand
  };

  Drum.create(drum)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding a new Drum."
      });
    });
};

function comparePrice(drum1, drum2) {
  if (drum1.price < drum2.price) { return -1; }
  if (drum1.price > drum2.price) { return 1; }
  return 0;
}

exports.findAll = (req, res) => {
  const drum_type = req.query.type;
  console.log(drum_type);
  let condition = drum_type ? { drum_type: { [Op.iLike]: `%${drum_type}%` } } : null;
  Drum.findAll({ where: condition })
    .then(data => {
      data.sort(comparePrice);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving drums."
      });
    });
};

exports.findOne = (req, res) => {
const id = req.params.id;

Drum.findByPk(id)
.then(data => {
if (data) {
res.send(data);
} else {
res.status(404).send({
message: `Cannot find Drum with id=${id}.`
});
}
})
.catch(err => {
res.status(500).send({
message: "Error retrieving Drum with id=" + id
});
});
};

exports.update = (req, res) => {
  const id = req.params.id;

  Drum.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drum was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Drum with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Drum with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Drum.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Drum was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Drum with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Drum with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Drum.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Drums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all drums."
      });
    });
};

exports.findAllDrumType = (req, res) => {
   Drum.findAll({})
       .then(data => {
         res.send(data);
       })
       .catch(err => {
         res.status(500).send({
           message:
               err.message || "Some error occurred while retrieving drums."
         });
       });
 }