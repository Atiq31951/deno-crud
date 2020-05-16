import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
// import { assertMatch } from "https://deno.land/std@0.51.0/testing/asserts.ts";
const userArray = [];

export const CreateUserController = ({ request, response }) => {
  const { name, email, contact, password } = request.body;
  if (userArray.filter((obj) => obj.email === email).length) {
    response.body = {
      error: {
        message: "This e-mail exist!",
      },
    };
    return;
  }
  // const hash = bcrypt.hashpw(password);
  // const result = bcrypt.checkpw(password, hash);
  userArray.push({
    id: new Date().getTime().toString() + Math.random(),
    name,
    email,
    contact,
    password: bcrypt.hashpw(password),
  });
  response.body = {
    data: {
      message: "Operation done successfully",
    },
    error: null,
  };
  return;
};

export const AllUserController = ({ request, response }) => {
  const userObjs = [];
  userArray.forEach((user) => {
    userObjs.push({
      id: user.id,
      name: user.name,
      email: user.name,
      contact: user.name,
    });
  });
  response.body = userObjs;
  return;
};

export const ParticularUserController = ({ response, params }) => {
  const { id } = params;
  let requestedObject = null;
  userArray.forEach((user) => {
    if (user.id === id) {
      requestedObject = {
        id,
        name: user.name,
        email: user.email,
        contact: user.contact,
      };
    }
  });
  response.body = {
    data: requestedObject,
    error: false,
  };
  return;
};

export const UpdateUser = ({ request, params, response }) => {
  const { id } = params;
  const { name, email, contact } = request;
  let requestedObject = null;
  userArray.forEach((user, index) => {
    if (user.id === id) {
      userArray[index] = {
        ...user,
        name,
        email,
        contact,
      };
      requestedObject = {
        ...user,
        name,
        email,
        contact,
      };
      return;
    }
  });
  response.body = {
    data: requestedObject,
    error: null,
  };
  return;
};

export const DeleteUser = ({ params, response }) => {
  const { id } = params;
  userArray.forEach((user, index) => {
    if (user.id === id) {
      userArray.splice(index, 1);
      return;
    }
  });
  response.body = {
    message: "Operation done successfully!",
    error: null,
  };
};
