import { FaHome } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { MdOutlineManageHistory } from "react-icons/md";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import NavigationDash from "../NavigationDash";

const AdminMenu = () => {
  return (
    <nav>
      <NavigationDash label="Home" address="/dashboard" icon={FaHome} />

      <NavigationDash
        label="Withdraw Request"
        address="/dashboard/withdrawRequest"
        icon={PiHandWithdrawDuotone}
      />

      <NavigationDash
        label="Manage Users"
        address="/dashboard/manage-users"
        icon={FcManager}
      />

      <NavigationDash
        label="Manage Tasks"
        address="/dashboard/manage-tasks"
        icon={MdOutlineManageHistory}
      />
    </nav>
  );
};

export default AdminMenu;
