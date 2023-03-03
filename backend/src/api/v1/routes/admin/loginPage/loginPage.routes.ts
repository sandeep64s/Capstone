import { Router } from "express";
import { deleteUserByUserName, getAllUsers, getUserByUserName, getUsers, softDeleteUsersByUserNames, updateUserByUserName, validateUser } from "./loginPage.controller";

const router = Router();

router
    .route('/')
    .get(getUsers);

router
    .route("/all-users")
    .get(getAllUsers);

router
    .route('/:username')
    .get(getUserByUserName);

router
    .route("/validate-user")
    .post(validateUser)

router
    .route("/delete-selected")
    .patch(softDeleteUsersByUserNames);

router 
    .route('/update-one')
    .patch(updateUserByUserName);

router
    .route('/:username')
    .delete(deleteUserByUserName)


export default router;