export type RawCategory = {
  uuid: string;
  title: string;
};

export class Category {
  id: string;
  title: string;
  constructor(data: RawCategory) {
    this.id = data.uuid;
    this.title = data.title;
  }
}
