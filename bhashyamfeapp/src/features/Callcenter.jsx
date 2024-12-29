// import React, { useState } from 'react'
// import { useComplaintClosedMutation, useGetbranchByMobileQuery, useGetComplaintsQuery } from '../services/complaintApi'
// import { useGetbranchesQuery } from '../services/schoolApi';

// function Callcenter() {
//     const { isLoading, data } = useGetComplaintsQuery({
//         branches: selBranch,
//         status: selStatus !== 'all' ? selStatus : null,
//         mobile: search,
//     },
//     { refetchOnMountOrArgChange: true });
//     console.log(isLoading, data);
//     var [search, setSearch] = useState('');
//     var [selBranch, setSelBranch] = useState([]);
//     var [selStatus, setSelStatus] = useState('all');
//     var [closedFn] = useComplaintClosedMutation();
//     var { isLoading: bLoading, data: bdata } = useGetbranchesQuery();

//     // var {isLoading : bloading ,data : mdata} = useGetbranchByMobileQuery(search);
//     function comclosed(id) {
//         closedFn(id).then((res) => {
//             console.log(res);
//         })
//     }

//     // function Mobilefil(m) {
//     //     return String(m.mobile).includes(search);
//     // }

//     // var MobileFiltered = data?.filter(Mobilefil).filter((complaint) => {
//     //     if (selBranch.length === 0) {
//     //         return true;
//     //     }
//     //     else {
//     //         return selBranch.includes(complaint.branch);
//     //     }
//     // })

//     // var StatusFiltered = MobileFiltered?.filter((complaint) => {
//     //     if (selStatus === 'all') {
//     //         return true;
//     //     }
//     //     else {
//     //         return complaint.status.some((status) => { return status.code === selStatus })
//     //     }
//     // })

//     // function handleBranch(e) {
//     //     var { value, checked } = e.target;
//     //     var checkupdates;
//     //     if (checked) {
//     //         checkupdates = [...selBranch, value];
//     //     }
//     //     else {
//     //         checkupdates = selBranch.filter((b) => { return b !== value })
//     //     }
//     //     setSelBranch(checkupdates);
//     // }
//     function handleBranch(e) {
//         const { value, checked } = e.target;
//         setSelBranch((prev) =>
//           checked ? [...prev, value] : prev.filter((b) => b !== value)
//         );
//     }
//     console.log("selBranch", selBranch);
//     function handleStatus(e) {
//         setSelStatus(e.target.value);
//     }
//     return (
//         <div>
//             <h3 className='text-center my-4'>COMPLAINTS</h3>
//             <input type="text" className='form-control p-2 mb-3 w-25' placeholder='Mobile Number'
//                 value={search} onChange={(e) => { setSearch(e.target.value) }} style={{ marginLeft: '580px' }} />
//             <div className='d-flex p-3'>
//                 {/* <div className='w-25'>
//                     {
//                         !bLoading && bdata?.map((b, i) => {
//                             return (
//                                 <div key={i}>
//                                     <input type="checkbox" value={b.branchname} className='form-check-input'
//                                         checked={selBranch.includes(b.branchname)} onChange={handleBranch} />
//                                     <label htmlFor={b.branchname} className='form-check-label ms-3 mb-2'>
//                                         {b.branchname}
//                                     </label>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div> */}
//                 <div className="w-25">
//                     <h5>Branches</h5>
//                     {bLoading ? (
//                         <p>Loading branches...</p>
//                     ) : (
//                         bdata?.map((branch) => (
//                             <div key={branch._id}>
//                                 <input
//                                     type="checkbox"
//                                     id={branch.branchname}
//                                     value={branch.branchname}
//                                     onChange={handleBranch}
//                                 />
//                                 <label htmlFor={branch.branchname} className="ms-2">
//                                     {branch.branchname}
//                                 </label>
//                             </div>
//                         ))
//                     )}
//                 </div>
//                 <div className='w-75'>
//                     <div className='mb-4'>
//                         {/* <div>
//                         <h5>Filter by Status:</h5>
//                         <label>
//                             <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-3' /> All
//                         </label>
//                         <label>
//                             <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus}className='ms-3' /> Assigned
//                         </label>
//                         <label>
//                             <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus} className='ms-3' /> Pending
//                         </label>
//                         <label>
//                             <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus} className='ms-3' /> Solved
//                         </label>
//                         <label>
//                             <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus} className='ms-3' /> Closed
//                         </label>
//                       </div>  */}
//                         <div>
//                             {['all', 'assigned', 'accepted', 'solved', 'closed'].map((status) => (
//                                 <label key={status}>
//                                     <input
//                                         type="radio"
//                                         value={status}
//                                         checked={selStatus === status}
//                                         onChange={handleStatus}
//                                         className="ms-3"
//                                     />{' '}
//                                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                     <div>
//                         <table className='table table-bordered text-center container shadow-sm'>
//                             <thead>
//                                 <tr>
//                                     <th>Student Name</th>
//                                     <th>Mobile</th>
//                                     <th>Branch</th>
//                                     <th>Complaint</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>

