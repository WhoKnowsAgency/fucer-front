import authRepository from "~/api/auth";
import cursosRepository from "~/api/cursos";

export default ($axios) => ({
  auth: authRepository($axios),
  cursos: cursosRepository($axios),
});
