import HyperExpress from "hyper-express";
export default function grantsMiddelware(grants: Array<String>) {
  return (
    req: HyperExpress.Request,
    res: HyperExpress.Response,
    next: Function
  ) => {

    const token=req.locals.token;

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return null;
    }

   
    const roles=token.resource_access['www-client'].roles; 
    const hasGrant = roles.some((element: string) => {
      return grants.includes(element);
    });
    
    if(hasGrant) {
      next();
    }

    if (!req.locals.token.roles) {
      res.status(401).json({ message: "Unauthorized" });
      return null;
    }
   
  };
}
