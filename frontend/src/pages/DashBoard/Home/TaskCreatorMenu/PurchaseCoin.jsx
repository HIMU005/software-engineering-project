import { Helmet } from "react-helmet-async";
import PurchaseCoinCard from "../../../../components/DashBoard/TaskCreator/PurchaseCoinCard";

const PurchaseCoin = () => {
  return (
    <div>
      <Helmet>
        <title>Work Provider || Dashboard | Purchase Coin</title>
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <PurchaseCoinCard coinNumber={10} price={1} />
        <PurchaseCoinCard coinNumber={100} price={9} />
        <PurchaseCoinCard coinNumber={500} price={19} />
        <PurchaseCoinCard coinNumber={1000} price={39} />
      </div>
    </div>
  );
};

export default PurchaseCoin;
