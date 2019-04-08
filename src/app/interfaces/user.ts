export interface User { //the interfaces defines the properties/data type than our will use...
  uid: any;
  alias: string;
  subalias?: string; //'?' allows the option to choose...
  age?: number;
  email: string;
  friend: boolean;
  status?: string;
  avatar?: string;
  friends?: any;
}
