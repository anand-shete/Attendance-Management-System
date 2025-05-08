import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setTeacher } from "@/features/teacherSlice";
import { Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { setQrCodes } from "@/features/qrCodeSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const teacher = useSelector((state) => state.teacher);
  const qrCodes = useSelector((state) => state.qrCode.qrCodes);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    (async () => {
      if (!teacher._id) {
        try {
          const res = await api.get("/teacher/check-auth");
          dispatch(setTeacher(res.data.teacher));
        } catch (error) {
          toast(error.response.data.message || "Please Login");
          navigate("/teacher/login");
        } finally {
          setLoading(false);
        }
      }

      if (teacher._id) {
        try {
          const response = await api.get(
            `/teacher/getQrHistory/${teacher._id}`
          );
          const arr = response.data;
          dispatch(setQrCodes(arr));
        } catch (error) {
          console.error("herr Axios error", error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [dispatch, navigate, teacher._id]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const { data: allQrCodes } = await api.post(
        `/teacher/generateQrCode/${teacher._id}`
      );
      dispatch(setQrCodes(allQrCodes));
      const qrCodeUrl = allQrCodes[0]?.qrCodeURL;
      setQrCodeUrl(qrCodeUrl);
      setLoading(false);
    } catch (error) {
      toast.error("Error Generating QR Code");
    }
  };

  const showQrCode = async () => {
    try {
      setQrCodeUrl(qrCodes[0].qrCodeURL);
    } catch (error) {
      console.error(error);
      toast.error("Generate QR Code First");
    }
  };
  return (
    <div className="min-h-[80vh] max-w-screen flex flex-col justify-center items-center ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-10 text-2xl md:text-5xl font-semibold">
            Welcome, {teacher.fullname}!
          </h1>
          {qrCodeUrl && (
            <img className="h-[30vh]" src={qrCodeUrl} alt="qrCode" />
          )}
          <div className="my-10 flex flex-col md:flex-row justify-evenly items-center md:items-stretch space-y-4 md:space-x-10">
            <Button onClick={generateQRCode}>Generate QR Code</Button>
            <Button onClick={showQrCode} disabled={qrCodeUrl}>
              Show Last QR Code
            </Button>
            <Button onClick={() => setQrCodeUrl(null)} disabled={!qrCodeUrl}>
              Hide QR Code
            </Button>
          </div>
          <h1 className="mt-20 mb-10 font-medium text-md md:text-3xl">
            Attendance History
          </h1>
          <Table className="max-w-[70vw] mx-auto mb-20">
            <TableHeader>
              <TableRow className="[&>*]:text-black [&>*]:text-center ">
                <TableHead>Date</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>PRN</TableHead>
                <TableHead className="text-right">Scan Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map((qrCode) =>
                qrCode.markedByStudents.map((obj, index) => (
                  <TableRow key={index} className="[&>*]:text-center">
                    <TableCell>{obj.scanDate}</TableCell>
                    <TableCell>{obj.student.fullname}</TableCell>
                    <TableCell>{obj.student.prn}</TableCell>
                    <TableCell>{obj.scanTime}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
