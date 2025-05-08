import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { clearStudent } from "@/features/studentSlice";
import { Loader } from "@/components/common";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/student/logout")
      .then((v) => {
        dispatch(clearStudent());
        setLoading(false);
        navigate("/");
      })
      .catch((e) => console.error("Axios error:", e));
  }, [dispatch, navigate]);

  return (
    <div className="min-h-[80vh] max-w-screen flex flex-col justify-center items-center">
      {loading && (
        <>
          <h1 className="text-2xl my-10">Please wait </h1>
          <Loader />
        </>
      )}
    </div>
  );
}
