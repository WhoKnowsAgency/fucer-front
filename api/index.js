import authRepository from "~/api/auth";

export default ($axios) => ({
  auth: authRepository($axios),
});
