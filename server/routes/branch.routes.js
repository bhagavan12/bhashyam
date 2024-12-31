var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
var jwt = require("jsonwebtoken");
var router = express.Router();
var Branch = require("../models/branch.model");
// var Zonal = require('../models/zonal.model');
var Complaint = require("../models/complaints.model");
const Admin = require("../models/admin.model");
var Zonal = require("../models/zonal.model");
var mcurl =
  "mongodb+srv://jvdimvp:Pradeep903@cluster0.d2cwd.mongodb.net/Bhashyam?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mcurl)
  .then(async() => {
    console.log("Connected to MongoDB");
    const admin = await Admin.findOne({id:"a1234"});
      if (!admin) {
        // Create a default admin if none exists
        const defaultAdmin = new Admin({
          name: "aname",
          id: "a1234",
          password: "123", // Hash this password in production
        });

        await defaultAdmin.save();
        console.log("Default admin created successfully");
      } else {
        console.log("Admin collection already exists");
      }
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", (req, res) => {
  Branch.find()
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", (req, res) => {
  console.log("req.body",req.body);
  if (req.body.empid.charAt(0) === "p") {
    Branch.findOne({
      principal_id: req.body.empid,
    })
      .then((principal) => {
        // console.log("principald", principal);
        if (!principal) {
          return res.status(404).json({ msg: "Principal not found" });
        }

        if (principal.password !== req.body.password) {
          return res.status(401).json({ msg: "Incorrect password" });
        }
        var token = jwt.sign({ ...principal }, "secretkey");
        // console.log(token);
        res.json({ msg: "success", token, role: "principal" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "login failed" });
      });
  }else if (req.body.empid.charAt(0) === 'a') {
    // Admin login
    Admin.findOne({
      id: req.body.empid
    }).then((admin) => {
        if (!admin) {
          console.log("admin",admin);
          return res.status(404).json({ msg: "Admin not found" });
        }

        if (admin.password !== req.body.password) {
          return res.status(401).json({ msg: "Incorrect password" });
        }
        console.log("admin",admin);
        const token = jwt.sign({ ...admin }, "secretkey");
        res.json({ msg: "success", token, role: admin.role });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "admin login failed" });
      });
  }  else {
    Zonal.findOne({
      zonal_id: req.body.empid,
    })
      .then((zonal) => {
        if (!zonal) {
          return res.status(404).json({ msg: "Zonal officer not found" });
        }

        if (zonal.password !== req.body.password) {
          return res.status(401).json({ msg: "Incorrect password" });
        }
        var token = jwt.sign({ ...zonal }, "secretkey");
        // console.log(token);
        res.json({ msg: "success", token, role: "zonalofficer" });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "zonal login failed" });
      });
  }
});
// router.post("/login", (req, res) => {
//     console.log(req.body);

//     const { empid, password } = req.body;

//     if (!empid || !password) {
//       return res.status(400).json({ msg: "Employee ID and password are required" });
//     }

//     if (empid.charAt(0) === "p") {
//       // Principal login
//       Branch.findOne({ principal_id: empid })
//         .then((principal) => {
//           if (!principal) {
//             return res.status(404).json({ msg: "Principal not found" });
//           }

//           if (principal.password !== password) {
//             return res.status(401).json({ msg: "Incorrect password" });
//           }

//           // Generate JWT token
//           var token = jwt.sign({ id: empid, role: "principal" }, "secretkey");
//           console.log(token);

//           res.json({ msg: "success", token, role: "principal" });
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).json({ msg: "Internal server error" });
//         });
//     } else if (empid.charAt(0) === "z") {
//       // Zonal Officer login
//       Zonal.findOne({ zonal_id: empid })
//         .then((zonal) => {
//           if (!zonal) {
//             return res.status(404).json({ msg: "Zonal officer not found" });
//           }

//           if (zonal.password !== password) {
//             return res.status(401).json({ msg: "Incorrect password" });
//           }

//           // Generate JWT token
//           var token = jwt.sign({ id: empid, role: "zonalofficer" }, "secretkey");
//           console.log(token);

//           res.json({ msg: "success", token, role: "zonalofficer" });
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).json({ msg: "Internal server error" });
//         });
//     } else {
//       res.status(400).json({ msg: "Invalid Employee ID format" });
//     }
//   });

// router.get("/principalcomplaints", (req, res, next) => {
//   console.log("pheaders", req.headers.authorization);
//   var token = req.headers.authorization;
//   if (!token) {
//     res.json({ msg: "token missing" });
//   }
//   var principal = jwt.verify(token, "secretkey");
//   console.log("pdata", principal);

//   Complaint.find({ branch: principal._doc.branchname })
//     .then((data) => {
//       console.log("comp", data);
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ msg: "error" });
//     });
// });
router.get("/principalcomplaints", (req, res, next) => {
  console.log("pheaders", req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }
  try {
    const principal = jwt.verify(token, "secretkey");
    console.log("pdata", principal);

    const { search = "", status = "" } = req.query;
    let mobileFilter = {};
  
    if (search) {
      const parsedMobile = parseInt(search, 10);
      if (!isNaN(parsedMobile)) {
        mobileFilter = { mobile: parsedMobile };
      } else {
        return res.status(400).json({ error: "Invalid mobile number format" });
      }
    }
    // Filter by principal's branch and apply optional search and status filters
    const query = {
      branch: principal._doc.branchname,
      ...mobileFilter,
      // ...(search && { mobile: { $regex: search, $options: "i" } }),
      ...(status && status !== "all" && { "status.code": status }),
    };

    Complaint.find(query)
      .then((data) => {
        console.log("Filtered complaints:", data);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Error fetching complaints" });
      });
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: "Invalid token" });
  }
});

router.post("/addbranch", (req, res) => {
  var newBranch = new Branch(req.body);
  newBranch
    .save()
    .then((branch) => {
      // console.log(branch);
      res.json({ msg: "Branch Added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "branch add failed", error: err.message });
    });
});

router.delete("/deletebranch/:id", (req, res) => {
  var branchId = req.params.id;
  Branch.findByIdAndDelete(branchId)
    .then((result) => {
      if (!result) {
        res.json({ msg: "Branch not found" });
      }
      res.json({ msg: "Branch Deleted Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error deleting branch", error: err.message });
    });
});

router.put("/updatebranch/:id", (req, res) => {
  var branchId = req.params.id;
  var branchData = req.body;
  Branch.findByIdAndUpdate(branchId, branchData, { new: true })
    .then((updbranch) => {
      if (!updbranch) {
        return res.json({ msg: "Branch not found" });
      }
      res.json({ msg: "Branch updated Successfully", updbranch });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Error in Updating branch" });
    });
});

module.exports = router;
