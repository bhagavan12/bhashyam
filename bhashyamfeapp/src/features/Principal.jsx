import React, { useEffect, useState } from 'react'
import { useGetbranchesQuery, useGetcomplaintsBranchQuery } from '../services/schoolApi';
import { useAcceptComplaintMutation, useSolvingComplaintMutation } from '../services/complaintApi';

function Principal() {
  // // var {isLoading,data,refetch} =  useGetcomplaintsBranchQuery();
  // const { isLoading, data, refetch } = useGetcomplaintsBranchQuery({ search, status: selstatus });
  // console.log(isLoading,data);
  // var [filcom,setFilCom] = useState([]);
  // var [acceptFn] = useAcceptComplaintMutation();
  // var [solveFn] = useSolvingComplaintMutation();
  // var [search,setSearch] = useState("");
  // // var [selectbranch,setSelectBranch] = useState([]);
  // var [selstatus,setSelStatus] = useState('all');
  // // var {isLoading:bLoading,data:bdata} = useGetbranchesQuery();
  
  // function acceptCom(id){
  //   acceptFn(id).then((res)=>{
  //     console.log(res);
  //   })
  // }

  // function solveCom(id){
  //   solveFn(id).then((res)=>{
  //     console.log(res);
  //   })
  // }
  // useEffect(()=>{
  //   if(data){
  //     var filter = data?.filter((com) => {
  //       var newstatus = [...com.status].sort((a,b)=> { return a.timestamp < b.timestamp ? 1 : -1})[0];
  //       return ['assigned','accepted','solved','closed'].includes(newstatus.code);
  //     })
  //     setFilCom(filter);
  //   }
  // },[data])
  const [search, setSearch] = useState('');
  const [selstatus, setSelStatus] = useState('all');

  const { isLoading, data, refetch } = useGetcomplaintsBranchQuery({ search, status: selstatus });
  const [acceptFn] = useAcceptComplaintMutation();
  const [solveFn] = useSolvingComplaintMutation();

  function acceptCom(id) {
    acceptFn(id).then((res) => {
      console.log(res);
    });
  }

  function solveCom(id) {
    solveFn(id).then((res) => {
      console.log(res);
    });
  }

  function handleStatus(e) {
    setSelStatus(e.target.value);
    refetch(); // Refetch the query with the new status
  }
  useEffect(() => {
    refetch({ search, status: selstatus });
  }, [search, selstatus, refetch]);

  // function MobileFil(m){
  //   return (
  //     (m.mobile && String(m.mobile).includes(search)) &&
  //     (selectbranch.length === 0 || selectbranch.includes(m.branch))
  //   )
  // }
  // var MobileFiltered = filcom?.filter(MobileFil);
  // var StatusFiltered = MobileFiltered.filter((complaint)=>{
  //     if(selstatus === 'all'){
  //         return true;
  //     } else {
  //       return complaint.status.some((status) => status.code === selstatus);
  //     }
  // })

  // function handleBranch(e) {
  //   var { value, checked } = e.target;
  //   var checkupdates;
  //   if (checked) {
  //     checkupdates = [...selectbranch, value];
  //   } else {
  //     checkupdates = selectbranch.filter((b) => b !== value);
  //   }
  //   setSelectBranch(checkupdates);
  // }


  function handleStatus(e){
    setSelStatus(e.target.value)
  }
  return (
    <div>
      <h4 className="text-center my-4">PRINCIPAL</h4>
      <input
        type="text"
        className="form-control p-2 mb-3 w-25"
        placeholder="Mobile Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginLeft: '580px' }}
      />
      <div className="d-flex p-3">
        <div className="w-75">
          <div className="mb-4">
            <div>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={selstatus === 'all'}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                All
              </label>
              <label>
                <input
                  type="radio"
                  value="assigned"
                  checked={selstatus === 'assigned'}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                Assigned
              </label>
              <label>
                <input
                  type="radio"
                  value="accepted"
                  checked={selstatus === 'accepted'}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  value="solved"
                  checked={selstatus === 'solved'}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                Solved
              </label>
              <label>
                <input
                  type="radio"
                  value="closed"
                  checked={selstatus === 'closed'}
                  onChange={handleStatus}
                  className="ms-3"
                />{' '}
                Closed
              </label>
            </div>
          </div>
          <div>
            <table className="table table-bordered text-center container shadow-sm">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Mobile</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((complaint, i) => {
                  const currentStatus = [...complaint.status].sort((a, b) => b.timestamp - a.timestamp)[0];

                  return (
                    <tr key={i}>
                      <td>{complaint.studentname}</td>
                      <td>{complaint.mobile}</td>
                      <td>{complaint.complaint}</td>
                      <td>{currentStatus.code}</td>
                      <td>
                        {currentStatus.code === 'assigned' && (
                          <button className="btn btn-warning" onClick={() => acceptCom(complaint._id)}>
                            Accept
                          </button>
                        )}
                        {currentStatus.code === 'accepted' && (
                          <button className="btn btn-warning" onClick={() => solveCom(complaint._id)}>
                            Solve
                          </button>
                        )}
                        {currentStatus.code === 'solved' && <b>Waiting for Closed</b>}
                        {currentStatus.code === 'closed' && <b>Closed</b>}
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
  )
}

export default Principal

// <div>
//    <h4 className='text-center my-4'>PRINCIPAL</h4>
//    <input type="text" className='form-control p-2 mb-3 w-25' placeholder='Mobile Number'
//    value={search} onChange={(e)=>{setSearch(e.target.value)}} style={{marginLeft:'580px'}}/>
//    <div className='d-flex p-3'>
//         <div className='w-25'>
//               {
//                 !bLoading && bdata?.map((d,i)=>{
//                       return (
//                         <div key={i}>
//                           <input type="checkbox" value={d.branchname} className='form-check-input'
//                           checked={selectbranch.includes(d.branchname)} onChange={handleBranch}/>
//                           <label htmlFor={d.branchname} className='form-check-label ms-3 mb-2'>
//                             {d.branchname}
//                           </label>
//                         </div>
//                       )
//                 })
//               }
//         </div>
//         <div className='w-75'>
//             <div className='mb-4'>
//               <div>
//                     <label>
//                         <input type="radio" value='all' checked={selstatus === 'all'} onChange={handleStatus} className='ms-3' /> All
//                     </label>
//                     <label>
//                         <input type="radio" value='assigned' checked={selstatus === 'assigned'} onChange={handleStatus} className='ms-3' /> Assigned
//                     </label>
//                     <label>
//                         <input type="radio" value='accepted' checked={selstatus === 'accepted'} onChange={handleStatus}   className='ms-3' /> Pending
//                     </label>
//                     <label>
//                         <input type="radio" value='solved' checked={selstatus === 'solved'} onChange={handleStatus}   className='ms-3' /> Solved
//                     </label>
//                     <label>
//                         <input type="radio" value='closed' checked={selstatus === 'closed'} onChange={handleStatus}   className='ms-3' /> Closed
//                     </label>
//                 </div> 
//             </div>
//             <div>
//                   <table className='table table-bordered text-center container shadow-sm'>
//                         <thead>
//                               <tr>
//                                     <th>Student Name</th>
//                                     <th>Mobile</th>
//                                     <th>Branch</th>
//                                     <th>Complaint</th>
//                                     <th>Status</th>
//                                     <th>Action</th>
//                               </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 StatusFiltered?.map((d,i)=>{
//                                       var newstatus =  [...d.status].sort((a,b)=>{return a.timestamp<b.timestamp ? 1:-1})[0];
                                    
//                                       return (
//                                         <tr key={i}>
//                                             <td>{d.studentname}</td>
//                                             <td>{d.mobile}</td>
//                                             <td>{d.branch}</td>
//                                             <td>{d.complaint}</td>
//                                             <td>
//                                                 { newstatus.code}
//                                             </td>
//                                             <td>
//                                               {
//                                                 newstatus.code === 'assigned'
//                                                 && <>
//                                                     <button className='btn btn-warning' onClick={()=>{acceptCom(d._id)}}>Accept</button>
//                                                 </>
//                                               }
//                                               {
//                                                 newstatus.code === 'accepted'
//                                                 && <>
//                                                     <button className='btn btn-warning' onClick={()=>{solveCom(d._id)}}>Solve</button>
//                                                 </>
//                                               }
//                                               {
//                                                 newstatus.code === 'solved'
//                                                 && <>
//                                                     <b>Waiting for Closed</b>
//                                                 </>
//                                               } 
//                                               {
//                                                 newstatus.code === 'closed'
//                                                 && <>
//                                                     <b>Closed</b>
//                                                 </>
//                                               }
//                                             </td>
//                                         </tr>
//                                       )
//                                 })
//                             }
//                         </tbody>
//                   </table>
//             </div>
//         </div>
//    </div>
// </div>