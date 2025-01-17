import { useState, useEffect } from "react";
import {
  API_OPTIONS,
  IMG_CDN_URL,
  MAIN_BG_IMG,
  IMG_CDN_BACKDROP_URL,
} from "../utils/constants";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { clearTVId } from "../utils/tvDetailsSlice";
import ActorCard from "./ActorCard";

const TVDetails = () => {
  const tvShowId = useSelector((store) => store.tvDetails.tvShowId);

  const [tvShowInfo, setTVShowInfo] = useState(null);
  const [castInfo, setCastInfo] = useState(null);
  const [crewInfo, setCrewInfo] = useState(null);
  const [reviews, setReviews] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTVData = async () => {
      try {
        const [tvRes, creditsRes, reviewsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/credits?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${tvShowId}/reviews?language=en-US&page=1`,
            API_OPTIONS
          ),
        ]);

        const tvData = await tvRes.json();
        const creditsData = await creditsRes.json();
        const reviewsData = await reviewsRes.json();

        setTVShowInfo(tvData);
        setCastInfo(creditsData?.cast);
        setCrewInfo(creditsData?.crew);
        setReviews(reviewsData?.results);
      } catch (error) {
        console.error("Failed to fetch TV Show data: ", error);
      }
    };

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });

    if (tvShowId) fetchTVData();
  }, [tvShowId]);

  const directors = crewInfo?.filter((crew) => crew?.job === "Director");
  const writers = crewInfo?.filter((crew) => crew?.job === "Story");

  const isDirectorPresent = directors?.length > 0;
  const isWriterPresent = writers?.length > 0;

  const handleTVDetailsClose = () => {
    dispatch(clearTVId());
  };

  // const revenue = (tvShowInfo?.revenue / 1000000).toFixed(0);
  // const budget = (tvShowInfo?.budget / 1000000).toFixed(0);

  const releaseDateArray = tvShowInfo?.first_air_date?.split("-");
  const releaseMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      {/* <Header /> */}
      <div className=" sm:mt-0 z-50">
        <div className="absolute md:relative -z-20">
          <img
            className="brightness-50 fixed h-screen object-cover md:h-auto top-0"
            src={MAIN_BG_IMG}
            alt="Background-Image"
          />
        </div>
        <div className="mt-[20%] sm:mt-[40%] mx-auto md:mt-[8%] h-fit md:h-[96%] w-[98%] relative bg-black backdrop-blur-lg bg-opacity-25 rounded-xl">
          {/* TOP */}
          <div className="w-full absolute -z-40">
            <img
              className="w-full rounded-xl blur-lg opacity-50"
              src={IMG_CDN_BACKDROP_URL + tvShowInfo?.backdrop_path}
              alt=""
            />
          </div>
          <div
            className="p-2 h-fit text-white absolute right-2 top-2 cursor-pointer hover:bg-[#8f8f8fb8] transition-all rounded-full"
            title="Close"
            onClick={handleTVDetailsClose}
          >
            <CloseIcon />
          </div>
          <div className="py-10 px-4 sm:flex items-start justify-evenly h-fit">
            <div className="flex gap-2 flex-1 w-full sm:h-[426px] ">
              <img
                className="mx-auto w-[144px] block sm:w-[284px] sm:h-[426px] object-cover rounded-lg border border-red-700"
                src={IMG_CDN_URL + tvShowInfo?.poster_path}
                alt={tvShowInfo?.title || "TV Show Poster"}
              />
              <div className="sm:hidden font-bold text-white items-baseline gap-4">
                <div>
                  <div className="text-xl">{tvShowInfo?.title}</div>
                  <div className="mt-1 font-normal">{tvShowInfo?.tagline}</div>
                </div>
                <div
                  className="mt-1 px-1 py-1  w-fit rounded-lg flex itetms-center gap-1 bg-[#eb3944]"
                  title={`Votes: ${tvShowInfo?.vote_count}`}
                >
                  <StarBorderPurple500Icon />{" "}
                  {tvShowInfo?.vote_average?.toFixed(1)}
                </div>
              </div>
            </div>
            {/* MOBILE: Release date, runtime, lang */}
            <div className="my-1 w-full sm:hidden flex justify-between text-white">
              <span title="YYYY-MM-DD">
                {`${releaseMonth[releaseDateArray?.[1] - 1]} ${
                  releaseDateArray?.[2]
                }, ${releaseDateArray?.[0]}`}
              </span>
              <span>|</span>
              <span>{tvShowInfo?.runtime} mins</span>
              <span>|</span>
              <span>{tvShowInfo?.spoken_languages?.[0]?.name}</span>
            </div>
            {/* MOBILE: Genres */}
            <div className="mb-1 sm:hidden flex justify-between text-white gap-4">
              {tvShowInfo?.genres?.map((genre) => {
                return (
                  <span
                    className="px-2 py-1 text-sm rounded-2xl border border-[#a3a3a3] hover:bg-[#8f8f8fb8] transition-all cursor-pointer"
                    key={genre.id}
                  >
                    {genre?.name}
                  </span>
                );
              })}
            </div>

            <div className="flex flex-col justify-between flex-[2] h-[426px]">
              <div className="font-bold text-white hidden sm:flex items-baseline gap-4">
                <div>
                  <div className="sm:text-5xl">{tvShowInfo?.title}</div>
                  <div className="mt-1 font-normal">{tvShowInfo?.tagline}</div>
                </div>
                <div
                  className="px-3 py-1 rounded-lg flex itetms-center gap-1 bg-[#eb3944]"
                  title={`Votes: ${tvShowInfo?.vote_count}`}
                >
                  <StarBorderPurple500Icon />{" "}
                  {tvShowInfo?.vote_average?.toFixed(1)}
                </div>
              </div>
              <div className="text-sm sm:leading-6 text-justify sm:text-[18px] text-white">
                {tvShowInfo?.overview}
              </div>
              {/* Release date, runtime, lang */}
              <div className="hidden sm:block text-white">
                <span title="YYYY-MM-DD">
                  {`${releaseMonth[releaseDateArray?.[1] - 1]} ${
                    releaseDateArray?.[2]
                  }, ${releaseDateArray?.[0]}`}{" "}
                  |{" "}
                </span>
                <span>{tvShowInfo?.runtime} mins | </span>
                <span>{tvShowInfo?.spoken_languages?.[0]?.name}</span>
              </div>
              {/* Genres */}
              <div className="hidden sm:flex text-white gap-4">
                {tvShowInfo?.genres?.map((genre) => {
                  return (
                    <span
                      className="px-3 py-1 rounded-2xl border border-[#a3a3a3] hover:bg-[#8f8f8fb8] transition-all cursor-pointer"
                      key={genre.id}
                    >
                      {genre?.name}
                    </span>
                  );
                })}
              </div>
              <div className="hidden sm:flex text-white gap-4">
                {
                  tvShowInfo?.created_by?.map((creator, index)=>{
                    return (
                      <span key={creator?.id}>{index===0 ? "Created By: " : ""}{creator?.name}</span>
                    )
                  })
                }
              </div>
              {/* Production Comp */}
              <div className="">
                <h3 className="sm:mb-2 text-white text-xl">
                  Production Companies
                </h3>
                <div className="mt-2 sm:mt-0 flex flex-wrap gap-2 sm:gap-2 items-center">
                  {tvShowInfo?.production_companies?.map((production) => (
                    <p
                      className="sm:mr-2 p-1 sm:p-2 text-sm sm:text-lg bg-[#eb3944] text-white flex items-center gap-1 rounded-md cursor-pointer hover:bg-[#ff5151] transition-all"
                      key={production?.id}
                    >
                      <img
                        className="h-4"
                        src={IMG_CDN_URL + production?.logo_path}
                        alt=""
                      />{" "}
                      {production.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Cast */}
            <div className="">
              <h2 className="mt-2 px-4 text-3xl text-white font-bold">Cast</h2>
              <div>
                <ActorCard castInfo={castInfo} />
              </div>
            </div>
            {/* Directors */}
            {isDirectorPresent && (
              <div>
                <h2 className="mt-2 px-4 text-3xl text-white font-bold">
                  Director(s)
                </h2>
                <div className="p-4 flex gap-10 overflow-x-scroll">
                  {directors?.map((director) => {
                    if (director?.profile_path === null) {
                      return (
                        <div
                          className="w-[164px] flex-shrink-0"
                          key={director.id}
                        >
                          <img
                            className="rounded-xl w-[164px] h-[246px] cursor-pointer"
                            src="/noPerson.png"
                            alt=""
                          />
                          <p className="text-xl text-white font-bold">
                            {director?.name}
                            <span className="text-[16px] font-normal">
                              , as {director?.character}
                            </span>
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="w-[164px] flex-shrink-0"
                          key={director.id}
                        >
                          <img
                            className="rounded-xl w-[164px] h-[246px] cursor-pointer"
                            src={IMG_CDN_URL + director?.profile_path}
                            alt=""
                          />
                          <p className="text-xl text-white font-bold">
                            {director?.name}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
            {/* Wrters */}
            {isWriterPresent && (
              <div>
                <h2 className="mt-2 px-4 text-3xl text-white font-bold">
                  Writer(s)
                </h2>
                <div className="p-4 flex gap-10 overflow-x-scroll">
                  {writers?.map((writer) => {
                    if (writer?.profile_path === null) {
                      return (
                        <div
                          className="w-[164px] flex-shrink-0"
                          key={writer.id}
                        >
                          <img
                            className="rounded-xl w-[164px] h-[246px] cursor-pointer"
                            src="/noPerson.png"
                            alt=""
                          />
                          <p className="text-xl text-white font-bold">
                            {writer?.name}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="w-[164px] flex-shrink-0"
                          key={writer.id}
                        >
                          <img
                            className="rounded-xl w-[164px] h-[246px] cursor-pointer"
                            src={IMG_CDN_URL + writer?.profile_path}
                            alt=""
                          />
                          <p className="text-xl text-white font-bold">
                            {writer?.name}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
            {/* Reviews */}
            <div>
              <h2 className="mt-2 px-4 text-3xl text-white font-bold">
                Reviews
              </h2>
              <div className="p-4 max-h-[90vh] overflow-y-scroll">
                {reviews?.map((review) => {
                  const updatedAt = new Date(review?.updated_at);
                  const formattedDate = updatedAt.toLocaleString();
                  return (
                    <div
                      className="p-4 border-b-[1px] bg-[#1111119c] backdrop-blur-lg rounded-lg "
                      key={review.id}
                    >
                      <div className="py-2 flex items-center justify-between">
                        <h4 className="text-[#fff] text-xl">
                          {review?.author}
                        </h4>
                        <h5 className="text-[#ccc] text-sm">{formattedDate}</h5>
                      </div>
                      <div className="text-[#ccc]">{review?.content}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetails;
