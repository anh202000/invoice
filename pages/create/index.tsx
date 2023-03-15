import { FC, useContext, useState } from "react";
import valid from "@/utils/valid/valid";
import { DataContext } from "@/utils/store/golobalState";
import { postData } from "@/utils/service";
import Head from "next/head";
import { bodyMock } from "@/utils/mockUp_data";
import { randomItemReference } from "@/utils/hooks";

interface Iprops {
  props: any;
}

const Home: FC<Iprops> = (props: any) => {
  const { state, dispatch }: any = useContext(DataContext);

  const initialTypeDateTime = {
    dueDate: "text",
    invoiceDate: "text",
  };

  const [changeTypeDateTime, setChangeTypeDateTime] =
    useState<any>(initialTypeDateTime);

  const initialContentForm = {
    dueDate: "",
    invoiceDate: "",
    quantity: 0,
    amount: 0,
    description: "",
  };

  const [contentForm, setContentForm] = useState(initialContentForm);

  const {
    dueDate,
    invoiceDate,
    quantity,
    amount,
    description,
  }: any = contentForm;

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setContentForm({ ...contentForm, [name]: value });
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const body = props?.mockBody?.invoices?.map((item: any) => {
      return {
        ...item,
        dueDate: dueDate,
        invoiceDate: invoiceDate,
        items: item?.items?.map((pre: any) => {
          return {
            ...pre,
            description: description,
            itemReference: randomItemReference(7),
            quantity: Number(quantity),
            rate: Number(amount)
          }
        })
      }
    })

    const errMsg = valid(dueDate, invoiceDate, quantity, amount, description);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("invoice-service/2.0.0/invoices", {invoices: body}, state?.auth?.token);

    if (res?.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });

    dispatch({ type: "NOTIFY", payload: { success: "Successfull" } });
    dispatch({ type: "ADD_SOCIAL", payload: res });

    setContentForm(initialContentForm);
    setChangeTypeDateTime(initialTypeDateTime);
  };

  return (
    <div className="home_page">
      <Head>
        <title>Create Invoice</title>
      </Head>

      <form onSubmit={handleSubmit}>
        <section className="row text-secondary my-4">
          <div className="col-md-12">
            <div className="container-social-left">
              <p className="container-detail-text text-center mb-4">
                Create Invoice
              </p>

              {/* DueDate */}
              <div className="row mb-4">
                <div className="col">
                  <p>Due Date</p>
                  <div className="social-dueDate-invoiceDate mb-3">
                    <input
                      className="form-control social-input-custom"
                      name="dueDate"
                      type={changeTypeDateTime?.dueDate}
                      value={dueDate}
                      placeholder="Due Date"
                      onFocus={() =>
                        setChangeTypeDateTime({
                          ...changeTypeDateTime,
                          dueDate: "date",
                        })
                      }
                      onBlur={() =>
                        setChangeTypeDateTime({
                          ...changeTypeDateTime,
                          dueDate: "text",
                        })
                      }
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>

                <div className="col">
                  <p>Invoice Date</p>
                  <div className="social-dueDate-invoiceDate mb-3">
                    <input
                      className="form-control social-input-custom"
                      type={changeTypeDateTime.invoiceDate}
                      name="invoiceDate"
                      value={invoiceDate}
                      placeholder="Invoice Time"
                      onFocus={() =>
                        setChangeTypeDateTime({
                          ...changeTypeDateTime,
                          invoiceDate: "date",
                        })
                      }
                      onBlur={() =>
                        setChangeTypeDateTime({
                          ...changeTypeDateTime,
                          invoiceDate: "text",
                        })
                      }
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <p>Quantity</p>
                  <div className="social-dueDate-invoiceDate mb-3">
                    <input
                      type="number"
                      className="form-control social-input-custom1"
                      name="quantity"
                      placeholder="Capacity"
                      value={quantity}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>

                <div className="col">
                  <p>Amount</p>
                  <div className="social-dueDate-invoiceDate mb-3">
                    <input
                      type="number"
                      className="form-control social-input-custom1"
                      name="amount"
                      placeholder="Cost"
                      value={amount}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <p>Description</p>
                  <textarea
                    className="form-control social-leftBottom-area"
                    placeholder="Desciption of your event.."
                    rows={6}
                    name="description"
                    value={description}
                    onChange={handleChangeInput}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 text-center">
            <button
              type="submit"
              className="btn btn-warning btn-submit-social w-25"
            >
              <p className="font-special-p pt-2"> Create Invoice</p>
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export async function getServerSideProps() {
  // server side rendering
  return {
    props: {
      mockBody: bodyMock,
    }, // will be passed to the page component as props
  };
}

export default Home;
