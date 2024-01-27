import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../../services/api/authApi";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import Bigscreen from "../../../components/Svg/Bigscreen";

const schema = yup.object().shape({
  email: yup.string().email("email non valide").required("Email requis"),
  password: yup
    .string()
    .required("champs requis")
    .min(6, "le mot de passe doit contenir au moins 6 caracteres"),
});

const TOKEN_STORAGE = import.meta.env.VITE_TOKEN_STORAGE;

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setisloading] = React.useState(false);

  const submitForm = async (values) => {
    setisloading(true);
    try {
      errors.login && clearErrors("login");
      const res = await login(values);
      if (res.data.token)
        Cookies.set(TOKEN_STORAGE, res.data.token?.trim(), { expires: 1 });
      location.replace("/administration");
    } catch (error) {
      let message = error.message;
      const errorData = error?.response?.data;

      if (errorData) {
        message = errorData.message;
      }
      setError("login", { message });
    } finally {
      setisloading(false);
    }
  };

  const TEXT_BTN = isLoading ? "Conexxion en cours" : "connexion";

  return (
    <main className="d-flex w-100">
      <Helmet>
        <title>Bigscreen - connexion</title>
      </Helmet>
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mb-5">
                <h2>Bigscreen administration</h2>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form onSubmit={handleSubmit(submitForm)}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          className="form-control form-control-lg"
                          placeholder="Entrer votre email"
                          type="email"
                          {...register("email")}
                        />
                        <div className="color text-danger mt-1">
                          {errors.email && errors.email.message}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Mot de passe
                        </label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Entrer votre mot de passe"
                          {...register("password")}
                        />

                        <div className="color text-danger mt-1">
                          {errors.password && errors.password.message}
                        </div>
                      </div>
                      <div className="my-3">
                        {errors.login && (
                          <div
                            className="alert alert-danger alert-dismissible fade show"
                            role="alert"
                          >
                            {errors.login.message}

                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="alert"
                              aria-label="Close"
                            ></button>
                          </div>
                        )}
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-lg btn-primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          {TEXT_BTN}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
