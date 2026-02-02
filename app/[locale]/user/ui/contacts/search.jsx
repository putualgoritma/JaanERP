"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Search({ defKeyword, messagesIntl }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  //generate path
  let pathname = usePathname();
  const pathnameArr = pathname.split("/");
  const listNum = "/" + pathnameArr[3] + "/";
  const pathRandom = Math.floor(Math.random() * 101);
  pathname = pathname.replace(listNum, "/" + pathRandom + "/");

  const [form, setForm] = useState({
    keyword: defKeyword,
  });

  function handleForm(key, value) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("datasearch", JSON.stringify(form));
    params.delete("addresponse");
    router.push(`${pathname}?${params}`);
  }

  return (
    <div className="flex items-center gap-2">
      <input
        value={form.keyword}
        onChange={(e) => handleForm("keyword", e.target.value)}
        type="text"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        placeholder={messagesIntl.input.button.search_place_holder}
      />
      <button
        onClick={handleSubmit}
        className="flex items-center justify-center rounded bg-secondary py-2 px-6 text-white hover:bg-opacity-95 gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        {messagesIntl.input.button.search}
      </button>
    </div>
  );
}
