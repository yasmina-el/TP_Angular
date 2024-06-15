export declare type Serveur = {
  _id: string;
  nom: string;
  description: string;
  urlLogo: string;
  public: boolean;
  salons:[{idSalon: string, nomSalon:string, listMessage:[{email:string,message:string}]}],
};
