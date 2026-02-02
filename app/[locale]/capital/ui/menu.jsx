import SidebarLinkGroup from "@/components/Sidebar/SidebarLinkGroup";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const MenuCapital = () => {
    const { data: session, status } = useSession()
    const [access, setAccess] = useState(session?.user.role);
    const pathname = usePathname();
    let storedSidebarExpanded = "true";
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );
    // close if the esc key is pressed
    useEffect(() => {
        if (status == "authenticated") {
            setAccess(session?.user.role)
        }
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector("body")?.classList.add("sidebar-expanded");
        } else {
            document.querySelector("body")?.classList.remove("sidebar-expanded");
        }
        if (status == "authenticated") {
            setAccess(session?.user.role)
        }
    }, [sidebarExpanded]);
    return (
        <>
            {access && access.includes('capital_access') &&
                <SidebarLinkGroup
                    activeCondition={
                        pathname.includes("capital/")
                    }
                >
                    {(handleClick, open) => {
                        return (
                            <React.Fragment>
                                <Link
                                    href="#"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.includes("capital/")) &&
                                        "bg-graydark dark:bg-meta-4"
                                        }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                            ? handleClick()
                                            : setSidebarExpanded(true);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                                            fill="white"
                                        /></svg>
                                    <p className="group-hover:ml-3 transition-all duration-300">
                                        Subscription
                                    </p>
                                    <svg
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                                            }`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                            fill=""
                                        />
                                    </svg>
                                </Link>
                                {/* <!-- Dropdown Menu Start --> */}
                                <div
                                    className={`translate transform overflow-hidden ${!open && "hidden"
                                        }`}
                                >
                                    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                        {access && access.includes('capital_access') &&
                                            <li>
                                                <Link
                                                    href="/capital/1/users/"
                                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("capital/") && pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="16" fill="white" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" /></svg>
                                                    Subscription List
                                                </Link>
                                            </li>
                                        }
                                        {access && access.includes('capital_access') &&
                                            <li>
                                                <Link
                                                    href="/capital/1/requests/"
                                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("capital/") && pathname.includes("requests") && "bg-graydark dark:bg-meta-4"
                                                        }`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="16" fill="white" viewBox="0 0 512 512"><path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" /></svg>
                                                    Subscription Request
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                                {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                        );
                    }}
                </SidebarLinkGroup>
            }
        </>
    );
};

export default MenuCapital;