// import React, { useEffect, useState } from "react";
// import { useData } from "../../contexts/DataContext";
// import axios from "axios";
// import { format } from "date-fns";
// export function RecentPatients() {
//   // const { patients } = useData();
//   // const recentPatients = patients
//   //   .sort(
//   //     (a, b) =>
//   //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   //   )
//   //   .slice(0, 5);
//   const { patients, setPatients } = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:5000/api/patients");
//       console.log(response.data);
//       setPatients(response.data);
//     };
//     fetchData();
//   }, []);
//   const recentPatients = patients;
//   // .sort(
//   //   (a, b) =>
//   //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   // )
//   // .slice(0, 5);
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
//       <div className="space-y-4">
//         {recentPatients.map((patient) => (
//           <div key={patient._id} className="flex items-center justify-between">
//             <div>
//               <p className="font-medium">{patient.name}</p>
//               <p className="text-sm text-gray-600">{patient.email}</p>
//             </div>
//             {/* <p className="text-sm text-gray-500">
//               {format(new Date(patient.createdAt), "MMM d, yyyy")}
//             </p> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
//
import React, { useEffect, useState } from "react";
import axios from "axios";

export function RecentPatients() {
  const [patients, setPatients] = useState([]); // Initialize state as an array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients");
        console.log(response.data); // Log the response to verify data
        setPatients(response.data); // Set the fetched data in state
      } catch (error) {
        console.error("Error fetching patients:", error); // Handle errors
      }
    };
    fetchData();
  }, []);

  const recentPatients = patients
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5); // Get the 5 most recent patients

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Patients</h3>
      <div className="space-y-4">
        {recentPatients.map((patient) => (
          <div key={patient._id} className="flex items-center justify-between">
            <div>
              <p className="font-medium">{patient.name}</p>
              <p className="text-sm text-gray-600">{patient.email}</p>
            </div>
            <p className="text-sm text-gray-500">
              {new Date(patient.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
