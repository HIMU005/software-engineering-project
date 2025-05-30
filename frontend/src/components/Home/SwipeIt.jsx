import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SwipeIt = ({ hero = {} }) => {
  const { title, description, backgroundImage, buttonText } = hero;

  return (
    <div>
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        }}
        className="relative bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
              {title}
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed text-white">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/dashboard"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                {buttonText}
              </Link>

              <button className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

SwipeIt.propTypes = {
  hero: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    backgroundImage: PropTypes.string,
    buttonText: PropTypes.string,
  }),
};

export default SwipeIt;