//                                 {/* {
//                                     !isLoading && StatusFiltered?.map((d, i) => {
//                                         return (
//                                             <tr key={i}>
//                                                 <td>{d.studentname}</td>
//                                                 <td>{d.mobile}</td>
//                                                 <td>{d.branch}</td>
//                                                 <td>{d.complaint}</td>
//                                                 <td>
//                                                     {
//                                                         [...d.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'solved'
//                                                             ? (
//                                                                 <button className='btn btn-success' onClick={() => { comclosed(d._id) }}>Close</button>
//                                                             ) : [...d.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code !== 'closed'
//                                                                 ? (<b>Pending</b>) : null
//                                                     }
//                                                     {
//                                                         [...d.status].sort((a, b) => { return a.timestamp < b.timestamp ? 1 : -1 })[0].code === 'closed'
//                                                         && <> <b>Complaint Closed</b> </>
//                                                     }
//                                                 </td>
//                                             </tr>
//                                         )
//                                     })
//                                 } */}
//                                 {data?.map((b, i) => {
//                                     const currentStatus = [...b.status]
//                                         .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;

//                                     return (
//                                         <tr key={i}>
//                                             <td>{b.studentname}</td>
//                                             <td>{b.mobile}</td>
//                                             <td>{b.branch}</td>
//                                             <td>{b.complaint}</td>
//                                             <td>{currentStatus}</td>
//                                             <td>
//                                                 {currentStatus === 'registered' && (
//                                                     <button
//                                                         className="btn btn-success"
//                                                         onClick={() => { comclosed(b._id) }}
//                                                     >
//                                                         Close
//                                                     </button>
//                                                 )}
//                                                 {currentStatus === 'assigned' && (
//                                                     <b>Waiting for Acceptance</b>
//                                                 )}
//                                                 {currentStatus === 'accepted' && <b>Processing</b>}
//                                                 {currentStatus === 'solved' && <b>Waiting for Closed</b>}
//                                                 {currentStatus === 'closed' && <b>Complaint Closed</b>}
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Callcenter

import React, { useState, useEffect } from "react";
import { useComplaintClosedMutation, useGetbranchByMobileQuery, useGetComplaintsQuery } from '../services/complaintApi'
import { useGetbranchesQuery } from '../services/schoolApi';

function Callcenter() {
  const [search, setSearch] = useState("");
  const [selBranch, setSelBranch] = useState([]);
  const [selStatus, setSelStatus] = useState("all");

  const { isLoading, data, refetch } = useGetComplaintsQuery({
    branches: selBranch,
    status: selStatus !== "all" ? selStatus : null,
    mobile: search,
  });

  const { isLoading: bLoading, data: bdata } = useGetbranchesQuery();
  const [closedFn] = useComplaintClosedMutation();

  useEffect(() => {
    refetch();
  }, [selBranch, selStatus, search]);

  const handleBranch = (e) => {
    const { value, checked } = e.target;
    setSelBranch((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  };

  const handleStatus = (e) => {
    setSelStatus(e.target.value);
  };

  const handleCloseComplaint = (id) => {
    closedFn(id).then((res) => {
      console.log("Complaint closed:", res);
    });
  };

  return (
    <div>
      <h3 className="text-center my-4">COMPLAINTS</h3>
      <input
        type="text"
        className="form-control p-2 mb-3 w-25"
        placeholder="Mobile Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: "580px" }}
      />
      <div className="d-flex p-3">
        <div className="w-25">
          <h5>Branches</h5>
          {bLoading ? (
            <p>Loading branches...</p>
          ) : (
            bdata?.map((branch) => (
              <div key={branch._id}>
                <input
                  type="checkbox"
                  id={branch.branchname}
                  value={branch.branchname}
                  checked={selBranch.includes(branch.branchname)}
                  onChange={handleBranch}
                />
                <label htmlFor={branch.branchname} className="ms-2">
                  {branch.branchname}
                </label>
              </div>
            ))
          )}
        </div>
        <div className="w-75">
          <div className="mb-4">
            <div>
              {["all", "assigned", "accepted", "solved", "closed"].map(
                (status) => (
                  <label key={status}>
                    <input
                      type="radio"
                      value={status}
                      checked={selStatus === status}
                      onChange={handleStatus}
                      className="ms-3"
                    />{" "}
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </label>
                )
              )}
            </div>
          </div>
          <div>
            <table className="table table-bordered text-center container shadow-sm">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Mobile</th>
                  <th>Branch</th>
                  <th>Complaint</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((complaint, index) => {
                  const currentStatus = [...complaint.status]
                    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0]
                    .code;

                  return (
                    <tr key={index}>
                      <td>{complaint.studentname}</td>
                      <td>{complaint.mobile}</td>
                      <td>{complaint.branch}</td>
                      <td>{complaint.complaint}</td>
                      <td>
                        {currentStatus === "registered" && (
                          <button
                            className="btn btn-success"
                            onClick={() => handleCloseComplaint(complaint._id)}
                          >
                            Close
                          </button>
                        )}
                        {currentStatus === "assigned" && (
                          <b>Waiting for Acceptance</b>
                        )}
                        {currentStatus === "accepted" && <b>Processing</b>}
                        {currentStatus === "solved" && <b>Waiting for Closed</b>}
                        {currentStatus === "closed" && <b>Complaint Closed</b>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Callcenter;
