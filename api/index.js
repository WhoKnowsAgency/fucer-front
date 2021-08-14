import authRepository from "~/api/auth";
import cursosRepository from "~/api/cursos";
import certificadosRepository from "~/api/certificados";

export default ($axios) => ({
  auth: authRepository($axios),
  cursos: cursosRepository($axios),
  certificados: certificadosRepository($axios),
});
