import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ApprovedOutpass from "./ApprovedOutpass";

const OutpassHistory = () => {
  const { user } = useAuth();
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    const loadOutpasses = () => {
      const storedOutpasses = JSON.parse(localStorage.getItem("outpassRequests") || "[]");
      const userOutpasses = storedOutpasses.filter(
        (outpass) => outpass.email === user?.email
      );
      setOutpasses(userOutpasses);
    };

    loadOutpasses();
    window.addEventListener("storage", loadOutpasses);
    return () => window.removeEventListener("storage", loadOutpasses);
  }, [user?.email]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Outpass History</h2>
      
      {outpasses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No outpass history found</p>
      ) : (
        <div className="space-y-4">
          {outpasses.map((outpass) => (
            <div key={outpass.id}>
              {outpass.status === "approved" ? (
                <ApprovedOutpass outpass={outpass} />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold">Time Out:</p>
                      <p>{new Date(outpass.timeOut).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Time In:</p>
                      <p>{new Date(outpass.timeIn).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Reason:</p>
                    <p>{outpass.reason}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Status:</p>
                    <p className={`${
                      outpass.status === "rejected" ? "text-red-600" : "text-yellow-600"
                    }`}>
                      {outpass.status.toUpperCase()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OutpassHistory;