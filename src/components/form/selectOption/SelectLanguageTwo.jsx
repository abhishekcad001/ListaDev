import React, { useContext } from "react";

//internal import
import useAsync from "@/hooks/useAsync";

import { SidebarContext } from "@/context/SidebarContext";

const SelectLanguageTwo = ({ handleSelectLanguage, register }) => {

  const { lang } = useContext(SidebarContext);

  // console.log("lang", lang, "data", data);

  return (
    <>
      {/* <select
        name="language"
        {...register(`language`, {
          required: `language is required!`,
        })}
        onChange={(e) => handleSelectLanguage(e.target.value)}
        className="block w-20 h-10 border border-emerald-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:bg-white dark:focus:bg-gray-700"
      >
        <option value={lang} defaultChecked hidden>
          {lang}
        </option>
        {!error &&
          !loading &&
          data?.map((lang) => (
            <option key={lang?._id} value={lang?.iso_code}>
              {lang?.iso_code}{" "}
            </option>
          ))}
      </select> */}
    </>
  );
};

export default SelectLanguageTwo;
