import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect, Fragment } from "react";
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import { DataContext } from "@/utils/store/golobalState";
import { postData } from "@/utils/service";
import validSignIn from "@/utils/valid/vaildSignIn";

const Signin = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch }: any = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  const handleChangeInput = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errMsg = validSignIn(email, password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const bodyRequest: any = {
      client_id: "oO8BMTesSg9Vl3_jAyKpbOd2fIEa",
      client_secret: "0Exp4dwqmpON_ezyhfm0o_Xkowka",
      grant_type: "password",
      scope: "openid",
      username: email,
      password: password,
    };

    var formBodyRequest: any = [];
    for (var property in bodyRequest) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(bodyRequest[property]);
      formBodyRequest.push(encodedKey + "=" + encodedValue);
    }
    formBodyRequest = formBodyRequest.join("&");

    const res = await postData(`token?client_id=${bodyRequest.client_id}&client_secret=${bodyRequest.client_secret}`, formBodyRequest, null);

    if (res.error)
      return dispatch({ type: "NOTIFY", payload: { error: "Login failed, try again" } });

    setTimeout(() => dispatch({ type: "NOTIFY", payload: { success: 'Login success' } }), 2000);

    dispatch({
      type: "AUTH",
      payload: {
        token: res.access_token,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'token',
      expires: res.expires_in
    })

    localStorage.setItem('firstLogin', true)
    localStorage.setItem('access_token', res.access_token)
  };

  useEffect(() => {
    if(auth && Object?.keys(auth).length !== 0) router.push("/")
  }, [auth])

  return (
    <Fragment>
      <Head>
        <title>Sign in Page</title>
      </Head>

      <form
        className="mx-auto my-4"
        style={{ maxWidth: "700px", height: "100vh" }}
        onSubmit={handleSubmit}
      >
        <h3 className="mb-5 text-center">Sign in</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={password}
            onChange={handleChangeInput}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>

        <p className="my-2">
          You don't have an account? <Link href="/register">Register Now</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default Signin;
