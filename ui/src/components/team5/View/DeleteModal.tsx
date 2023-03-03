import { deleteTrainee } from "../../../store/trainee/traineeSlice";
import React, { useState } from "react";
import { useAppDispatch } from "../../../store";

async function handleDelete(
	setDeleteTrainee: React.Dispatch<React.SetStateAction<number>>,
	traineeId: number,
	dispatch: React.Dispatch<any>,
	type = "soft"
) {
	if (traineeId === 0) {
		return;
	} else {
		if (type === "soft") {
			await dispatch(deleteTrainee({ id: traineeId }));
		} else {
			await dispatch(deleteTrainee({ id: traineeId, hardDelete: true }));
		}
	}
}

function TraineeDeleteModal({
	setDeleteModal,
	setDeleteTrainee,
	traineeId,
}: {
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	setDeleteTrainee: React.Dispatch<React.SetStateAction<number>>;
	traineeId: number;
}) {
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);
	const dispatch = useAppDispatch();
	return (
		<>
			{deleteConfirmation ? (
				<>
					<div className="items-center flex overflow-x-scroll overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-40 h-40 my-6 mx-auto min-w-max">
							{/*content*/}
							<div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*body*/}
								<div className="relative p-10 flex-auto justify-center">
									<div className="text-red-500 text-xl font-semibold italic">
										This will delete the trainee. Are you
										sure? This action cannot be undone.
										<p className="text-slate-400 text-sm text-center">
											You can soft delete the trainee
											instead; this will delete the
											trainee from the view but not from
											the database.
										</p>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-end p-3 border-slate-200 rounded-b">
										<button
											className="btn btn-error ml-2"
											onClick={() => {
												setDeleteModal(false);
												setDeleteConfirmation(false);
												handleDelete(
													setDeleteTrainee,
													traineeId,
													dispatch,
													"hard"
												);
											}}
										>
											Delete
										</button>
										<button
											className="btn btn-warning ml-2"
											onClick={() => {
												setDeleteModal(false);
												setDeleteConfirmation(false);
												handleDelete(
													setDeleteTrainee,
													traineeId,
													dispatch
												);
											}}
										>
											Soft Delete
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : (
				<>
					<div className="items-center flex overflow-x-scroll overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-40 h-40 my-6 mx-auto min-w-max">
							{/*content*/}
							<div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*body*/}
								<div className="relative p-10 flex-auto justify-center">
									<div className="text-red-500 text-xl font-semibold italic">
										Deleting Trainee ...
									</div>
								</div>
								<div>
									<div className="flex items-center justify-end p-3 border-slate-200 rounded-b">
										<button
											className="btn btn-error"
											onClick={() =>
												setDeleteModal(false)
											}
										>
											Cancel
										</button>
										<button
											className="btn btn-error"
											onClick={() => {
												// setDeleteModal(false);
												setDeleteConfirmation(true);
											}}
										>
											Confirm
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}
		</>
	);
}

export default TraineeDeleteModal;
