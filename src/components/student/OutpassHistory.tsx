import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ApprovedOutpass from "./ApprovedOutpass";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OutpassRequestRow from "./OutpassRequestRow";

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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time Out</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outpasses.map((outpass) => (
                <OutpassRequestRow key={outpass.id} request={outpass} />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default OutpassHistory;