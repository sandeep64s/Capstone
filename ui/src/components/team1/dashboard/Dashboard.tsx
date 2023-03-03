import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { deleteUsers, fetchUsers } from "../../../store/users/userSlice";
import Row from "../row/Row";
import "../row/Row.css"
import "./dashboard.css";
import { ViewModal } from "../viewModal/ViewModal";
import { DeleteModal } from '../deleteModal/DeleteModal';
import { User } from "../../../types/UserTypes";
import { getCookie } from "../utils/cookies";

export default function Dashboard() {
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  const useAppDispatch: () => AppDispatch = useDispatch;
  const data = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();
  const [checked, setchecked] = useState<number[]>([]);
  const [openView, setopenView] = useState<boolean>(false);
  const [activeIndex, setactiveIndex] = useState<number>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchUsers());
    console.log(data);
  }, []);

  const handleOpenClose = ()=>{
    setopenView(false);
  }

  const openOpenView = (i : number) =>{
    console.log(i);
    
    setactiveIndex(i)
    setopenView(true)
  }

  const handleDeleteModal = ()=>{
    setOpenDelete(true);
  }
  const handleDeleteClose = () =>{
      setOpenDelete(false);
  }

  const handleChecks = (e: any, i : number)=>{
    if(e.target.id == "select-all"){
      if(checked.length!=data.length){
      let temp = Array.from(Array(data.length).keys());
      setchecked(temp);
      }
      else{
        setchecked([]);
      }
    }
    else{
    const index = checked.indexOf(i);
    setchecked((state : number[])=>{
      if(index===-1){
      return [...state, i]
      }
      else{
        return state.filter((s)=>{ return s!=i})
      }
    })
  }
    console.log(checked);
  }
  
  const handleDelete = ()=>{
      let userNames = data.filter((e, index)=>{
        return checked.indexOf(index)!==-1;
      }).map((e : User)=>{return e.username})
    
      setactiveIndex(undefined)
    dispatch(deleteUsers({username : userNames}));
    setchecked([]);
    handleDeleteClose();
  }


  return (
    <>
    <div className="users-container">
      <div className="fixed-header">
        <div className="dashboard-heading row-auth">
          <h1 id="table-title" >User Details Dashboard</h1>
          <button id="dashboard-delete-btn" disabled={checked.length == 0} onClick={handleDeleteModal}>Delete</button>
        </div>
        <hr id='table-hr-1' />
        <div className="table-headers row-auth">
          <input id="select-all" type="checkbox" onClick={(e)=>handleChecks(e, -2)}></input>
          {["Username", "First Name", "Last Name", "Email Address"].map((e, index)=>{
            return <p className="table-col-1" key={index}>{e}</p>
          })}
        </div>
      </div>
      <div className="fetched-rows">
        {(data.length>0) ? data.map((e : User, index) => {
          if(e.username!==JSON.parse(getCookie("user")).username){
          return <Row key={index} user={e} index={index} handleChecks={handleChecks} isChecked={checked.indexOf(index)!=-1} handleOpenModal={openOpenView} />;
          }
        }) : <h1> </h1>}
      </div>
    </div>
    {(activeIndex) && <ViewModal open={openView} entry={data[activeIndex]} handleClose={handleOpenClose} ></ViewModal>}
      <DeleteModal open={openDelete} handleClose = {handleDeleteClose} handleDelete={handleDelete}/>
    </>
  );
}
