// https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules
import Vue from "vue";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from "vee-validate";
import { messages } from "vee-validate/dist/locale/es";

/* eslint-disable camelcase */
import { required, email, confirmed, is_not } from "vee-validate/dist/rules";

// Con la versión más agresiva en celular te validaba apenas ibas al teclado
// como si te hubieras ido del input.
setInteractionMode("lazy");

extend("required", {
  ...required,
  message: messages.required,
});
extend("email", {
  ...email,
  message: messages.email,
});
extend("confirmed", {
  ...confirmed,
  message: messages.confirmed,
});
extend("is_not", {
  ...is_not,
  message: messages.is_not,
});

extend("password", {
  validate: (value) => {
    if (value.length < 8) {
      return 'El campo "{_field_}" debe tener al menos 8 caracteres';
    }
    return true;
  },
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
