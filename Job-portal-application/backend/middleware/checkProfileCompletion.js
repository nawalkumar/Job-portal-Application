// middleware/checkProfileCompletion.js

import { User } from "../models/user.model.js";

export const checkProfileCompletion = async (req, res, next) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // ✅ Basic details
        const isBasicComplete =
            user.fullname &&
            user.email &&
            user.phoneNumber;

        // ✅ Profile details (if you store them in user.profile)
        const profile = user.profile || {}; // prevent undefined
        const isProfileComplete =
            profile.resume || profile?.resumeUrl || profile?.cv; // modify based on actual field

        if (!isBasicComplete || !isProfileComplete) {
            return res.status(400).json({
                message: "Please complete your profile before applying",
                missing: {
                    fullname: !user.fullname,
                    email: !user.email,
                    phoneNumber: !user.phoneNumber,
                    resume: !isProfileComplete,
                },
                success: false,
            });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
