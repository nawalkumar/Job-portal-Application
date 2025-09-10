import React from 'react'
import Navbar from '../components_lite/Navbar'
import amreshsir from './amreshsir.jpg'; // Import the local image
import ankit from './Ankit.jpg';
import ritik from './ritik.jpg';
import gaurav from './gaurav.jpg';

const Creator = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
          {/* Image Section */}
          <div className="flex justify-center">
            <img src={amreshsir} alt="Amresh Sir" className="h-80 object-cover rounded-lg shadow-md" />
          </div>
          {/* Text Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dr. Amresh Kumar</h2>
            <p className="text-gray-600 mb-2">Dr. Amresh Kumar completed his <strong>B.Tech in Electronics and Communication Engineering (ECE)</strong> from <strong>Shivnand Singh Institution of Technology and Management, Aligarh</strong>, in <strong>2002</strong>.</p>
            <p className="text-gray-600 mb-2">After graduation, he joined <strong>Koderma Mines Institution</strong> as a <strong>part-time lecturer</strong>. He then pursued his <strong>M.Tech in Electrical Engineering</strong> from <strong>BIT Sindri, Dhanbad</strong>.</p>
            <p className="text-gray-600 mb-2">He was later selected as an <strong>Assistant Professor</strong> in the <strong>Electronics and Communication Engineering (ECE) Department</strong> at <strong>MIT Muzaffarpur</strong>. During his tenure there, he also completed his <strong>Ph.D. in Electrical Engineering</strong> from <strong>Bihar University, Muzaffarpur, in 2016</strong>.</p>
            <p className="text-gray-600">Following his Ph.D., he was transferred to <strong>Rashtrakavi Ramdhari Singh Dinkar College of Engineering (RRSDCE)</strong> as an <strong>Assistant Professor in the Electrical and Electronics Engineering (EEE) Department</strong>, where he continues to serve till date.</p>
          </div>
        </div>
      </div>
      
      <hr className="w-full border-gray-300 my-6" />
      
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Developers and Designers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Developer 1 - Ankit Pathak */}
          <a href="https://ankitpathak.vercel.app/" target="_blank" rel="noopener noreferrer" className="block text-center">
            <img src={ankit} alt="Ankit Pathak" className="mx-auto rounded-lg shadow-md" />
            <h3 className="text-lg font-semibold text-gray-700 mt-2">Ankit Pathak</h3>
            <p className="text-gray-600 text-sm">Registration No: 21110125035</p>
            <p className="text-gray-600 text-sm">Full Stack Developer</p>
          </a>
          {/* Developer 2 - Ritik Shrivastava */}
          <a href="#" className="block text-center">
            <img src={ritik} alt="Ritik Shrivastava" className="mx-auto rounded-lg shadow-md" />
            <h3 className="text-lg font-semibold text-gray-700 mt-2">Ritik Shrivastava</h3>
            <p className="text-gray-600 text-sm">Registration No: 21110125043</p>
            <p className="text-gray-600 text-sm">UI/UX Designer</p>
          </a>
          {/* Developer 3 - Gaurav Kumar */}
          <a href="#" className="block text-center">
            <img src={gaurav} alt="Gaurav Kumar" className="mx-auto rounded-lg shadow-md" />
            <h3 className="text-lg font-semibold text-gray-700 mt-2">Gaurav Kumar</h3>
            <p className="text-gray-600 text-sm">Registration No: 21110125023</p>
            <p className="text-gray-600 text-sm">Research</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Creator
