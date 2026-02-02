import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

import Store from "@/app/[locale]/accounting/ui/approves/store";

import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

import { show } from '@/app/[locale]/lib/dataApi';
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
    dataParams?: any
  };
}) {

  const session = await getServerSession(options)
  const access = session.user.request

  let dataParams = searchParams?.dataParams || '';
  let transaction_id = 0
  if (dataParams) {
    dataParams = JSON.parse(dataParams);
    transaction_id = dataParams.transaction_id;
  }

  let rows:any = {};
  let reqFor = '';
  //if activated
  if (dataParams.type == 'ledger_store') {
    reqFor = 'Request for Ledger Store Approve';
    //get ledger
    rows = await show(process.env.API_ACCOUNTING_LEDGER_SHOW as string, transaction_id);
  }
  console.log('rows...', rows)

  const t = await getTranslations();
  const messagesIntl:any = await getMessages();

  return (
    <>
      <div>
        <Breadcrumb pageName={messagesIntl.user.requests.title} />

        <div className=" bg-white rounded-lg p-10 dark:bg-boxdark">
          <div className="flex justify-start gap-4.5 py-2">

          </div>

          <div className="block items-center mt-5 gap-2 md:flex">

            <div className="ml-auto flex items-center gap-2">

            </div>
          </div>

          <label className="text-lg font-bold my-4 block">{reqFor}</label>
          <div className="overflow-x-auto mx-auto">
            <Suspense fallback={<CardSkeleton />}>
              {dataParams.type == 'ledger_store' &&
                <Store messagesIntl={messagesIntl} rows={rows.data} dataParams={dataParams} />
              }
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
