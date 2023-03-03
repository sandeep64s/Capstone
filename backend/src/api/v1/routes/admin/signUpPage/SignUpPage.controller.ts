import { Request, RequestHandler, Response } from "express";
import { IAddUserReq, IUser } from "../../../../../types/loginPage";
import { CustomError } from "../../../../../db/models/custom-error.model";
import { User } from "../../../../../db/models/users.model";
import nodeMail from "nodemailer";
import { userInfo } from "os";
import mongoose from "mongoose";

const transporter = nodeMail.createTransport({
    service: "outlook",
    auth: {
        user: process.env.FROM_MAIL,
        pass: process.env.MAIL_PASS,
    },
});

const validateOneInput = (condition: {}) => {
    return new Promise((resolve, reject) => User.find(condition, (err: Error, data: IUser[]) => {
        if (!err) {
            if (data.length === 0) {
                resolve({ success: true });
                // return true;
            } else {
                reject({ success: false });
                // return false;
            }
        } else {
            reject({ err });
            // return false;
        }
    }));
}

export const addUser: RequestHandler = async (req: IAddUserReq, res: Response) => {
    const newUser: IUser = {
        ...req.body,
    };

    let emailValid: boolean = false;
    let userValid: boolean = false;

    await validateOneInput({ username: newUser.username })
        .then((res) => { userValid = true })
        .catch((err) => { userValid = false });

    await validateOneInput({ email: newUser.email })
        .then((res) => { emailValid = true })
        .catch((err) => { emailValid = false });

    if (userValid && emailValid) {
        let saveUser = new User(newUser);

        saveUser.save()
            .then((result) => {
                const link = generateSignKey(saveUser.id);
                console.log(link);
                
                let mailOptions = {
                    from: process.env.FROM_MAIL, // sender address
                    to: `${saveUser.email}`, // list of receivers
                    subject: "Account Verification", // Subject line
                    text: "Thanks for signing up!", // plain text body
                    html: `<a style="background-color: #0096FF; color: white; font-size: 1rem; padding: 1rem 2rem;" href="${link}">Click to activate</a>`, // html body
                };
                console.log(mailOptions);
                
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('email sent');
                    }
                });
                console.log("Verify Account @" + link);
                res.send({
                    validity: true,
                    message: "Please verify your email"
                });
            })
            .catch((err) => {
                res.send(new CustomError('Error while saving', 401, err))
            })
    } else if (userValid && !emailValid) {
        res.send({
            validity: false,
            message: "Account with this email already exists"
        });
    } else if (!userValid && emailValid) {
        res.send({
            validity: false,
            message: "Account with this username already exists"
        });
    } else {
        res.send({
            validity: false,
            message: "Invalid Email and User"
        });
    }
}

export const verifyEmail = async (req: Request, res: Response) => {
    try{
    const id = new mongoose.Types.ObjectId(req.params.signKey);
    User.findOneAndUpdate({ _id: id }, { isVerified: true, isActive: true }).then((data) => {
        if (!data) {
            res.send({
                verified: false,
                message: "Invalid Verification Link"
            });
        } else {
            res.send({
                verified: true,
                message: "Thanks for verifying your Email"
            });
        }
    }).catch(err => res.send({
        verified: false,
        message: err
    }));
}
catch{
    res.send({
        verified: false,
        message: "wrong id dont try to cheat us you mongrel"
    })
}
}


const generateHTML = (link: string): string => {
    return `
        <div>
            <h1>Thanks For Signing Up</h1>
            <a href="${link}"></a>
        </div>
    `;
}

const generateSignKey = (payload: string): string => {
    return `http://localhost:${process.env.PORT}/api/v1/signup/verify/${payload}`;
}


