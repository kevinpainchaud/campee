import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

import type { Profile } from "../types/profile";

export const getProfileMock = ({
  backface_card_style_key = "cool",
  company_name = faker.company.name(),
  display_name = faker.person.firstName(),
  id = uuidv4(),
}: Partial<Profile> = {}) => ({
  backface_card_style_key,
  company_name,
  display_name,
  id,
});
