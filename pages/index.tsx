import { FC, useContext, useEffect, useState } from "react";
import { DataContext } from "@/utils/store/golobalState";
import Head from "next/head";
import Filter from "@/components/filterHome";
import { getData } from "@/utils/service";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "@/components/panigation";
import filterSearch from "@/utils/filterInvoice";

interface Iprops {
  props: any;
}

const Home: FC<Iprops> = (props: any) => {
  const { state, dispatch }: any = useContext(DataContext);
  const { user, auth, listInVoice } = state;
  const router: any = useRouter();
  const page = router.query.pageNum || 1;
  const pageSize = router.query.pageSize || 10;

  useEffect(() => {
    if (auth.token)
      getData(
        `invoice-service/1.0.0/invoices?pageNum=${page}&pageSize=${pageSize}`,
        state?.auth?.token,
        user?.data?.memberships[0]?.token
      ).then(
        (res: any) =>
          dispatch({
            type: "LISTINVOICE",
            payload: res,
          }),
        router.push({
          pathname: router.pathname,
          query: { pageNum: 1, pageSize: 10 },
        })
      );
  }, [auth]);

  const onPageChange = (e: any) => {
    filterSearch({ router, pageNum: e });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const convertParams = Object.keys(router?.query).map((key: any) => key + "=" + router?.query[key]).join("&");

    getData(`invoice-service/1.0.0/invoices?${convertParams}`, state?.auth?.token).then((res: any) => {
      dispatch({
        type: "LISTINVOICE",
        payload: res,
      });

      dispatch({ type: "NOTIFY", payload: { loading: false } });
    });
  };

  return (
    <div className="home_page" style={{ minHeight: "91.25vh" }}>
      <Head>
        <title>Home</title>
      </Head>
      <Filter
        state={state}
        keySort={["invoiceId", "balanceAmount", "dueDate", "type"]}
      />

      <div className="col-md-12">
        <div className="my-3 table-responsive">
          <table
            className="table-bordered table-hover w-100 text-uppercase text-center"
            style={{ minWidth: "600px", cursor: "pointer" }}
          >
            <thead className="bg-light font-weight-bold">
              <tr>
                <td className="p-2">stt</td>
                <td className="p-2">id</td>
                <td className="p-2">balanceAmount</td>
                <td className="p-2">name</td>
                <td className="p-2">dueDate</td>
                <td className="p-2">type</td>
                <td className="p-2">status</td>
                <td className="p-2">version</td>
              </tr>
            </thead>

            <tbody>
              {listInVoice &&
                listInVoice?.data?.map((item: any, idx: number) => (
                  <tr key={item._id}>
                    <td className="p-2">
                      <a>{idx}</a>
                    </td>
                    <td className="p-2">
                      <a>{item?.invoiceId}</a>
                    </td>
                    <td className="p-2">
                      {/* <Link href={`/order/${item._id}`}> */}
                      <a>{item.balanceAmount}</a>
                      {/* </Link> */}
                    </td>

                    {/* Display for case admin */}
                    <td className="p-2">{item?.customer?.name || ""}</td>

                    <td className="p-2">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                    <td className="p-2">{item?.type || ""}</td>
                    <td className="p-2">{item?.status[0]?.key || ""}</td>

                    <td className="p-2">
                      <a>{item?.version}</a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalItems={listInVoice?.paging?.totalRecords || 600}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};
0;

export default Home;
