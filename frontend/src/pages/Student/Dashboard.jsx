import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/api";
import { Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { setStudent } from "@/features/studentSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { setQrCodes } from "@/features/qrCodeSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qrCodes = useSelector((state) => state.qrCode.qrCodes);
  const [loading, setLoading] = useState(true);
  const student = useSelector((state) => state.student);

  useEffect(() => {
    (async () => {
      if (!student._id) {
        try {
          const res = await api.get("/student/check-auth");
          dispatch(setStudent(res.data.student));
        } catch (error) {
          toast.error(error.response.data.message);
          navigate("/student/login");
        } finally {
          setLoading(false);
        }
      }

      if (student._id) {
        try {
          const res = await api.get(`/student/getScanHistory/${student._id}`);
          dispatch(setQrCodes(res.data));
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [dispatch, navigate, student._id]);

  return (
    <div className="min-h-screen max-w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-10">
        Welcome, {student.fullname}!
      </h1>
      <Button onClick={() => navigate("/student/scan")} className="my-10">
        Scan QR Code
      </Button>

      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="mt-10 font-medium text-md md:text-3xl">
            Attendance History
          </h1>
          <Table className="max-w-[70vw] mx-auto mt-5">
            <TableHeader>
              <TableRow className="[&>*]:text-black [&>*]:text-center ">
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:block pt-2">
                  Teacher Name
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map((qrCode) => (
                <TableRow key={qrCode.createdAt} className="[&>*]:text-center">
                  <TableCell>{qrCode.teacherSubject}</TableCell>
                  <TableCell className=" hidden md:block pt-2">
                    {qrCode.teacherName}
                  </TableCell>
                  <TableCell>{qrCode.markedByStudents[0]?.scanDate}</TableCell>
                  <TableCell>{qrCode.markedByStudents[0]?.scanTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
