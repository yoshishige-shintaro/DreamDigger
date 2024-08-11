export type RawUser = {
  categories: string | null;
};

export class User {
  categories: string[];
  constructor(data: RawUser) {
    this.categories = data.categories ? (JSON.parse(data.categories) as string[]) : [];
  }
}

export const INITIAL_CATEGORIES = ["仕事", "プライベート"];
