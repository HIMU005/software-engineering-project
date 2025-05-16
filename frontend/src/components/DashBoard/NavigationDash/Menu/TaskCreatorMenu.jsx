import { BiSolidPurchaseTag } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdAddTask, MdOutlineManageHistory } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import NavigationDash from "../NavigationDash";

const TaskCreatorMenu = () => {
  return (
    <nav>
      <NavigationDash label="Home" address="/dashboard" icon={FaHome} />

      <NavigationDash
        label="Review Task"
        address="/dashboard/reviewTask"
        icon={VscPreview}
      />

      <NavigationDash
        label="Add Task"
        address="/dashboard/add-task"
        icon={MdAddTask}
      />

      <NavigationDash
        label="My Tasks"
        address="/dashboard/my-task"
        icon={BsListTask}
      />

      <NavigationDash
        label="Purchase Coin"
        address="/dashboard/purchase-coin"
        icon={BiSolidPurchaseTag}
      />

      <NavigationDash
        label="Payment History"
        address="/dashboard/payment-history"
        icon={MdOutlineManageHistory}
      />
    </nav>
  );
};

export default TaskCreatorMenu;
