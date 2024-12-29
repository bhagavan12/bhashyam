// import React, { useEffect, useState } from 'react'
// import { Link, Outlet} from 'react-router-dom'
// import { useGetComplaintsByZonalQuery } from '../../services/schoolZonalApi'
// import { useAssignComplaintMutation } from '../../services/complaintApi';
// import { useGetbranchesQuery } from '../../services/schoolApi';
// function ZonalOfficers() {
//   var {isLoading,data} = useGetComplaintsByZonalQuery();
//   console.log("res",isLoading,data);
//   var [search,setSearch] = useState('');
//   var [assignFn] = useAssignComplaintMutation();
//   var [selBranch,setSelBranch] = useState([]);
//   var [selectbranch,setSelectBranch] = useState([]);
//   var {isLoading:bLoading ,data:bdata} = useGetbranchesQuery();
//   var [selstatus,setSelStatus] = useState('all');

//   // var branches = ["Kukatpally","Nizampet","KPHB Colony","Pragathi Nagar","Paprayudu Nagar Colony","Quthbullapur","New Bowenpally","Dilsukhnagar","Uppal Depot","Vanasthalipuram"]

//   function assignCom(id){
//     assignFn(id).then((res)=>{
//       console.log(res);
//     })
//   }

//   useEffect(() => {
//     if (data) {
//       setSelBranch(data);
//     }
//   },[data]);

//   function MobileFil(m) {
//     return (
//       (m.mobile && String(m.mobile).includes(search)) &&
//       (selectbranch.length === 0 || selectbranch.includes(m.branch))
//     );
//   }

//   var MobileFiltered = selBranch?.filter(MobileFil);
//   var StatusFiltered = MobileFiltered.filter((complaint) => {
//     if (selstatus === 'all') {
//       return true;
//     } else {
//       return complaint.status.some((status) => status.code === selstatus);
//     }
//   });

//   function handleBranch(e) {
//     var { value, checked } = e.target;
//     var checkupdates;
//     if (checked) {
//       checkupdates = [...selectbranch, value];
//     } else {
//       checkupdates = selectbranch.filter((b) => b !== value);
//     }
//     setSelectBranch(checkupdates);
//   }

//   function handleStatus(e) {
//     setSelStatus(e.target.value);
//   }
//   return (
//     <div className='mt-3'>
//       <h4 className='text-center my-4'>ZONAL OFFICER</h4>
//       <input type="text" className='form-control p-2 mb-3 w-25' placeholder='Mobile Number'
//       value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{marginLeft:'580px'}}/>
//       <div className='d-flex p-3'>
//          <div className='w-25'>
//             {
//                !bLoading && bdata?.map((d,i)=>{
//                     return (
//                       <div key={i}>
//                         <input type="checkbox" value={d.branchname} className='form-check-input'
//                         checked={selectbranch.includes(d.branchname)} onChange={handleBranch}/>
//                         <label htmlFor={d.branchname} className='form-check-label ms-3 mb-2'>
//                           {d.branchname}
//                         </label>
//                       </div>
//                     )
//                })
//             }
//          </div>
//          <div className='w-75'>
//             <div className='mb-4'>
//                   <div>
//                       <label>
//                           <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-3' /> All
//                       </label>
//                       <label>
//                           <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus} className='ms-3' /> Assigned
//                       </label>
//                       <label>
//                           <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus}   className='ms-3' /> Pending
//                       </label>
//                       <label>
//                           <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus}   className='ms-3' /> Solved
//                       </label>
//                       <label>
//                           <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus}   className='ms-3' /> Closed
//                       </label>
//                   </div> 
//             </div>
//             <div>
//                 <table className='table table-bordered text-center container shadow-sm'>
//                   <thead>
//                         <tr>
//                               <th>Student Name</th>
//                               <th>Mobile</th>
//                               <th>Branch</th>
//                               <th>Complaint</th>
//                               <th>Status</th>
//                               <th>Action</th>
//                         </tr>
//                   </thead>
//                   <tbody>
//                         {
//                             StatusFiltered?.map((b,i)=>{
//                                 return (
//                                     <tr key={i}>
//                                         <td>{b.studentname}</td>
//                                         <td>{b.mobile}</td>
//                                         <td>{b.branch}</td>
//                                         <td>{b.complaint}</td>
//                                         <td>
//                                             { [...b.status].sort((a,b)=>{ return a.timestamp<b.timestamp ? 1:-1})[0].code}
//                                         </td>
//                                         <td>
//                                             {
//                                                 [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'registered'
//                                                 && <>
//                                                   <button className='btn btn-warning' onClick={()=>{assignCom(b._id)}}>Assign To Principal</button>
//                                                 </>
//                                             }
//                                             {
//                                                 [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'assigned'
//                                                 && <>
//                                                   <b>Waiting for Acceptance</b>
//                                                 </>
//                                             }
//                                             {
//                                                 [...b.status].sort((a,b)=> { return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'accepted'
//                                                 && <>
//                                                     <b>Processing</b>
//                                                 </>
//                                             }
//                                             {
//                                                 [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'solved'
//                                                 && <>
//                                                     <b>Waiting for Closed</b>
//                                                 </>
//                                             }
//                                             {
//                                                 [...b.status].sort((a,b)=>{ return a.timestamp < b.timestamp ? 1 : -1})[0].code === 'closed'
//                                                 && <>
//                                                   <b>Complaint Closed</b>
//                                                 </>
//                                             }
//                                         </td>
//                                     </tr>
//                                 )
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default ZonalOfficers

