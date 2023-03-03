import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchActiveTrainees } from "../../../store/trainee/traineeSlice";
import ViewModal from "./ViewModal";
import { fetchTrainings } from "../../../store/trainings/trainingsSlice";
import TraineeDeleteModal from "./DeleteModal";

export default function View() {
	const dispatch = useAppDispatch();
	const errorMessage = useAppSelector((state) => state.trainee.error);
	const viewAll = useAppSelector((state) => state.trainee.trainees);
	const pageState = useAppSelector((state) => state.trainee.page);
	const [deleteModal, setDeleteModal] = useState(false);
	const [deleteTrainee, setDeleteTrainee] = useState(0);
	useEffect(() => {
		dispatch(fetchTrainings());
		dispatch(fetchActiveTrainees());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function handlePerPage(e: React.ChangeEvent<HTMLSelectElement>) {
		dispatch(
			fetchActiveTrainees({
				perPage: Number(e.target?.value),
				currPage: 1,
			})
		);
	}

	function handlePrevPage() {
		if (
			pageState.currentPage <= pageState.pageCount &&
			pageState.currentPage != 1
		)
			dispatch(
				fetchActiveTrainees({
					perPage: pageState.perPage,
					currPage: pageState.currentPage - 1,
				})
			);
	}

	function handleNextPage() {
		if (pageState.currentPage < pageState.pageCount)
			dispatch(
				fetchActiveTrainees({
					perPage: pageState.perPage,
					currPage: pageState.currentPage + 1,
				})
			);
	}

	return (
		<>
			{errorMessage && (
				<>
					<div className="items-center flex overflow-x-scroll overflow-y-scroll fixed inset-0 z-50 outline-none focus:outline-none">
						<div className="relative w-40 h-40 my-6 mx-auto min-w-max">
							{/*content*/}
							<div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*body*/}
								<div className="relative p-10 flex-auto justify-center">
									<div className="text-red-500 text-xl font-semibold italic">
										{errorMessage}
									</div>
								</div>
								<div>
									<div className="flex items-center justify-end p-3 border-slate-200 rounded-b">
										<button
											className="btn btn-error"
											onClick={() =>
												dispatch(fetchActiveTrainees())
											}
										>
											Okay
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}

			{
				deleteModal && (
					<TraineeDeleteModal
						setDeleteModal={setDeleteModal}
						setDeleteTrainee={setDeleteTrainee}
						traineeId={deleteTrainee}
					/>
				)

				// TraineeDeleteModal(
				// 	setDeleteModal,
				// 	setDeleteTrainee,
				// 	deleteTrainee
			}

			<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
				<div className="mx-auto my-auto w-3/4 bg-slate-100">
					<div className="flex flex-row space-x-20 items-center justify-end">
						<div>
							Per page:
							<select
								onChange={(e) => handlePerPage(e)}
								name="perpage"
							>
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
							</select>
						</div>
						<div>
							Showing {viewAll.length}/{pageState.total} results
						</div>
						<div>
							<div className="btn-group">
								<button
									className="btn"
									onClick={handlePrevPage}
								>
									«
								</button>
								<div className="text-center mx-2 my-auto">
									{pageState.currentPage}
								</div>
								<button
									className="btn"
									onClick={handleNextPage}
								>
									»
								</button>
							</div>
						</div>
					</div>
				</div>
				<table className="w-3/4 ml-auto mr-auto text-sm text-left text-gray-500 ">
					<thead className="text-xs text-gray-700 uppercase bg-orange-100 ">
						<tr>
							<th scope="col" className="py-3 px-6">
								Trainee
							</th>
							<th scope="col" className="py-3 px-6">
								Email
							</th>
							<th scope="col" className="py-3 px-6">
								Training
							</th>
							<th scope="col" className="py-3 px-6">
								Status
							</th>
							<th scope="col" className="py-3 px-3"></th>
							<th scope="col" className="py-3 px-1"></th>
							<th scope="col" className="py-3 px-1"></th>
						</tr>
					</thead>
					<tbody>
						{viewAll.map((trainee) => {
							return (
								<tr
									className="bg-white border-b "
									key={trainee.traineeId}
								>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<img
														src={
															trainee
																? trainee.profilePic
																	? `${
																			import.meta
																				.env
																				.VITE_SERVERURL
																	  }/static/profilePic/` +
																	  trainee
																			.profilePic
																			.filename
																	: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
																: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
														}
														alt="Avatar"
													/>
												</div>
											</div>
											<div>
												<div className="font-bold">
													{trainee.name}
												</div>
												<div className="text-sm opacity-50">
													{trainee.traineeId}
												</div>
											</div>
										</div>
									</td>
									<td className="py-4 px-6">
										{trainee.email}
									</td>
									<td className="py-4 px-6">
										[{trainee.training.trainingId}]{" "}
										{trainee.training.name}
									</td>
									<td className="py-4 px-6">
										{trainee.isValid
											? "Updated"
											: "Not Updated"}
									</td>
									<td>
										<a
											href={
												trainee.resume
													? `${
															import.meta.env
																.VITE_SERVERURL
													  }/static/resume/` +
													  trainee.resume?.filename
													: undefined
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											<button
												className={
													trainee.isValid
														? "btn text-yellow-500 bg-transparent  hover:bg-transparent border-none"
														: "btn-disabled hover:cursor-not-allowed" +
														  "font-bold uppercase text-sm px-6 py-3 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
												}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
														clipRule="evenodd"
													/>
													<path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
												</svg>{" "}
												Resume
											</button>
										</a>
									</td>
									<td>
										<ViewModal {...trainee} />
									</td>
									<td>
										<button
											className="btn border-none text-red-500 bg-transparent hover:bg-transparent font-bold uppercase text-sm px-6 py-3 mr-1 mb-1 ease-linear transition-all duration-150"
											onClick={() => {
												setDeleteModal(true);
												setDeleteTrainee(
													trainee.traineeId
												);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fillRule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
