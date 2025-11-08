import React, { useState } from "react";
import CatalogCard from "../component/Common/Catalog/CatalogCard";
import Footer from "../component/Common/Footer/Footer";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Catalog() {
  const { isLoading } = useSelector((state) => state.loaderANDlogout);
  const [currActive, setCurrActive] = useState("most-popular");
  const {categoriesDetail}=useSelector((state)=>state.courses)
  // console.log("Category is ",categoriesDetail);
  const currentCategory=categoriesDetail.data;
  const otherCatergory=categoriesDetail.diffdata;
  // console.log("other cate ",otherCatergory)
  const indexFor = Math.floor(Math.random() * 5);

  return (
    <div>
      {isLoading ? (
        <div className="loader flex justify-center items-center p-5 mx-auto mt-10 "></div>
      ) : (
        <div className="flex flex-col gap-10 items-center text-slate-400">
          <div className="w-[80%] flex flex-col gap-5 py-14">
            <div className="text-base flex">
              Home / Catalog /{" "}
              <p className="text-yellow-400 ml-1">{currentCategory && currentCategory[0]?.categoryName}</p>
            </div>
            <div className="md:text-3xl text-2xl text-white font-semibold">
              {currentCategory && currentCategory[0]?.categoryName}
            </div>
            <div className="text-base">{currentCategory && currentCategory[0]?.description}</div>
          </div>
          <div className="w-[100%] bg-black min-h-screen pt-10">
            <div className="w-[80%] flex flex-col mx-auto gap-5 mb-24">
              <div className="md:text-4xl text-3xl text-white font-semibold">
                Courses to get you started
              </div>
              <div className="flex flex-col gap-2 relative">
                <div className="flex flex-row gap-5">
                  <p
                    className={`${
                      currActive === "most-popular"
                        ? "text-yellow-300 border-b-1 border-yellow-300"
                        : ""
                    } hover:cursor-pointer py-1 z-10 px-2`}
                    onClick={() => {
                      setCurrActive("most-popular");
                    }}
                  >
                    Most Popular
                  </p>
                  <p
                    className={`${
                      currActive === "new"
                        ? "text-yellow-300 border-b-1 border-yellow-300"
                        : ""
                    } hover:cursor-pointer py-1 z-10 px-2`}
                    onClick={() => {
                      setCurrActive("new");
                    }}
                  >
                    New
                  </p>
                </div>
                <div className="border-1 border-slate-700 absolute top-8 w-[100%] z-0"></div>
              </div>
              <div className="w-[100%] flex flex-row gap-5 flex-wrap">
                {
                  currentCategory && currentCategory[0]?.course.map((item,index)=>{
                      return (<NavLink to={`/courses/${item._id}`} key={index}
                      className="max-w-84"
                      >
                        {/* We have change the value of the width of the catalog card  */}
                          <CatalogCard obj={item} />
                        </NavLink>);
                  })
                }
                {
                  currentCategory && currentCategory[0]?.course.length===0 && (
                    <div className="text-slate-200 text-2xl font-bold">No Courses in this Category till Now</div>
                  )
                }
              </div>
            </div>

            <div className="w-[80%] flex flex-col mx-auto gap-5 mb-24">
              <div className="md:text-4xl text-3xl text-white font-semibold mb-2">
                Top courses in {otherCatergory && otherCatergory[indexFor].categoryName}
              </div>
              <div className="w-[100%] flex flex-row gap-5 flex-wrap">
                {
                  otherCatergory && otherCatergory[indexFor]?.course.map((item,index)=>{
                    return (<NavLink to={`/courses/${item._id}`} key={index}
                    className="max-w-84"
                    >
                      {/* We have change the value of the width of the catalog card  */}
                             <CatalogCard obj={item} />
                          </NavLink>);
                  })
                }
                {
                  currentCategory && currentCategory[0]?.course.length===0 && (
                    <div className="text-slate-200 text-2xl font-bold">No Courses in this Category till Now</div>
                  )
                }
              </div>
            </div>

            <div className="w-[80%] flex flex-col mx-auto gap-5 mb-24">
              <div className="text-4xl text-white font-semibold mb-2">
                Frequently Bought
              </div>
              <div className="w-[100%] flex flex-row gap-5 flex-wrap">
                {/* <CatalogCard></CatalogCard>
                <CatalogCard></CatalogCard>
                <CatalogCard></CatalogCard> */}
                <div className="text-xl text-slate-400 font-bold">Later based on the student Enrolled we render this </div>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}

export default Catalog;
