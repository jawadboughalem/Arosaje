const bcrypt = require('bcrypt');

import React from "react";
import { createUser } from "../../../Backend/models/authModel";
import { signup } from "../../../Backend/controllers/authController";

jest.mock('signup');

test('Test inscription', () => {

})