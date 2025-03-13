import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

export default function GettingStarted() {
  return (
    <>
      <h2
        id="gettingStarted"
        className="text-2xl md:text-4xl text-center mt-20"
      >
        Get Started
      </h2>
      <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-x-14 my-10 mx-10 lg:mx-40">
        {/* Students Card */}
        <Card className="mb-10 text-center shadow-2xl hover:scale-105 transition">
          <CardHeader>
            <CardTitle className="text-2xl">Student</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Students can scan QR codes provided by their teachers to mark
              attendance and also view their attendance history.
            </p>
          </CardContent>
          <CardFooter className="flex flex-row sm:justify-between">
            <NavLink to="/student/signup">
              <Button className="cursor-pointer mx-auto sm:mx-0">
                Register as Student
              </Button>
            </NavLink>
            <NavLink
              to="https://github.com/anand-shete/Attendance-Management-System?tab=readme-ov-file#attendance-management-system"
              target="_blank"
              className="hidden sm:inline  hover:underline "
            >
              Read the Guide
            </NavLink>
          </CardFooter>

          {/* Teacher Card */}
        </Card>
        <Card className="mb-10 text-center shadow-2xl hover:scale-105 transition">
          <CardHeader>
            <CardTitle className="text-2xl">Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Teachers can generate new QR codes, track attendance for
              individual student, and manage their records with ease.
            </p>
          </CardContent>
          <CardFooter className="flex flex-row sm:justify-between">
            <NavLink to="/teacher/signup">
              <Button className="cursor-pointer mx-auto sm:mx-0">
                Register as Teacher
              </Button>
            </NavLink>
            <NavLink
              to="https://github.com/anand-shete/Attendance-Management-System?tab=readme-ov-file#attendance-management-system"
              className="hidden sm:inline  hover:underline "
              target="_blank"
            >
              Read the Guide
            </NavLink>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
