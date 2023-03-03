import { User } from "../../../types/UserTypes";
import "./Row.css"

export default function Row({ user, index, handleOpenModal, handleChecks, isChecked }: { user: User, index: number, handleOpenModal: (i: number) => void, isChecked: boolean, handleChecks: (e: any, index: number) => void }) {

  return (
    <div className="row-auth">
      <input className="checks" type="checkbox" onChange={(e) => { handleChecks(e, index) }} checked={isChecked}></input>
      {Object.values(user).map((val, i) => {
        return (i == 1 || i == 2 || i == 3 || i == 4) ? <p className="table-col" onClick={() => handleOpenModal(index)} key={i}>{val}</p> : null
      }
      )}
    </div>
  );
}
