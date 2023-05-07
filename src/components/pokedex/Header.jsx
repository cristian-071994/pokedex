import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    dispatch(setNameTrainer(""));
  };
  return (
    <section className="relative">
      <div className="h-14 bg-[#DD1A1A] grid items-end">
        <div className="max-w-[200px] sm:max-w-[300px] ml-2">
          <img src="/images/img-pokedex.png" alt="" />
        </div>
      </div>
      <div className="h-8 bg-black"></div>
      <div className='h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute -bottom-6 right-0 -translate-x-1/2 after:content-[""] after:h-11 after:aspect-square after:rounded-full after:bg-[#212121] after:absolute after:border-[6px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2'>
        <i
          onClick={handleClickLogOut}
          className="bx bx-log-out-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-30 text-3xl hover:text-red-600 cursor-pointer"
        ></i>
      </div>
    </section>
  );
};

export default Header;
