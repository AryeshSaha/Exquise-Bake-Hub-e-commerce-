import axios from "axios";
import { BaseUrl } from "./_app";

const apitest = () => {
  const testApi = async () => {
    const token = localStorage.getItem("token");
    if (!token) alert("No token");
    // console.log(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const { data } = await axios.get(`${BaseUrl}/api/hello`, config);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={testApi}
        className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Test
      </button>
    </div>
  );
};

export default apitest;
