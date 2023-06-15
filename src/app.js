const fs = require("fs");
const express = require("express");
const app = express();

// Importing discussions from discussions.json file
const discussions = JSON.parse(fs.readFileSync(`data/discussions.json`));
const { isOwner } = require('../middlewares/owner')

// Middlewares
app.use(express.json());


app.get("/api/v1/discussions", (req, res) => {

    res.status(200).json({
        status: "Success",
        message: "Discussions fetched successfully",
        data: {
          discussions,
        },
      });

});


app.get("/api/v1/discussions/:id", (req, res) => {

  const id = req.params.id * 1;
  const Details = discussions.find(
    (Details) => Details.id === id
  );

  const index = discussions.indexOf(Details);

  if (!Details) {
    return res.status(404).send({
      status: "Failed",
      message: "Discussion not found!",
    });
  }

  res.status(200).json({
        status: "Success",
        data: Details
  });

});



app.post("/api/v1/discussions", (req, res) => {

  var obj = req.body;
  obj['id'] = (discussions[discussions.length-1].id)+1;
  discussions.push(obj);

  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: "Discussions added successfully"
      })
    }
  );

});

app.patch("/api/v1/discussions/:id", isOwner,  (req, res) => {

  const id = req.params.id * 1;
  const updatedDetails = discussions.find(
    (updatedDetails) => updatedDetails.id === id
  );

  const index = discussions.indexOf(updatedDetails);

  if (!updatedDetails) {
    return res.status(404).send({
      status: "Failed",
      message: "Discussion not found!",
    });
  }

  Object.assign(updatedDetails, req.body);

  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: `Discussions Updated Successfully`
      });
    }
  );
});


app.delete("/api/v1/discussions/:id", isOwner, (req, res) => {
  const id = req.params.id * 1;
  const DetailToDelete = discussions.find(
    (detailTODelete) => detailTODelete.id === id
  );
  if (!DetailToDelete) {
    return res.status(404).send({
      status: `Failed`,
      message: `Discussion not found!`,
    });
  }
  const index = discussions.indexOf(DetailToDelete);
  discussions.splice(index, 1);
  fs.writeFile(
    `data/discussions.json`,
    JSON.stringify(discussions),
    (err) => {
      res.status(200).json({
        status: `Success`,
        message: `Discussions Deleted Successfully`
      });
    }
  );
});


module.exports = app;
