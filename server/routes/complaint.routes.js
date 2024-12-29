var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());
var route = express.Router();
// var Zonal = require('../models/zonal.model')
var Complaint = require("../models/complaints.model");
const router = require("./branch.routes");
var mcurl =
  "mongodb+srv://jvdimvp:Pradeep903@cluster0.d2cwd.mongodb.net/Bhashyam?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mcurl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
  route.get("/a", (req, res) => {
    let { branches = '', status, mobile } = req.query;
    console.log("a:", branches, status, mobile);
  
    const branchFilter = branches.length 
      ? { branch: { $in: branches.split(",").map(branch => branch.trim()) } } 
      : {};
  
    const statusFilter = status ? { "status.code": status } : {};
    let mobileFilter = {};
  
    if (mobile) {
      const parsedMobile = parseInt(mobile, 10);
      if (!isNaN(parsedMobile)) {
        mobileFilter = { mobile: parsedMobile };
      } else {
        return res.status(400).json({ error: "Invalid mobile number format" });
      }
    }
  
    const filter = {
      ...branchFilter,
      ...statusFilter,
      ...mobileFilter,
    };
  
    Complaint.find(filter)
      .then((data) => {
        // console.log(data)
        res.json(data);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch complaints" });
      });
  });
  
// route.get("/a", (req, res) => {
//   let { branches = '', status, mobile } = req.query;
//   console.log("a:",branches , status , mobile);
//   const branchFilter = branches.length ? { branch: { $in: branches.split(",").map(branch => branch.trim()) } } : {};
//   const statusFilter = status ? { "status.code": status } : {};
//   let mobileFilter = {};
//   if (mobile) {
//     const parsedMobile = parseInt(mobile, 10);
//     if (!isNaN(parsedMobile)) {
//       mobileFilter = { mobile: parsedMobile };
//     } else {
//       return res.status(400).json({ error: "Invalid mobile number format" });
//     }
//   }
//   let filter = {
//     ...branchFilter,
//     ...statusFilter,
//     ...mobileFilter
//   }
//   Complaint.find(filter)
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

route.post("/addcomplaint", (req, res) => {
  var newcom = new Complaint(req.body);
  newcom.status.push({ code: "registered", timestamp: Date.now() });
  newcom
    .save()
    .then((complaint) => {
      console.log(complaint);
      res.json({ msg: "Complaint Added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "complaint add failed", error: err.message });
    });
});

route.put("/assigncomplaint/:id", (req, res) => {
  var updstatus = { code: "assigned", timestamp: Date.now() };
  var updcomplaint = Complaint.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { status: updstatus } }
  );
  updcomplaint
    .then((complaint) => {
      console.log(complaint);
      res.json({ msg: "Assigned Complaint" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ msg: "Complaint Not Assigned ", error: err.message });
    });
});

route.put("/acceptcomplaint/:id", (req, res) => {
  var updstatus = { code: "accepted", timestamp: Date.now() };
  var updcomplaint = Complaint.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { status: updstatus } }
  );
  updcomplaint
    .then((complaint) => {
      console.log(complaint);
      res.json({ msg: "Complaint Accepted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Not Accepted", error: err.message });
    });
});

route.put("/complaintsolved/:id", (req, res) => {
  var updstatus = { code: "solved", timestamp: Date.now() };
  var updcomplaint = Complaint.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { status: updstatus } }
  );
  updcomplaint
    .then((complaint) => {
      console.log(complaint);
      res.json({ msg: "Complaint Solved" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Not Solved", error: err.message });
    });
});

route.put("/complaintclosed/:id", (req, res) => {
  var updstatus = { code: "closed", timestamp: Date.now() };
  var updcomplaint = Complaint.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { status: updstatus } }
  );
  updcomplaint
    .then((complaint) => {
      console.log(complaint);
      res.json({ msg: "Complaint Closed" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Something went wrong in closing complaint",
        error: err.message,
      });
    });
});

route.get("/getcomplaintbymobile", (req, res) => {
  var mobile = req.query.mobile;

  if (!mobile) {
    return res.status(400).json({ msg: 'Mobile number is required' });
  }
  Complaint.find({ mobile: mobile })
    .then((complaint) => {
      console.log(complaint);

      if (complaint.length == 0) {
        return res.status(404).json({ msg: 'No complaints found for this mobile number' });
      }
      res.json(complaint);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error in searching for Complaints", error: err.message });
    });
});

route.get('/getcomplaintbybranches', (req, res) => {
  var selbranches = req.query.branches;
  if (!selbranches || selbranches.length == 0) {
    return res.status(400).json({ msg: 'No Branches selected' })
  }
  Complaint.find({ branch: { $in: selbranches } })
    .then((complaint) => {
      console.log(complaint);
      res.json(complaint);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: 'Error in fetching complaints by Branch', error: err.message })
    })
})

route.get('/getcomplaintbystatus', (req, res) => {
  var statuscode = req.query.status;
  if (!statuscode) {
    return res.status(400).json({ msg: 'No Status found' })
  }
  Complaint.find({ status: { $elemMatch: { code: statuscode } } })
    .then((complaints) => {
      console.log(complaints);
      res.json(complaints);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: 'Error in fetching complaints by Status', error: err.message })
    })
})

route.get('/getcomplaintbranch', (req, res) => {
  var check = req.query;
  Complaint.find({ $or: [check] })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    })
})

module.exports = route;
