import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import Add from "@/app/[locale]/payreceivable/ui/payables/add";
import Pagination from "@/app/[locale]/ui/crud/pagination";
import List from "@/app/[locale]/payreceivable/ui/payables/list";
import Export from "@/app/[locale]/payreceivable/ui/payables/export";
import Filter from "@/app/[locale]/payreceivable/ui/payables/filter";
import Search from "@/app/[locale]/ui/crud/search";
import Loader from "@/components/common/Loader";
import SetPage from "@/app/[locale]/ui/crud/page";

import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

import { list } from '@/app/[locale]/lib/dataApi';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/[locale]/ui/skeletons';

import { getTranslations, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

async function Index({
  searchParams,
}: {
  searchParams?: {
    datasearch?: any;
    page?: string;
    perpage?: number;
    datafilter?: any;
    addresponse?: any;
  };
}) {

  const session = await getServerSession(options)
  const access = session.user.role
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = searchParams?.perpage || 50;
  let defKeyword = '';
  let dataSearch = searchParams?.datasearch || '';
  if (dataSearch) {
    dataSearch = JSON.parse(dataSearch);
    defKeyword = dataSearch.keyword;
  }
  let dataFilter = searchParams?.datafilter || '';
  if (dataFilter) {
    dataFilter = JSON.parse(dataFilter);
  }
  let addResponse = searchParams?.addresponse || '';
  if (addResponse) {
    addResponse = JSON.parse(addResponse);
  }
  //console.log("addResponse...: ", addResponse)

  let dataQry = '';
  dataQry += dataSearch ? '&keyword=' + dataSearch.keyword : '';
  dataQry += dataFilter.date_start ? '&date_start=' + dataFilter.date_start : '';
  dataQry += dataFilter.date_end ? '&date_end=' + dataFilter.date_end : '';
  dataQry += dataFilter.status ? '&status=' + dataFilter.status : '';
  dataQry += dataFilter.order_by ? '&order_by=' + dataFilter.order_by : '&order_by=register';
  dataQry += dataFilter.order_by_dir ? '&order_by_dir=' + dataFilter.order_by_dir : '&order_by_dir=DESC';
  dataQry += dataFilter.user_id ? '&user_id=' + dataFilter.user_id : '';
  const query = '/?page=' + currentPage + "&per_page=" + perPage + dataQry  + "&type=payable" 

  const listData = await list(process.env.API_PAYRECEIVABLES as string, query); 
  //console.log("listData...: ", listData)
  
  const totalData = listData.data.total;
  const rows = listData.data.data;
  let totalPages = 1;
  if(perPage > 0){
    totalPages = Math.ceil(totalData / perPage);
  }
  
  //get acc payable
  let accountQry = '/?code=payable&module=accounting'
  let accountModule = await list(process.env.API_ACCOUNTING_ACCOUNTS_MODULE as string, accountQry);
  //list all account
  accountQry = '/?id=' + accountModule.data.accounts.id
  const accounts = await list(process.env.API_ACCOUNTING_ACCOUNTS_GROUP as string, accountQry);
  //console.log("accounts list...: ", accounts)

  //get acc payment
  accountQry = '/?code=payment&module=accounting'
  accountModule = await list(process.env.API_ACCOUNTING_ACCOUNTS_MODULE as string, accountQry);
  //list all account
  accountQry = '/?id=' + accountModule.data.accounts.id
  const accountpays = await list(process.env.API_ACCOUNTING_ACCOUNTS_GROUP as string, accountQry);
  //console.log("accounts accountpays...: ", accountpays)

  const t = await getTranslations(); 
  const messagesIntl:any = await getMessages();

  //set list inc
  const listInc = (currentPage - 1) * perPage;

  return (
    <>
      {addResponse &&
        <div>
          {addResponse.success ?
            <div className="mb-4 flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                    fill="white"
                    stroke="white"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                  Data Submit Successfully
                </h5>
                <p className="text-base leading-relaxed text-body">
                  {addResponse.message}
                </p>
              </div>
            </div>
            :
            <div className="mb-4 flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
              <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                    fill="#ffffff"
                    stroke="#ffffff"
                  ></path>
                </svg>
              </div>
              <div className="w-full">
                <h5 className="mb-3 font-semibold text-[#B45454]">
                  There were 1 errors with your submission
                </h5>
                <ul>
                  <li className="leading-relaxed text-[#CD5D5D]">
                    {addResponse.message}
                  </li>
                </ul>
              </div>
            </div >
          }
        </div>
      }

      <div>
        <Breadcrumb pageName={messagesIntl.payreceivable.payables.label} />

        <div className=" bg-white rounded-lg p-10 dark:bg-boxdark">
          <div className="flex justify-start gap-4.5 py-2">
            {access && access.includes('account_create') &&
              <Add messagesIntl={messagesIntl} accounts={accounts.data} accountpays={accountpays.data} />
            }
            <Export data={listData.data} />
          </div>

          <div className="block items-center mt-5 gap-2 md:flex">
            <SetPage perPage={perPage} />
            <div className="ml-auto flex items-center gap-2">
              <Search messagesIntl={messagesIntl} defKeyword={defKeyword} />
              <Filter messagesIntl={messagesIntl} dataFilter={dataFilter} />
            </div>
          </div>

          <label className="text-lg font-bold my-4 block">Data {messagesIntl.payreceivable.payables.label}</label>
          <div className="overflow-x-auto mx-auto">
            <Suspense fallback={<CardSkeleton />}>
              <List dataList={{ rows: rows, messagesIntl: messagesIntl, accounts: accounts.data, listInc: listInc, accountpays: accountpays.data }} />
            </Suspense>

          </div>
          {/* {nextPage} */}
          <div className="flex flex-row mt-4">
            Showing 1 to {perPage} of {totalData} entries
          </div>

          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
