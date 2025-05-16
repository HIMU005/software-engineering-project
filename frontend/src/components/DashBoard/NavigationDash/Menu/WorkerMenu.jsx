import { FaHome, FaTasks } from "react-icons/fa";
import { IoIosCloudDone } from "react-icons/io";
import { PiHandWithdrawFill } from "react-icons/pi";
import NavigationDash from "../NavigationDash";

const WorkerMenu = () => {
  return (
    <div>
      {/* Home Link */}
      <NavigationDash label="Home" address="/dashboard" icon={FaHome} />

      {/* Approved Submission */}
      <NavigationDash
        label="Approved Submission"
        address="/dashboard/approved-submission"
        icon={FaHome} // Consider changing this icon to differentiate from Home
      />

      {/* Task List */}
      <NavigationDash
        label="Task List"
        address="/dashboard/task-list"
        icon={FaTasks}
      />

      {/* My Submission */}
      <NavigationDash
        label="My submission"
        address="/dashboard/my-submission"
        icon={IoIosCloudDone}
      />

      {/* Withdraw */}
      <NavigationDash
        label="WithDraw"
        address="/dashboard/withDraw"
        icon={PiHandWithdrawFill}
      />
    </div>
  );
};

export default WorkerMenu;
