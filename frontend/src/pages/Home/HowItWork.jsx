const HowItWork = () => {
  return (
    <div className="my-16">
      <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ">
        How It <span className="text-blue-500">Work</span>
      </h1>
      <p className="text-justify text-xl">
        Upon registering on the website, new users can select their role. If a
        new user logs in with Gmail for the first time, they are automatically
        designated as a worker. Role changes are exclusively managed by the
        Admin, who cannot demote another Admin. Workers receive 10 coins, while
        Task Creators receive 50 coins upon registration. Task Creators have the
        option to purchase additional coins using a card for testing purposes.
        Workers can withdraw their coins via bKash, Nagad, or Rocket (BD payment
        methods), provided they submit authentic information. Admins have the
        authority to delete tasks and confirm withdrawal requests. Task Creators
        are limited to accepting or rejecting task submissions. This structured
        approach ensures a streamlined and professional user experience.
      </p>
    </div>
  );
};

export default HowItWork;
