var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
var jwt = require("jsonwebtoken");
var routers = express.Router();
var Complaint = require("../models/complaints.model");
var Zonal = require("../models/zonal.model");
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

// routers.post("/zonallogin", (req, res) => {
//   console.log(req.body);
//   Zonal.findOne({ mobile: req.body.mobile })
//     .then((zonal) => {
//       var token = jwt.sign({ ...zonal }, "secretkey");
//       console.log(token);
//       res.json({ msg: "zonal login success", token });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ msg: "zonal login failed" });
//     });
// });

routers.get("/complaintsbybranch", (req, res) => {
  Complaint.find()
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

routers.post("/addzonal", (req, res) => {
  var newBranch = new Zonal(req.body);
  newBranch
    .save()
    .then((zonalofficer) => {
      console.log(zonalofficer);
      res.json({ msg: "Zonal Added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "zonal add failed", error: err.message });
    });
});


routers.get("/zonalscomplaints", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ msg: "Token missing" });
  }

  try {
    const zonal = jwt.verify(token, "secretkey");

    // Ensure zonal exists
    if (!zonal) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    let { branches = '', status, mobile } = req.query;
    
    // Log the query parameters for debugging
    console.log("req.query", req.query); 
    console.log("branches", branches, typeof branches);

    // Split the branches string into an array
    const branchArray = branches ? branches.split(',').map(branch => branch.trim()) : [];

    // Construct the query filters
    const branchFilter = branchArray.length
      ? { branch: { $in: branchArray } }
      : {};  // If branches are passed, use them, else use an empty object
    
    const statusFilter = status ? { "status.code": status } : {};  // Filter by status code
    console.log("statusFilter",statusFilter);
    // const mobileFilter = mobile ? { mobile: { $regex: mobile, $options: "i" } } : {};  // Case-insensitive regex for mobile

    // console.log("mobileFilter", mobileFilter);  // Log the branch filter for debugging
     // Validate and construct mobile filter
     let mobileFilter = {};
     if (mobile) {
       const parsedMobile = parseInt(mobile, 10);
       if (!isNaN(parsedMobile)) {
         mobileFilter = { mobile: parsedMobile };
       } else {
         return res.status(400).json({ error: "Invalid mobile number format" });
       }
     }
    // Check if the requested branches are part of zonal's branches
    const validBranches = branchArray.filter(branch => zonal._doc?.branches.includes(branch));
    console.log("validBranches", validBranches);  // Log valid branches for debugging

    // Combine filters: 
    // - If branches are provided, apply them
    // - If no branches are provided, use zonal._doc?.branches as a fallback
    const filter = {
      ...branchFilter,
      ...statusFilter,
      ...mobileFilter,
      ...(branchArray.length > 0 ? { branch: { $in: validBranches.length > 0 ? validBranches : zonal._doc?.branches } } : { branch: { $in: zonal._doc?.branches || [] } }),
      // ...(branchFilter.branch ? {} : { branch: { $in: validBranches.length > 0 ? validBranches : zonal._doc?.branches || [] } }),
    };

    // Fetch complaints based on filters
    const complaints = await Complaint.find(filter);

    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);  // Server-side error logging
    res.status(500).json({ error: "Failed to fetch complaints", details: error.message });
  }
});

module.exports = routers;


// routers.get("/zonalscomplaints", async (req, res) => {
//   var token = req.headers.authorization;
//   console.log("tokenjj", token);
//   if (!token) {
//     res.json({ msg: "token missing" });
//   }
//   var zonal = jwt.verify(token, "secretkey");
//   console.log("pdata", zonal);

//   Complaint.find({ branch: { $in: zonal?._doc?.branches } })
//     .then((complaints) => {
//       console.log("comp", complaints);
//       res.status(200).json(complaints);
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ error: "Failed to fetch complaints", details: error.message });
//     });
// });
// routers.get("/zonalscomplaints", async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(400).json({ msg: "Token missing" });
//   }

//   try {
//     const zonal = jwt.verify(token, "secretkey");

//     // Ensure zonal exists
//     if (!zonal) {
//       return res.status(401).json({ msg: "Unauthorized access" });
//     }

//     const { branches = [], status, mobile } = req.query;
//     console.log("req.query",req.query);
//     // Construct the query filters
//     const branchFilter = branches.length ? { branch: { $in: branches.split(",").map(branch => branch.trim()) } } : {};
//     const statusFilter = status ? { "status.code": status } : {};  // Filter by status code
//     const mobileFilter = mobile ? { mobile: { $regex: mobile, $options: "i" } } : {};  // Case-insensitive regex for mobile
//     console.log("branchFilter",branchFilter);
//     const filter = {
//       ...branchFilter,
//       ...statusFilter,
//       ...mobileFilter,
//       // branch: { $in: zonal._doc?.branches || [] },  // Only complaints in allowed branches
//       ...(branchFilter.branch ? {} : { branch: { $in: zonal._doc?.branches || [] } }),
//     };

//     // Fetch complaints based on filters
//     const complaints = await Complaint.find(filter);

//     res.status(200).json(complaints);
//   } catch (error) {
//     console.error("Error fetching complaints:", error);  // Server-side error logging
//     res.status(500).json({ error: "Failed to fetch complaints", details: error.message });
//   }
// });
// routers.get("/zonalscomplaints", async (req, res) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(400).json({ msg: "Token missing" });
//   }

//   try {
//     const zonal = jwt.verify(token, "secretkey");

//     // Ensure zonal exists
//     if (!zonal) {
//       return res.status(401).json({ msg: "Unauthorized access" });
//     }

//     const { branches = [], status, mobile } = req.query;
    
//     // Construct the query filters
//     const branchFilter = branches.length
//     ? { branch: { $in: branches.split(",").map(branch => branch.trim()) } }
//     : {};
//     console.log("req.query", req.query);  // Log query parameters for debugging
//     console.log("branches",branches,Array.isArray(branches))

//     const statusFilter = status ? { "status.code": status } : {};  // Filter by status code
//     const mobileFilter = mobile ? { mobile: { $regex: mobile, $options: "i" } } : {};  // Case-insensitive regex for mobile

//     console.log("branchFilter", branchFilter);  // Log the final filter for debugging

//     // Check if the requested branches are part of zonal's branches
//     const validBranches = branches.split(",").filter(branch => zonal._doc?.branches.includes(branch));
//     console.log("validBranches", validBranches);  // Log valid branches for debugging

//     // Combine filters: 
//     // - If valid branches are present, apply them to the filter
//     // - Otherwise, use zonal's branches as a fallback
//     const filter = {
//       ...branchFilter,
//       ...statusFilter,
//       ...mobileFilter,
//       ...(branchFilter.branch ? {} : { branch: { $in: validBranches.length > 0 ? validBranches : zonal._doc?.branches || [] } }),
//     };

//     // Fetch complaints based on filters
//     const complaints = await Complaint.find(filter);

//     res.status(200).json(complaints);
//   } catch (error) {
//     console.error("Error fetching complaints:", error);  // Server-side error logging
//     res.status(500).json({ error: "Failed to fetch complaints", details: error.message });
//   }
// });