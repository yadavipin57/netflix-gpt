import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import { toggleMovieDetailsView } from "../utils/movieDetailsSlice";

const VideoTitle = ({ title, overview, movieId }) => {
  const dispatch = useDispatch();

  const handleMovieInfoClick = () => {
    dispatch(toggleMovieDetailsView());
  };

  return (
    <div className="pt-[40%] md:pt-[15%] md:px-24 w-[100%] h-[100%] md:h-screen relative md:absolute z-100 text-white md:bg-gradient-to-br from-black">
      <h1 className="ml-2 mb-1 md:ml-0 md:mb-0 text-sm md:text-6xl md:w-1/2 font-bold">
        {title}
      </h1>
      <p className="hidden md:block py-6 text-lg w-1/2">{overview}</p>
      <div className="w-1/2">
        <button className="ml-2 mb-1 md:ml-0 md:mb-0 text-[10px] py-1 px-2 md:text-base md:mr-2 md:py-2 md:px-6 rounded-sm text-black font-bold bg-gray-200 hover:bg-opacity-75">
          <PlayArrowIcon /> Play
        </button>
        <button
          className="ml-2 mb-1 md:ml-0 md:mb-0 text-[10px] py-1 px-2 md:text-base md:mr-2 md:py-2 md:px-6 rounded-sm text-black font-bold bg-gray-200 hover:bg-opacity-75"
          onClick={handleMovieInfoClick}
        >
          <InfoIcon className="text-black" /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
