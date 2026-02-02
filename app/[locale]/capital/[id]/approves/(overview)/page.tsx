import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";

import MemberRegister from "@/app/[locale]/capital/ui/approves/member-register";
import MemberActivate from "@/app/[locale]/capital/ui/approves/member-activate";

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
    dataParams?: any
  };
}) {

  const session = await getServerSession(options)
  const access = session.user.request

  let dataParams = searchParams?.dataParams || '';
  let userID = 0
  if (dataParams) {
    dataParams = JSON.parse(dataParams);
    userID = dataParams.transaction_id;
  }

  //get data member
  const query = '/' + userID + '/'
  const rows = await list(process.env.API_CAPITAL_USERS as string, query);

  let reqFor = '';
  let principle:any = {}
  let mandatory:any = {}
  //if register
  if (dataParams.type == 'member_register') {
    reqFor = 'Request for Member Registration Approve';
  }
  //if activate
  if (dataParams.type == 'member_activate') {
    reqFor = 'Request for Member Activation Approve';
    //get principle
    const qryPrinciple = '?page=1&per_page=1&order_by=id&order_by_dir=DESC&model=principle&user_id=' + userID
    principle = await list(process.env.API_CAPITAL as string, qryPrinciple);
    //get mandatory
    const qryMandatory = '?page=1&per_page=1&order_by=id&order_by_dir=DESC&model=mandatory&user_id=' + userID
    mandatory = await list(process.env.API_CAPITAL as string, qryMandatory);
  }
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
              {dataParams.type == 'member_register' &&
                <MemberRegister messagesIntl={messagesIntl} rows={rows.data} dataParams={dataParams} />
              }
              {dataParams.type == 'member_activate' &&
                <MemberActivate messagesIntl={messagesIntl} rows={rows.data} dataParams={dataParams} mandatory={mandatory.data.data} principle={principle.data.data} />
              }
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
