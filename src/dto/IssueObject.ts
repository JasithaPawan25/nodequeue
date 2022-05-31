export class PostDto {
    id:number | undefined;
    issuename: string | undefined;
    telephone: string | undefined;
    email: string | undefined;
    detail: string | undefined;
    IssueNo:string | undefined;
   // uname:string | undefined;
  //  datePublished: string

  constructor(obj : any){
    if(obj){
      this.id =obj.id;
      this.issuename = obj.issuename;
      this.telephone = obj.telephone;
      this.email = obj.email;
      this.detail = obj.detail;
      this.IssueNo=obj.IssueNo;
    //  this.uname=obj.uname;
    }
  }
 
  }