//v2
import React, { useState } from 'react';
import { useGetComplaintsByZonalQuery } from '../../services/schoolZonalApi';
import { useGetbranchesQuery } from '../../services/schoolApi';
import { useAssignComplaintMutation } from '../../services/complaintApi';

function ZonalOfficers() {
  const [search, setSearch] = useState('');
  const [selectBranch, setSelectBranch] = useState([]);
  const [selStatus, setSelStatus] = useState('all');
  const { isLoading, data } = useGetComplaintsByZonalQuery({
    branches: selectBranch,
    status: selStatus !== 'all' ? selStatus : null,
    mobile: search,
  });
  console.log("data:", data);
  const { isLoading: bLoading, data: bdata } = useGetbranchesQuery();
  const [assignFn] = useAssignComplaintMutation();
  console.log("branches1:", selectBranch)
  function handleBranch(e) {
    const { value, checked } = e.target;
    setSelectBranch((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  }

  function handleStatus(e) {
    setSelStatus(e.target.value);
  }

  function assignCom(id) {
    assignFn(id).then((res) => {
      console.log(res);
    });
  }

  console.log("branches2:", selectBranch)
  return (
    <div className="mt-3">
      <h4 className="text-center my-4">ZONAL OFFICER</h4>
      <input
        type="text"
        className="form-control p-2 mb-3 w-25"
        placeholder="Mobile Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: '580px' }}
      />
      {/* Status Filter */}
      <div className="w-75">
        <h5>Status</h5>
        <div className="mb-4">
          <div>
            {['all', 'assigned', 'accepted', 'solved', 'closed'].map((status) => (
              <label key={status}>
                <input
                  type="radio"
                  value={status}
                  checked={selStatus === status}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex p-3">
        {/* Branch Filter */}
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
                  onChange={handleBranch}
                />
                <label htmlFor={branch.branchname} className="ms-2">
                  {branch.branchname}
                </label>
              </div>
            ))
          )}
        </div>


        {/* Render Complaints Table */}
        <div className="mt-4">
          {isLoading ? (
            <p>Loading complaints...</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Mobile</th>
                  <th>Branch</th>
                  <th>Complaint</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((b, i) => {
                  const currentStatus = [...b.status]
                    .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0].code;

                  return (
                    <tr key={i}>
                      <td>{b.studentname}</td>
                      <td>{b.mobile}</td>
                      <td>{b.branch}</td>
                      <td>{b.complaint}</td>
                      <td>{currentStatus}</td>
                      <td>
                        {currentStatus === 'registered' && (
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              assignCom(b._id);
                            }}
                          >
                            Assign To Principal
                          </button>
                        )}
                        {currentStatus === 'assigned' && (
                          <b>Waiting for Acceptance</b>
                        )}
                        {currentStatus === 'accepted' && <b>Processing</b>}
                        {currentStatus === 'solved' && <b>Waiting for Closed</b>}
                        {currentStatus === 'closed' && <b>Complaint Closed</b>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ZonalOfficers;
