import React from 'react'
import Navbar from '../components_lite/Navbar'
const Creator = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
                    <p className="font-md text-blue-600">
                        Instruction to use
                    </p>
                    <ul>
                        <li>
                            1. Sign up/Login to the application.

                        </li>
                        <li>
                            2. Create your profile by adding your skills, bio, and profile picture.
                        </li>
                        <li>
                            3. Browse through the job listings and apply to the ones that match your skills and interests.
                        </li>
                        <li>
                            4. Track your applications and get notified when a company views your profile or contacts you.
                        </li>
                        <li>
                            5. If you are a company, you can post job listings and view applications from potential candidates.
                        </li>

                    </ul>
                    <p className="font-md text-blue-600"> Future Work continue...</p>
                    <ul>
                        <li>
                            1. Creating a community where job seekers and employers can connect  means personalized community where recuriter can create community and share job post. it is personalized job portal.
                        </li>
                        <li>
                            2. Adding more features such as resume building, interview preparation, and career advice.
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Creator