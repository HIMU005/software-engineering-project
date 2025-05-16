import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="text-xl font-semibold container">
      <Helmet>
        <title> Work Provider || About </title>
      </Helmet>
      Feature of out website
      <ol className="ml-40 text-lg font-normal">
        <li>A new user can select his role while registering in the website</li>
        <li>
          {" "}
          When a new user came first time in the website if he log in with gmail
          he became a worker
        </li>
        <li> Only Admin can change the role</li>
        <li>Admin can not demote another user from admin</li>
        <li>
          {" "}
          Worker get 10 coin and task creator get 50 coin while registering
        </li>
        <li>Task creator can purchase coin using card(test purpose)</li>
        <li>
          {" "}
          Worker can withdraw coin by bkash, nagad, rocked(bd payment method)
          user must provide authenticate information
        </li>
        <li>Admin can delete task</li>
        <li>Task creator can only accept or reject the submission</li>
        <li> Admin confirm the withdraw request</li>
      </ol>
    </div>
  );
};

export default About;
