const { studentBy } = require('./findStudentBy');
const { Advisers: AdviserModel, Students: StudentModel } = require('../models');

const existingEmail = async (email) => {
  const student = await studentBy('email', email);
  if (student) {
    throw new Error('Este email ya tiene una cuenta en nuestra base de datos');
  }
};
const existingDni = async (dni) => {
  const student = await studentBy('dni', dni);
  if (student) {
    throw new Error('Este dni ya existe en nuestra base de datos');
  }
};
const existingUser = async (user) => {
  const student = await studentBy('user', user);
  if (student) {
    throw new Error('Este usuario ya existe en nuestra base de datos');
  }
};
const existingAdviser = async (idAdviser) => {
  const adviser = await AdviserModel.findOne({
    where: {
      id: idAdviser,
    },
  });
  if (!adviser) {
    throw new Error('El orientador no existe en nuestra base de datos');
  }
};
const studentsInDb = async (studentsId) => {
  const students = await StudentModel.findAll({
    where: {
      id: studentsId,
    },
  });
  if (students.length !== studentsId.length) {
    throw new Error('Uno o mas estudiantes no encontrados, tiene que ingresar un id validos para los estudiantes');
  }
};
module.exports = {
  existingDni,
  existingEmail,
  existingUser,
  existingAdviser,
  studentsInDb,
};
